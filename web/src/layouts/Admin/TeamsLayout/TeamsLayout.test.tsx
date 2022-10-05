import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { TeamsLayout } from './TeamsLayout'

const renderComponent = ({ children }) =>
  render(<TeamsLayout>{children}</TeamsLayout>)
const children = 'Test Children'

describe('TeamsLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      renderComponent({ children })
    }).not.toThrow()

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('Has link to teams list', () => {
    renderComponent({ children })
    expect(screen.getByText('Teams')).toHaveAttribute(
      'href',
      routes.adminTeams()
    )
  })

  it('Has link to add new team form', () => {
    renderComponent({ children })
    expect(screen.getByText('New Team')).toHaveAttribute(
      'href',
      routes.adminNewTeam()
    )
  })
})
