import { mockCurrentUser, render, screen } from '@redwoodjs/testing/web'

import { AvatarMenu } from './AvatarMenu'

describe('Navigation', () => {
  const mock = jest.fn()

  it('renders avatar menu component', () => {
    mockCurrentUser({ id: 'foobar', name: 'FooBar' })

    render(<AvatarMenu isOpen={mock} toggleOpen={mock} />)
    expect(screen.getByTestId('avatarMenu')).toBeInTheDocument()
  })

  it('renders avatar menu link', () => {
    mockCurrentUser({ id: 'foobar', name: 'FooBar' })
    render(<AvatarMenu isOpen={mock} toggleOpen={mock} />)
    const email = screen.getByText('Edit Email')
    const password = screen.getByText('Edit Password')
    const profile = screen.getByText('Edit Profile')
    const logout = screen.getByText('Logout')

    expect(email).toBeVisible()
    expect(password).toBeVisible()
    expect(profile).toBeVisible()
    expect(logout).toBeVisible()
  })
})
