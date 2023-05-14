import { routes } from '@redwoodjs/router'
import { mockCurrentUser, render, screen } from '@redwoodjs/testing/web'

import { MobileNavigation } from './MobileNavigation'

describe('MobileNavigation', () => {
  it('renders mobile navigation component', () => {
    mockCurrentUser({ id: 'foobar', name: 'FooBar' })

    render(<MobileNavigation />)
    expect(screen.getByTestId('mobileNav')).toBeInTheDocument()
  })

  it('renders mobile navigation component', () => {
    mockCurrentUser({ id: 'foobar', name: 'FooBar' })
    render(<MobileNavigation />)
    const profile = screen.getByText('Edit Profile')
    const logout = screen.getByText('Logout')

    expect(profile).toBeVisible()
    expect(profile).toHaveAttribute('href', routes.profile())
    expect(logout).toBeVisible()
  })
})
