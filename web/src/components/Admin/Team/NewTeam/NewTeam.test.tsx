import { render, screen } from '@redwoodjs/testing/web'
import NewTeam from './NewTeam'

describe('NewTeam', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewTeam />)
    }).not.toThrow()
  })

  it('renders h2 successfully', async () => {
    render(<NewTeam />)
    const element = screen.getByText('New Team')

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })
})
