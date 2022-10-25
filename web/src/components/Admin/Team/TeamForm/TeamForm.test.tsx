import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import { standard } from '../EditTeamCell/EditTeamCell.mock'

import TeamForm from './TeamForm'

describe('TeamForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamForm />)
    }).not.toThrow()
  })

  it('submits then calls onSave', async () => {
    const mockSave = jest.fn()
    render(<TeamForm onSave={mockSave} team={standard().team} />)

    expect(mockSave.mock.calls.length).toBe(0)

    const save = screen.getByRole('button')
    await waitFor(() => userEvent.click(save))

    expect(mockSave.mock.calls.length).toBe(1)
  })
})
