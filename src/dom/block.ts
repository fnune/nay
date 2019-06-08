import './block.scss'

const links = document.querySelectorAll('a')
const noop = () => false

browser.storage.sync
  .get<NayStorage>('rules')
  .then(({ rules }) => {
    const blocked: Rule[] = rules ? JSON.parse(rules) : []

    Array.from(links)
      .filter(link => blocked.map(entry => entry.match).some(match => link.href.includes(match)))
      .forEach(link => {
        link.href = MASKED_URL
        link.onclick = noop
      })
  })
  .catch(console.error)
