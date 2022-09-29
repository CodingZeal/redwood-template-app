import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { standard } from '../UsersCell/UsersCell.mock'

import UsersList from './Users'

describe('UsersList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UsersList users={standard().users} />)
    }).not.toThrow()
  })

  it('renders a table', () => {
    render(<UsersList users={standard().users} />)
    const element = screen.getByRole('table')

    expect(element).toBeInTheDocument()
  })

  it('shows user', () => {
    render(<UsersList users={standard().users} />)
    const [firstUser, secondUser] = standard().users
    const [firstElement, secondElement] = screen.getAllByText('Show')

    expect(firstElement).toHaveAttribute(
      'href',
      routes.adminUser({ id: firstUser.id })
    )
    expect(secondElement).toHaveAttribute(
      'href',
      routes.adminUser({ id: secondUser.id })
    )
  })

  it('shows edit', () => {
    render(<UsersList users={standard().users} />)
    const [firstUser, secondUser] = standard().users
    const [firstElement, secondElement] = screen.getAllByText('Edit')

    expect(firstElement).toHaveAttribute(
      'href',
      routes.adminEditUser({ id: firstUser.id })
    )
    expect(secondElement).toHaveAttribute(
      'href',
      routes.adminEditUser({ id: secondUser.id })
    )
  })

  it('shows archive user button', () => {
    render(<UsersList users={standard().users} />)
    const element = screen.getByRole('button', { name: 'Archive' })

    expect(element).toBeInTheDocument()
  })

  it('shows reactivate user button', () => {
    render(<UsersList users={standard().users} />)

    const element = screen.getByRole('button', { name: 'Reactivate' })
    expect(element).toBeInTheDocument()
  })
})
