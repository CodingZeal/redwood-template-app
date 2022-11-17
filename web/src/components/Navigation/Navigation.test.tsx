import { routes } from '@redwoodjs/router'
import {
  render,
  screen,
  mockCurrentUser,
  waitFor,
} from '@redwoodjs/testing/web'

import { Navigation } from './Navigation'

const renderComponent = (props = {}) => render(<Navigation {...props} />)

describe('Navigation', () => {
  it('renders navigation component', () => {
    renderComponent()
    expect(screen.getByTestId('nav')).toBeVisible()
  })

  it('Has link to home', () => {
    renderComponent()
    expect(screen.getByText('Home')).toHaveAttribute('href', routes.home())
  })

  it('shows the login when not authenticated', () => {
    renderComponent()
    const element = screen.getByText('Login')

    expect(screen.getAllByTestId('nav__link-item').length).toBe(3)
    expect(element).toBeVisible()
    expect(element).toHaveAttribute('href', routes.login())
  })

  it('shows the sign up when not authenticated', () => {
    renderComponent()
    const element = screen.getByText('Sign Up')

    expect(element).toBeVisible()
    expect(element).toHaveAttribute('href', routes.signup())
  })

  it('shows logout when authenticated', async () => {
    mockCurrentUser({ id: 'foobar' })

    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeInTheDocument()
    })
  })
})
