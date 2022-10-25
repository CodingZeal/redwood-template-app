import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import SignupPage from './SignupPage'

describe('SignupPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignupPage />)
    }).not.toThrow()
  })

  it('Has link to login', () => {
    render(<SignupPage />)
    expect(screen.getByText('Log in!')).toHaveAttribute('href', routes.login())
  })
})
