import React, { useEffect, useState } from 'react'
import { FiTrash2, FiPlusCircle, FiFileText } from 'react-icons/fi'
import uuid from 'uuid'
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

const Rules: React.FC = () => {
  const [input, setInput] = useState('')
  const [reason, setReason] = useState('')
  const [rules, setRules] = useRules()

  return (
    <>
      <div className="content is-small">
        <h1>Nay! 😤</h1>
        <p>
          Say "nay!" to URLs in your blacklist. Disable links to matching URLs, and remember why you
          did so. <a href="https://github.com/brainlessdeveloper/nay">See the code on GitHub</a>.
        </p>
      </div>
      <form
        onSubmit={event => {
          event.preventDefault()
          if (!input) return
          setRules([...rules, { match: input, reason, id: uuid() }])
          setInput('')
          setReason('')
        }}
      >
        <div className="field">
          <div className="control">
            <input
              data-testid="rule-input"
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
              data-testid="reason-input"
              rows={3}
              className="textarea"
              value={reason}
              onChange={({ target: { value } }) => setReason(value)}
              placeholder="Add a reason why you don't want to open these links again..."
            />
          </div>
        </div>
        <div className="control">
          <button
            data-testid="rule-submit-button"
            type="submit"
            className="button is-primary is-fullwidth"
            disabled={!input}
          >
            <span className="icon">
              <FiPlusCircle />
            </span>
            <span>Save</span>
          </button>
        </div>
      </form>
      {!rules.length && <p>You haven't added any rules yet.</p>}
      <table
        style={{ marginTop: '12px' }}
        className="content table is-fullwidth is-narrow is-hoverable"
      >
        <tbody>
          {rules.map(rule => (
            <tr data-testid="rule" key={rule.match}>
              <td style={{ width: '10px' }}>
                <button
                  className="button is-small is-outlined"
                  type="button"
                  title="Remove this rule from the list"
                  onClick={() => setRules(rules.filter(rl => rl.id !== rule.id))}
                >
                  <span className="icon">
                    <FiTrash2 />
                  </span>
                </button>
              </td>
              <td style={{ verticalAlign: 'middle' }} title={rule.reason}>
                <span>{rule.match} </span>
                {!!rule.reason && (
                  <span className="icon has-text-grey-lighter" style={{ verticalAlign: 'bottom' }}>
                    <FiFileText />
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Rules
