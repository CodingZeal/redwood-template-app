import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import { standard } from '../EditRoleCell/EditRoleCell.mock'

import RoleForm from './RoleForm'

describe('RoleForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RoleForm />)
    }).not.toThrow()
  })

  it('submits then calls onSave', async () => {
    const mockSave = jest.fn()
    render(<RoleForm onSave={mockSave} role={standard().role} />)

    expect(mockSave.mock.calls.length).toBe(0)

    const save = screen.getByRole('button')
    await waitFor(() => userEvent.click(save))

    expect(mockSave.mock.calls.length).toBe(1)
  })
})
