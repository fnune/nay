import browser from 'webextension-polyfill'

export const block = () =>
  browser.tabs.executeScript(undefined, {
    file: 'block.js',
  })
