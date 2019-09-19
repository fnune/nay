import '@testing-library/jest-dom/extend-expect'
import { act, render, fireEvent, RenderResult } from '@testing-library/react'
import React from 'react'

import Rules from './Rules'

jest.mock('../utils')

let container: RenderResult

describe('Rules', () => {
  beforeEach(async () => {
    await act(async () => {
      container = render(<Rules />)
    })
  })

  it('can submit a new rule without a reason', async () => {
    await act(async () => {
      fireEvent.input(container.getByTestId('rule-input'), { target: { value: 'medium.com' } })
    })

    await act(async () => {
      fireEvent.submit(container.getByTestId('rule-submit-button'))
    })

    expect(container.getAllByTestId('rule')).toHaveLength(1)
    expect(container.getByTestId('rule')).toHaveTextContent('medium.com')
  })

  it('can submit a new rule with a reason', async () => {
    await act(async () => {
      fireEvent.input(container.getByTestId('rule-input'), { target: { value: 'techcrunch.com' } })
      fireEvent.input(container.getByTestId('reason-input'), {
        target: { value: 'Terrible GDPR pop-up.' },
      })
    })

    await act(async () => {
      fireEvent.submit(container.getByTestId('rule-submit-button'))
    })

    expect(container.getAllByTestId('rule')).toHaveLength(2)
    expect(container.getAllByTestId('rule')[0]).toHaveTextContent('medium.com')
    expect(container.getAllByTestId('rule')[1]).toHaveTextContent('techcrunch.com')
  })
})
