const NAY_STYLESHEET_IDENTIFIER = 'data-nay-styles'

const url = Math.random()
  .toString()
  .substring(2)

// Add rules targeting the random href
const styles = `
  a[href="${url}"], a[href="${url}"] * {
    text-decoration: line-through;
    pointer-events: none;
  }

  a[href="${url}"] {
    position: relative;
  }

  a[href="${url}"]::after {
    content: "Nay!";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    color: white;
    font-weight: bold;
    background-color: black;
    border-radius: 3px;
    padding: 3px;
    font-size: 10px;
    font-family: monospace;
  }
`

const links = document.querySelectorAll('a')

browser.storage.sync
  .get<NayStorage>('rules')
  .then(({ rules }) => {
    const blocked: Rule[] = rules ? JSON.parse(rules) : []

    const noop = () => false

    // Randomize href
    Array.from(links)
      .filter(link => blocked.map(entry => entry.match).some(match => link.href.includes(match)))
      .forEach(link => {
        link.href = url
        link.onclick = noop
      })

    const sheet = document.createElement('style')
    sheet.setAttribute(NAY_STYLESHEET_IDENTIFIER, 'yay')
    sheet.type = 'text/css'
    sheet.appendChild(document.createTextNode(styles))

    document.head.appendChild(sheet)
  })
  .catch(console.error)
