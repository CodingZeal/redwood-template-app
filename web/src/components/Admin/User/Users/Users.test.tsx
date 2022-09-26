import { render, screen } from '@redwoodjs/testing/web'

import UsersList from './Users'

const renderComponent = () => render(<UsersList users={[]} />)

describe('UsersList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UsersList users={[]} />)
    }).not.toThrow()
  })

  it('renders a table', () => {
    renderComponent()
    const element = screen.getByRole('table')

    expect(element).toBeInTheDocument()
  })
})
