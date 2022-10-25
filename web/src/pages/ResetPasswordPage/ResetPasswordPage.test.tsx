import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import ResetPasswordPage from './ResetPasswordPage'

jest.mock('@redwoodjs/web/toast', () => ({
  ...jest.requireActual('@redwoodjs/web/toast'),
  success: jest.fn(),
  Toaster: () => <div></div>,
}))

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

const renderComponent = () => render(<ResetPasswordPage resetToken={'foo'} />)

describe('Reset Password Page', () => {
  it('renders without crashing', () => {
    expect(renderComponent).not.toThrow()
  })

  it('sends updated password with token for reset', async () => {
    renderComponent()
    const passwordInput = screen.getByLabelText('New Password').closest('input')
    await waitFor(() => userEvent.type(passwordInput, 'supersecret'))

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    await waitFor(() => userEvent.click(submitButton))
    expect(mockReset).toHaveBeenCalledWith({
      resetToken: 'foo',
      password: 'supersecret',
    })
  })
})
