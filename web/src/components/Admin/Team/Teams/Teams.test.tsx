import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import TeamsList from './Teams'

describe('TeamsList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamsList teams={[]} />)
    }).not.toThrow()
  })
})
