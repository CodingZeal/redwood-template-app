import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { ProfileLayout } from './ProfileLayout'

const children = 'Test Children'

describe('ProfileLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileLayout>{children}</ProfileLayout>)
    }).not.toThrow()

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('Has link to edit profile', () => {
    render(<ProfileLayout>{children}</ProfileLayout>)
    expect(screen.getByText('Edit Profile')).toHaveAttribute(
      'href',
      routes.profile()
    )
  })

  it('Has link to edit password', () => {
    render(<ProfileLayout>{children}</ProfileLayout>)
    expect(screen.getByText('Edit Password')).toHaveAttribute(
      'href',
      routes.editPassword()
    )
  })
})
