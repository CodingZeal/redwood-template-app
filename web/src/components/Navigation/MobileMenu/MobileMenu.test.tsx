import { routes } from '@redwoodjs/router'
import { mockCurrentUser, render, screen } from '@redwoodjs/testing/web'

import { MobileMenu } from './MobileMenu'

describe('Navigation', () => {
  const mock = jest.fn()

  it('renders mobile navigation component', () => {
    mockCurrentUser({ id: 'foobar', name: 'FooBar' })

    render(<MobileMenu isOpen={mock} toggleOpen={mock} />)
    expect(screen.getByTestId('mobileMenu')).toBeInTheDocument()
  })

  it('renders mobile navigation component', () => {
    mockCurrentUser({ id: 'foobar', name: 'FooBar' })
    render(<MobileMenu isOpen={mock} toggleOpen={mock} />)
    const profile = screen.getByText('Edit Profile')
    const logout = screen.getByText('Logout')

    expect(profile).toBeVisible()
    expect(profile).toHaveAttribute('href', routes.profile())
    expect(logout).toBeVisible()
  })
})
