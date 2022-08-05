import { useAuth } from '@redwoodjs/auth'
import { Route, Router } from '@redwoodjs/router'
import { render, screen, renderHook, MockProviders } from '@redwoodjs/testing/web'

import { Navigation } from './Navigation'


jest.mock('@redwoodjs/router', () => ({
  ...jest.requireActual('@redwoodjs/router'),
  routes: {
    logIn: () => '/login',
    home: jest.fn().mockReturnValue('/'),
  },
}))

const renderComponent = (props = {}) => render(<Navigation {...props} />)

describe('Navigation', () => {
  it('renders navigation component', () => {
    renderComponent()
    expect(screen.getByTestId('nav')).toBeVisible()
  })
  it('shows the login when not authed', () => {
    renderComponent()
    expect(screen.getAllByTestId('nav__link-item').length).toBe(2)
    expect(screen.getByRole('link', { name: 'Login' })).toBeVisible()
  })

  it('shows logout when authed', async () => {
    renderComponent()
    const { result } = renderHook(() => useAuth())
    result.current.isAuthenticated = true
    expect(screen.getByRole('link', { name: 'Logout' })).toBeVisible()
  })
  it.only('calls login when clicked', async () => {
    renderComponent()
    screen.getByRole('link', { name: 'Login' }).click()
    // expect(mockRoutes.login).toHaveBeenCalledTimes(1)
  })
  // it('calls logout when clicked', async () => {
  //   mockUseAuth.mockReturnValueOnce({
  //     isAuthenticated: true,
  //   })
  //   renderComponent()
  //   expect(screen.getByRole('link', { name: 'Logout' })).toBeVisible()
  // })
})
