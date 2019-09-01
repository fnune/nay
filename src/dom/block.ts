import browser from 'webextension-polyfill'

import './block.scss'

const links = document.querySelectorAll('a')

interface Link {
  link: HTMLAnchorElement
  rule: Rule | undefined
}

interface LinkWithMatchingRule extends Link {
  rule: Rule
}

function isLinkWithMatchingRule(link: Link): link is LinkWithMatchingRule {
  return !!link.rule
}

function containsMediaTag(node: HTMLElement): boolean {
  return node.querySelectorAll('img, svg, video, audio, embed, source, track').length > 0
}

function notifyBlocked(amount: number): void {
  browser.runtime.sendMessage<NotifyBlockedMessage>({ amount })
}

function formatReason(rule: Rule) {
  return `
Nay! 😤

You blocked URLs matching ${rule.match}${
    rule.reason
      ? ` and left the following note:

${rule.reason}.`
      : '.'
  }

If you'd like to continue anyway, click OK or press Enter.`
}

function modifyBlockedLinks({ rules: rulesString }: NayStorage): void {
  const rules: Rule[] = rulesString ? JSON.parse(rulesString) : []
  const blocked: LinkWithMatchingRule[] = Array.from(links)
    .map(link => ({ link, rule: rules.find(({ match }) => link.href.includes(match)) }))
    .filter(isLinkWithMatchingRule)

  notifyBlocked(blocked.length)

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
}

browser.storage.sync
  .get<NayStorage>('rules')
  .then(modifyBlockedLinks)
  .catch(console.error)
