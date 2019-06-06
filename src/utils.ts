
export const block = () =>
  browser.tabs.executeScript(undefined, {
    file: 'block.js',
  })
