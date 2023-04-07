import { routes } from '@redwoodjs/router'
import {
  render,
  screen,
  mockCurrentUser,
  waitFor,
} from '@redwoodjs/testing/web'

import { Navigation } from './Navigation'

const renderComponent = () => render(<Navigation />)

describe('Navigation', () => {
  it('renders navigation component', () => {
    renderComponent()
    expect(screen.getByTestId('nav')).toBeVisible()
  })

  it('Has link to home', () => {
    renderComponent()
    expect(screen.getByText('LUMBERSTACK')).toHaveAttribute(
      'href',
      routes.home()
    )
  })

  it('shows the login when not authenticated', () => {
    renderComponent()
    const element = screen.getByText('Login')

    expect(element).toBeVisible()
    expect(element).toHaveAttribute('href', routes.login())
  })

  it('shows the sign up when not authenticated', () => {
    renderComponent()
    const element = screen.getByText('Signup')

    expect(element).toBeVisible()
    expect(element).toHaveAttribute('href', routes.signup())
  })

  it('shows logout when authenticated', async () => {
    mockCurrentUser({ id: 'foobar', name: 'Foo Bar' })

    renderComponent()
    await waitFor(() => {
      expect(screen.getByTestId('gearIcon')).toBeInTheDocument()
    })
  })
})
