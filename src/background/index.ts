import browser from 'webextension-polyfill'

// Bulma color palette: https://bulma.io/documentation/overview/colors
browser.browserAction.setBadgeBackgroundColor({ color: 'rgb(50, 115, 220)' })

const amountBlockedPerTab: Dictionary<string, number> = {}

function setBadgeText(amount?: number) {
  if (amount) {
    browser.browserAction.setBadgeText({
      text: amount.toString(),
    })
  } else {
    browser.browserAction.setBadgeText({ text: '' })
  }
}

function restoreBadgeText({ tabId }: { tabId: number }) {
  setBadgeText(amountBlockedPerTab[tabId])
}

function cacheAmountBlockedInTab(message: object, { tab }: { tab?: browser.tabs.Tab }) {
  if ('amount' in message) {
    const notifyBlockedMessage: NotifyBlockedMessage = message as NotifyBlockedMessage

    if (tab && tab.id) {
      amountBlockedPerTab[tab.id] = notifyBlockedMessage.amount
    }

    setBadgeText(notifyBlockedMessage.amount)
  }
}

browser.runtime.onMessage.addListener(cacheAmountBlockedInTab)
browser.tabs.onActivated.addListener(restoreBadgeText)
