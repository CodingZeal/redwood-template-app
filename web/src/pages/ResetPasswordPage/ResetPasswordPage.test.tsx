import { render, screen } from '@redwoodjs/testing/web'

import ResetPasswordPage from './ResetPasswordPage'

const renderComponent = () => render(<ResetPasswordPage resetToken={''} />)

jest.mock('', () => ({
  useAuth: () => ({
    isAuthenticated: {},
    reauthenticate: () => {},
    validateResetToken: () => {},
    resetPassword: () => {},
  }),
}))

describe('ResetPasswordPage', () => {
  it('renders the reset password page', () => {
    renderComponent()
    expect(screen.getByTestId('resetpassword-page')).toBeInTheDocument()
  })

  it('renders header', () => {
    renderComponent()
    expect(screen.getByRole('h2')).toBeInTheDocument()
  })
})
