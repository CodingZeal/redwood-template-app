import { render, screen } from '@redwoodjs/testing/web'

import NewRole from './NewRole'

describe('NewRole', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewRole />)
    }).not.toThrow()
  })

  it('renders RoleForm successfully', () => {
    render(<NewRole />)
    const element = screen.getByText('Name')

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })
})
