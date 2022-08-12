import { routes } from '@redwoodjs/router'
import {
  render,
  screen,
  mockCurrentUser,
  waitFor,
} from '@redwoodjs/testing/web'

import { Navigation } from './Navigation'

jest.mock('@redwoodjs/router', () => ({
  ...jest.requireActual('@redwoodjs/router'),
  routes: {
    home: jest.fn(),
    login: jest.fn(),
  },
}))

const renderComponent = (props = {}) => render(<Navigation {...props} />)

describe('Navigation', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders navigation component', () => {
    renderComponent()
    expect(screen.getByTestId('nav')).toBeVisible()
  })

  it('Calls the link home when clicked', () => {
    renderComponent()
    screen.getByText('Home').click()
    expect(routes.home).toHaveBeenCalledTimes(1)
  })

  it('shows the login when not authed', () => {
    renderComponent()
    expect(screen.getAllByTestId('nav__link-item').length).toBe(2)
    expect(screen.getByText('Login')).toBeVisible()
  })

  it('calls login when clicked', async () => {
    renderComponent()
    screen.getByText('Login').click()
    expect(routes.login).toHaveBeenCalledTimes(1)
  })

  it('calls logout when clicked', async () => {
    mockCurrentUser({ id: 'foobar' })
    renderComponent()
    await waitFor(() => {
      const logoutElem = screen.getByText('Logout')
      expect(logoutElem).toBeInTheDocument()
    })
  })
})
