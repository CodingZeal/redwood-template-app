import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { UsersLayout } from './UsersLayout'

const renderComponent = ({ children }) =>
  render(<UsersLayout>{children}</UsersLayout>)
const children = 'Test Children'

describe('UsersLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      renderComponent({ children })
    }).not.toThrow()

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('Has link to users list', () => {
    renderComponent({ children })
    expect(screen.getByText('Users')).toHaveAttribute(
      'href',
      routes.adminUsers()
    )
  })

  it('Has link to add new user form', () => {
    renderComponent({ children })
    expect(screen.getByText('New User')).toHaveAttribute(
      'href',
      routes.adminNewUser()
    )
  })
})
