import { render } from '@redwoodjs/testing/web'

import CreatePasswordPage from './CreatePasswordPage'

const mockReset = jest.fn().mockResolvedValue({})

jest.mock('@redwoodjs/auth', () => ({
  ...jest.requireActual('@redwoodjs/auth'),
  useAuth: () => ({
    isAuthenticated: false,
    validateResetToken: jest.fn().mockResolvedValue({}),
    resetPassword: mockReset,
    reauthenticate: jest.fn(),
  }),
}))

describe('CreatePasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreatePasswordPage token="foo" />)
    }).not.toThrow()
  })
})
