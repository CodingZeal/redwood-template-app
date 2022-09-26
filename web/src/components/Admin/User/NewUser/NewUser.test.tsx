import { render, screen } from '@redwoodjs/testing/web'

import NewUser from './NewUser'

describe('NewUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewUser />)
    }).not.toThrow()
  })

  it('renders a header', () => {
    render(<NewUser />)

    expect(screen.getByText('New User')).toBeInTheDocument()
  })
})
