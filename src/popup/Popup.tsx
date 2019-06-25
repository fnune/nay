import 'bulma/css/bulma.css'

import React, { useEffect, useState } from 'react'
import { FiTrash2, FiPlusCircle, FiFileText } from 'react-icons/fi'
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
  const [reason, setReason] = useState('')
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
        <h1>Nay! 😤</h1>
        <p>
          Say "nay!" to URLs in your blacklist. Disable links to matching URLs, and remember why you
          did so. <a href="https://github.com/brainlessdeveloper/nay">See the code on GitHub</a>.
        </p>
        <form
          onSubmit={event => {
            event.preventDefault()
            if (!input) return
            setRules([...rules, { match: input, reason }])
            setInput('')
            setReason('')
          }}
        >
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                value={input}
                onChange={({ target: { value } }) => setInput(value)}
                placeholder="Add a new rule..."
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <textarea
                rows={3}
                className="textarea"
                value={reason}
                onChange={({ target: { value } }) => setReason(value)}
                placeholder="Add a reason why you don't want to see these links again..."
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-primary is-fullwidth" disabled={!input}>
              <span className="icon">
                <FiPlusCircle />
              </span>
              <span>Save</span>
            </button>
          </div>
        </form>
        {!rules.length && <p>You haven't added any rules yet.</p>}
        <table className="table is-fullwidth is-narrow is-hoverable">
          <tbody>
            {rules.map(rule => (
              <tr key={rule.match}>
                <td style={{ width: '10px' }}>
                  <button
                    className="button is-small is-outlined"
                    type="button"
                    title="Remove this rule from the list"
                    onClick={() => setRules(rules.filter(rl => rl.match !== rule.match))}
                  >
                    <span className="icon">
                      <FiTrash2 />
                    </span>
                  </button>
                </td>
                <td title={rule.reason}>
                  {rule.match}{' '}
                  {!!rule.reason && (
                    <span className="icon has-text-grey-lighter">
                      <FiFileText />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="notification is-info">
          <p>
            Add your reason for saying Nay! to each rule. That way, you'll remember why they're
            there in the future.
          </p>
          <p>To see why you added a rule, you can hover it.</p>
        </div>
        <div className="notification">
          <p>
            Rules you add will be used to match against links in all the pages you visit. Those
            links will then be masked with a random URL and modified so you can't click on them.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Popup
