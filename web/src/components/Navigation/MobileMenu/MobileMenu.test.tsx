import { routes } from '@redwoodjs/router'
import { mockCurrentUser, render, screen } from '@redwoodjs/testing/web'

import { MobileMenu } from './MobileMenu'

describe('Navigation', () => {
  const mock = jest.fn()

  it('renders navigation component', () => {
    mockCurrentUser({ id: 'foobar', name: 'FooBar' })

    render(<MobileMenu isOpen={mock} toggleOpen={mock} />)
    expect(screen.getByTestId('mobileMenu')).toBeInTheDocument()
  })

  it('renders navigation component', () => {
    mockCurrentUser({ id: 'foobar', name: 'FooBar' })
    render(<MobileMenu isOpen={mock} toggleOpen={mock} />)
    const profile = screen.getByText('My Profile')
    const logout = screen.getByText('Logout')

    expect(profile).toBeVisible()
    expect(profile).toHaveAttribute('href', routes.profile())
    expect(logout).toBeVisible()
  })
})
