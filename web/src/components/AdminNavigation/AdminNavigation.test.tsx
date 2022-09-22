import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { AdminNavigation } from './AdminNavigation'

const renderComponent = (props = {}) => render(<AdminNavigation {...props} />)

describe('AdminNavigation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNavigation />)
    }).not.toThrow()
  })

  it('Has link to admin users', () => {
    renderComponent()
    expect(screen.getByText('Users')).toHaveAttribute(
      'href',
      routes.adminUsers()
    )
  })

  it('Has link to home', () => {
    renderComponent()
    expect(screen.getByText('Teams')).toHaveAttribute(
      'href',
      routes.adminTeams()
    )
  })

  it('Has link to home', () => {
    renderComponent()
    expect(screen.getByText('Roles')).toHaveAttribute(
      'href',
      routes.adminRoles()
    )
  })
})
