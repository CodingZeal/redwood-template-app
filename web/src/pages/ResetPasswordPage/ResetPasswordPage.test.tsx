import { render } from '@redwoodjs/testing/web'

import ResetPasswordPage from './ResetPasswordPage'

const mockReset = jest.fn().mockResolvedValue({})

jest.mock('src/auth', () => ({
  ...jest.requireActual('src/auth'),
  useAuth: () => ({
    isAuthenticated: false,
    validateResetToken: jest.fn().mockResolvedValue({}),
    resetPassword: mockReset,
    reauthenticate: jest.fn(),
  }),
}))

describe('ResetPasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResetPasswordPage resetToken="banana" />)
    }).not.toThrow()
  })
})
