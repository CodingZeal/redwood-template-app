import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import User from './User'

const mockUser = {
  name: 'Ron Weasley',
  email: 'test@test.com',
  id: '3',
  active: true,
  admin: true,
}

describe('User', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<User user={mockUser} />)
    }).not.toThrow()
  })

  it('shows user table', () => {
    render(<User user={mockUser} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('shows edit user', () => {
    render(<User user={mockUser} />)
    expect(screen.getByText('Edit')).toHaveAttribute(
      'href',
      routes.adminEditUser({ id: mockUser.id })
    )
  })

  it('shows edit user', () => {
    render(<User user={mockUser} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  // it('alerts to confirm removed user', () => {
  //   render(<User user={mockUser} />)

  //   const spy = jest.spyOn(User, onRemoveClick())
  //   const isPlaying = User.onRemoveClick(mockUser.id)
  //   expect(spy).toHaveBeenCalled()
  //   expect(isPlaying).toBe(true)
  // })
})
