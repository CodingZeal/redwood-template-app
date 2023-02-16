import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import { ResetPassword } from './ResetPassword'

jest.mock('@redwoodjs/web/toast', () => ({
  ...jest.requireActual('@redwoodjs/web/toast'),
  success: jest.fn(),
  Toaster: () => <div></div>,
}))

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

const renderComponent = () =>
  render(
    <ResetPassword
      resetToken={'foo'}
      title={'test'}
      message={'Test Password'}
    />
  )

describe('Reset Password Page', () => {
  it('renders without crashing', () => {
    expect(renderComponent).not.toThrow()
  })

  it('sends updated password with token for reset', async () => {
    renderComponent()
    const passwordInput = screen
      .getByLabelText('Test Password')
      .closest('input')
    await waitFor(() => userEvent.type(passwordInput, 'supersecret'))

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    await waitFor(() => userEvent.click(submitButton))
    expect(mockReset).toHaveBeenCalledWith({
      resetToken: 'foo',
      password: 'supersecret',
    })
  })
})
