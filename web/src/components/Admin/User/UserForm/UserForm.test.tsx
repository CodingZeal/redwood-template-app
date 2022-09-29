import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import { standard } from '../EditUserCell/EditUserCell.mock'

import UserForm from './UserForm'

describe('UserForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserForm />)
    }).not.toThrow()
  })

  it('submits then calls onSave', async () => {
    const mockSave = jest.fn()
    render(<UserForm onSave={mockSave} user={standard().user} />)

    expect(mockSave.mock.calls.length).toBe(0)

    const save = screen.getByRole('button')
    await waitFor(() => userEvent.click(save))

    expect(mockSave.mock.calls.length).toBe(1)
  })
})
