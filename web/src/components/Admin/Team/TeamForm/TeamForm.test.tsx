import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import TeamForm from './TeamForm'

const mockTeam = {
  id: '1',
  name: 'team1',
  active: true,
  updatedAt: '',
  createdAt: '',
  Memberships: {
    id: 'monkey1',
  },
}

describe('TeamForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamForm />)
    }).not.toThrow()
  })

  it('submits then calls onSave', async () => {
    const mockSave = jest.fn()
    render(<TeamForm onSave={mockSave} team={mockTeam} />)

    expect(mockSave.mock.calls.length).toBe(0)

    const save = screen.getByRole('button')
    await waitFor(() => userEvent.click(save))

    expect(mockSave.mock.calls.length).toBe(1)
  })
})
