import { render, screen } from '@redwoodjs/testing/web'

import { Loading, Failure, Success } from './EditTeamCell'
import { standard } from './EditTeamCell.mock'

describe('TeamsCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success team={standard().team} />)
    }).not.toThrow()
  })

  it('renders h2 successfully', async () => {
    render(<Success team={standard().team} />)
    const element = screen.getByText('Edit Team 1')

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })
})
