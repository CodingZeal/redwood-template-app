import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { standard } from '../RoleCell/RoleCell.mock'

import Role from './Role'

describe('Role', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Role role={standard().role} />)
    }).not.toThrow()
  })

  it('renders h2 successfully', () => {
    render(<Role role={standard().role} />)
    const element = screen.getByText(`Role ${standard().role.id} Detail`)

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })

  it('renders table successfully', () => {
    render(<Role role={standard().role} />)
    const element = screen.getByRole('table')

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })

  it('renders id successfully', () => {
    render(<Role role={standard().role} />)
    const element = screen.getByText(standard().role.id)

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })

  it('renders name successfully', () => {
    render(<Role role={standard().role} />)
    const element = screen.getByText(standard().role.name)

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })

  it('Has link to edit', () => {
    render(<Role role={standard().role} />)
    const element = screen.getByText('Edit')

    expect(element).toHaveAttribute(
      'href',
      routes.adminEditRole({ id: standard().role.id })
    )
  })

  it('renders delete button', () => {
    render(<Role role={standard().role} />)
    const element = screen.getByRole('button', { name: 'Delete' })

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })
})
