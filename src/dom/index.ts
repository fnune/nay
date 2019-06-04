const links = document.querySelectorAll('a')

const url = Math.random()
  .toString()
  .substring(2)

const blocked = [
  {
    match: 'techcrunch',
    reason: 'Impossible GDPR consent popup',
  },
  {
    match: 'medium.com',
    reason: 'A great many popups',
  }
]

const noop = () => false

// Randomize href
Array.from(links)
  .filter(link => blocked.map(entry => entry.match).some(match => link.href.includes(match)))
  .forEach(link => {
    link.href = url
    link.onclick = noop
  })

// Add rules targeting the random href
const rules = `
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

const sheet = document.createElement('style')
sheet.setAttribute('data-nay-styles', 'yay')
sheet.type = 'text/css'
sheet.appendChild(document.createTextNode(rules))

document.head.appendChild(sheet)
