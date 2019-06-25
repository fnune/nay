import 'bulma/css/bulma.css'

import React, { useEffect, useState } from 'react'
import { FiTrash2, FiPlus } from 'react-icons/fi'
import browser from 'webextension-polyfill'

import { block } from '../utils'

const useRules = (): [Rule[], (newRules: Rule[]) => void] => {
  const [rules, setRules] = useState<Rule[]>([])

  useEffect(() => {
    browser.storage.sync
      .get<NayStorage>('rules')
      .then(({ rules: syncedRules }) => setRules(syncedRules ? JSON.parse(syncedRules) : []))
      .catch(console.error)
  }, [])

  const syncRules = (newRules: Rule[]) => setRules(newRules)
  const serializedRules = JSON.stringify(rules)

  useEffect(() => {
    browser.storage.sync
      .set({ rules: serializedRules })
      .then(block)
      .catch(console.error)
  }, [serializedRules])

  return [rules, syncRules]
}

const Popup: React.FC = () => {
  const [input, setInput] = useState('')
  const [rules, setRules] = useRules()

  return (
    <div
      className="content is-small"
      style={{
        width: '300px',
        maxHeight: '800px',
        padding: '30px',
      }}
    >
      <div className="container is-fluid">
        <h1>Nay!</h1>
        <p>
          Say "nay!" to URLs in your blacklist. Disable links to matching URLs, and remember why you
          did so. <a href="https://github.com/brainlessdeveloper/nay">See the code on GitHub</a>.
        </p>
        <form
          onSubmit={event => {
            event.preventDefault()
            if (!input) return
            setRules([...rules, { match: input }])
            setInput('')
          }}
        >
          <div className="field has-addons">
            <p className="control">
              <input
                className="input"
                type="text"
                name="newRule"
                value={input}
                onChange={({ target: { value } }) => setInput(value)}
                placeholder="Add a new rule..."
              />
            </p>
            <p className="control">
              <button type="submit" className="button is-info">
                <span className="icon">
                  <FiPlus />
                </span>
              </button>
            </p>
          </div>
        </form>
        <table className="table is-fullwidth is-narrow">
          <tbody>
            {rules.map(rule => (
              <tr key={rule.match}>
                <td style={{ width: '10px' }}>
                  <button
                    className="button is-small is-outlined"
                    type="button"
                    onClick={() => setRules(rules.filter(rl => rl.match !== rule.match))}
                  >
                    <span className="icon">
                      <FiTrash2 />
                    </span>
                  </button>
                </td>
                <td>{rule.match}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="notification is-primary">
          <p>
            Rules you add will be used to match against links in all the pages you visit. Those
            links will then be masked with a random URL and modified so you can't click on them.
          </p>
        </div>
        <div className="notification is-info">
          <p>
            Add your reason for saying Nay! to each rule. That way, you'll remember why they're
            there in the future.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Popup
