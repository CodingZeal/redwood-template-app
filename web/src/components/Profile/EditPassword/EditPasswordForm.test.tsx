import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import { EditPasswordForm } from './EditPasswordForm'

describe('EditPasswordForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <EditPasswordForm
          error={undefined}
          loading={undefined}
          onSave={undefined}
        />
      )
    }).not.toThrow()
  })

  it('renders existing password input', () => {
    render(
      <EditPasswordForm
        error={undefined}
        loading={undefined}
        onSave={undefined}
      />
    )
    const oldPassword = screen.getByLabelText('Your Existing Password')

    expect(oldPassword).toBeInTheDocument()
    expect(oldPassword).toBeVisible()
  })

  it('renders new password input', () => {
    render(
      <EditPasswordForm
        error={undefined}
        loading={undefined}
        onSave={undefined}
      />
    )
    const oldPassword = screen.getByLabelText('New Password')

    expect(oldPassword).toBeInTheDocument()
    expect(oldPassword).toBeVisible()
  })

  it('renders confirm password input', () => {
    render(
      <EditPasswordForm
        error={undefined}
        loading={undefined}
        onSave={undefined}
      />
    )
    const oldPassword = screen.getByLabelText('Confirm New Password')

    expect(oldPassword).toBeInTheDocument()
    expect(oldPassword).toBeVisible()
  })

  it('requires all fields', async () => {
    const mockSave = jest.fn()
    render(
      <EditPasswordForm
        error={undefined}
        loading={undefined}
        onSave={mockSave}
      />
    )
    const save = screen.getByRole('button')
    await waitFor(() => userEvent.click(save))

    expect(screen.getByText('Existing Password is required')).toBeVisible()
    expect(screen.getByText('New Password is required')).toBeVisible()
    expect(screen.getByText('Confirm New Password is required')).toBeVisible()

    expect(mockSave.mock.calls.length).toBe(0)
  })

  it('submits then calls onSave', async () => {
    const mockSave = jest.fn()
    render(
      <EditPasswordForm
        error={undefined}
        loading={undefined}
        onSave={mockSave}
      />
    )

    expect(mockSave.mock.calls.length).toBe(0)

    const passwordInput = screen.getByLabelText('Your Existing Password')
    await waitFor(() => userEvent.type(passwordInput, 'supersecret'))

    const newPasswordInput = screen.getByLabelText('New Password')
    await waitFor(() => userEvent.type(newPasswordInput, 'halloween'))

    const confirmPasswordInput = screen.getByLabelText('Confirm New Password')
    await waitFor(() => userEvent.type(confirmPasswordInput, 'halloween'))

    const save = screen.getByRole('button')
    await waitFor(() => userEvent.click(save))
    expect(mockSave.mock.calls.length).toBe(1)
  })
})
