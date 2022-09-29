import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { standard } from '../Usercell/UserCell.mock'

import User from './User'

describe('User', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<User user={standard().user} />)
    }).not.toThrow()
  })

  it('shows user table', () => {
    render(<User user={standard().user} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('renders id successfully', () => {
    render(<User user={standard().user} />)
    const element = screen.getByText(standard().user.id)

    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('42')
  })

  it('renders email successfully', () => {
    render(<User user={standard().user} />)
    const element = screen.getByText(standard().user.email)

    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('harry.potter@wizard.com')
  })

  it('renders name successfully', () => {
    render(<User user={standard().user} />)
    const element = screen.getByText(standard().user.name)

    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('Harry')
  })

  it('shows edit user', () => {
    render(<User user={standard().user} />)

    expect(screen.getByText('Edit')).toHaveAttribute(
      'href',
      routes.adminEditUser({ id: standard().user.id })
    )
  })

  it('shows remove button', () => {
    render(<User user={standard().user} />)

    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })
})
