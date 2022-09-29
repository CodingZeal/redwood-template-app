import { render, screen } from '@redwoodjs/testing/web'

import NewRole from './NewRole'

describe('NewRole', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewRole />)
    }).not.toThrow()
  })

  it('renders a header', () => {
    render(<NewRole />)

    expect(screen.getByText('New Role')).toBeInTheDocument()
  })
})
