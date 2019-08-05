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

function modifyBlockedLinks({ rules }: NayStorage): void {
  const blocked: Rule[] = rules ? JSON.parse(rules) : []

  Array.from(links)
    .map(link => ({ link, rule: blocked.find(({ match }) => link.href.includes(match)) }))
    .filter<LinkWithMatchingRule>(isLinkWithMatchingRule)
    .forEach(({ link, rule }) => {
      console.log(link.textContent)

      if (!containsMediaTag(link)) {
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
