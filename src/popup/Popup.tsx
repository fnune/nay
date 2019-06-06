import React, { useEffect, useState } from 'react'

import { block } from '../utils'

const useRules = (): [Rule[], (newRules: Rule[]) => void] => {
  const [rules, setRules] = useState<Rule[]>([])

  useEffect(() => {
    browser.storage.sync
      .get<NayStorage>('rules')
      .then(({ rules }) => setRules(rules ? JSON.parse(rules) : []))
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
    <form
      style={{ height: '200px', width: '300px' }}
      onSubmit={event => {
        event.preventDefault()
        setRules([...rules, { match: input }])
        setInput('')
      }}
    >
      <input
        value={input}
        onChange={({ target: { value } }) => setInput(value)}
        placeholder="Add a new entry..."
      />
      <ul style={{ padding: 0, listStyleType: 'none' }}>
        {rules.map(rule => (
          <li
            key={rule.match}
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            {rule.match}
            <button
              type="button"
              onClick={() => setRules(rules.filter(rl => rl.match !== rule.match))}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </form>
  )
}

export default Popup
