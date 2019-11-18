const rulesSyncStorage = browser.storage.sync
  .get<NayStorage>('rules')
  .then(({ rules: rulesString }) => (rulesString ? JSON.parse(rulesString) : []))
  .catch(console.error)

export default rulesSyncStorage
