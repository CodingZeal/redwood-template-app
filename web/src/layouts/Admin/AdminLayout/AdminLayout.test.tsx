import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { AdminLayout } from './AdminLayout'

const children = 'Test Children'

describe('AdminLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminLayout>{children}</AdminLayout>)
    }).not.toThrow()

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('Has link to users list', () => {
    render(<AdminLayout>{children}</AdminLayout>)
    expect(screen.getByText('Users')).toHaveAttribute(
      'href',
      routes.adminUsers()
    )
  })

  it('Has link to teams list', () => {
    render(<AdminLayout>{children}</AdminLayout>)
    expect(screen.getByText('Teams')).toHaveAttribute(
      'href',
      routes.adminTeams()
    )
  })

  it('Has link to roles list', () => {
    render(<AdminLayout>{children}</AdminLayout>)
    expect(screen.getByText('Roles')).toHaveAttribute(
      'href',
      routes.adminRoles()
    )
  })
})
