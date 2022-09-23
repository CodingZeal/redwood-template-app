import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { Navigation } from './Navigation'

const renderComponent = (props = {}) => render(<Navigation {...props} />)

describe('Navigation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Navigation />)
    }).not.toThrow()
  })

  it('Has link to admin users', () => {
    renderComponent()
    expect(screen.getByText('Users')).toHaveAttribute(
      'href',
      routes.adminUsers()
    )
  })

  it('Has link to admin teams', () => {
    renderComponent()
    expect(screen.getByText('Teams')).toHaveAttribute(
      'href',
      routes.adminTeams()
    )
  })

  it('Has link to admin roles', () => {
    renderComponent()
    expect(screen.getByText('Roles')).toHaveAttribute(
      'href',
      routes.adminRoles()
    )
  })
})
