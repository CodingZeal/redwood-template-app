import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import UserForm from './UserForm'

const mockUser = {
  name: 'Ron Weasley',
  email: 'test@test.com',
  id: 3,
  active: true,
  admin: true,
}

describe('UserForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserForm />)
    }).not.toThrow()
  })

  it('submits then calls onSave', async () => {
    const mockSave = jest.fn()
    render(<UserForm onSave={mockSave} user={mockUser} />)

    expect(mockSave.mock.calls.length).toBe(0)

    const save = screen.getByRole('button')
    await waitFor(() => userEvent.click(save))

    expect(mockSave.mock.calls.length).toBe(1)
  })
})
