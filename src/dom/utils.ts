import browser from 'webextension-polyfill'

import rulesSyncStorage from './rules'
import { Link, LinkWithMatchingRule } from './types'

/** Refines `Link` into `LinkWithMatchingRule` */
function isLinkWithMatchingRule(link: Link): link is LinkWithMatchingRule {
  return !!link.rule
}

/** Nodes containing media tags are not good targets for Nay's default 😤 prefix */
function containsMediaTag(node: HTMLElement): boolean {
  return !!node.querySelector('img, svg, video, audio, embed, source, track')
}

/** Tells Nay's background script how many links were blocked by a run */
function notifyBlocked(amount: number): void {
  browser.runtime.sendMessage<NotifyBlockedMessage>({ amount })
}

/** Match the user's rules against a list of links */
function findBlockedLinks(links: HTMLAnchorElement[], rules: Rule[]): LinkWithMatchingRule[] {
  return Array.from(links)
    .map(link => ({ link, rule: rules.find(({ match }) => link.href.includes(match)) }))
    .filter(isLinkWithMatchingRule)
}

/**
 * Exclude a rule that affects the current origin. If the user is already on
 * an origin they want to block, we don't want to block all internal links.
 */
function doesNotMatchCurrentOrigin(rule: Rule): boolean {
  return !window.location.origin.includes(rule.match)
}

/** The message that's alerted to the user when they click on a blocked link */
function formatReason(rule: Rule) {
  return [
    `Nay! 😤 You blocked URLs matching ${rule.match}. `,
    ...(rule.reason ? ['You left the note:', '\n\n', rule.reason, '\n\n'] : []),
    "If you'd like to continue anyway, click OK or press Enter.",
  ].join('')
}

/**
 * This does the bulk of the work. It needs to be async to get
 * the user's rules, which are saved on `browser.storage.sync`.
 *
 * Runs a query for blocked links after it's done.
 */
export async function block(
  links: HTMLAnchorElement[],
  rulesStorage: Promise<Rule[]> = rulesSyncStorage,
): Promise<void> {
  const rules = await rulesStorage
  const blocked = findBlockedLinks(links, rules.filter(doesNotMatchCurrentOrigin))

  blocked.forEach(({ link, rule }) => {
    if (!containsMediaTag(link) && link.textContent) {
      link.classList.add(NAY_CLASS)
    }

    link.onclick = event => {
      const confirmation = confirm(formatReason(rule))

      if (confirmation) {
        return true
      }

      event.preventDefault()
    }
  })

  // We can't trust `blocked.length` in this scope because this script
  // may have been called by Nay's mutation observer, which reports
  // incremental chunks of matched links.
  notifyBlocked(document.getElementsByClassName(NAY_CLASS).length)
}
