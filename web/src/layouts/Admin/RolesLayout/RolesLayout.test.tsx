import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { RolesLayout } from './RolesLayout'

const renderComponent = ({ children }) =>
  render(<RolesLayout>{children}</RolesLayout>)
const children = 'Test Children'

describe('RolesLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      renderComponent({ children })
    }).not.toThrow()

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('Has link to roles list', () => {
    renderComponent({ children })
    expect(screen.getByText('Roles')).toHaveAttribute(
      'href',
      routes.adminRoles()
    )
  })

  it('Has link to add new role form', () => {
    renderComponent({ children })
    expect(screen.getByText('New Role')).toHaveAttribute(
      'href',
      routes.adminNewRole()
    )
  })
})
