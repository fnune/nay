/**
 * @file Initializes a `MutationObserver` to block links added after the initial page load.
 */

import { block } from './utils'

const runOnNewLinks = (callback: (links: HTMLAnchorElement[]) => void) => (
  mutations: MutationRecord[],
) => {
  const links: HTMLAnchorElement[] = []

  mutations
    .map(mutation => mutation.addedNodes)
    .forEach(addedNodes => {
      addedNodes.forEach(node => {
        const element = node as HTMLElement
        if (element.nodeName === 'A') {
          links.push(element as HTMLAnchorElement)
        } else {
          Array.from(element.getElementsByTagName('a')).forEach(link => links.push(link))
        }
      })
    })

  callback(links)
}

const observer = new MutationObserver(runOnNewLinks(block))

observer.observe(document, { childList: true, subtree: true })
