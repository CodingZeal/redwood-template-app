import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { standard } from '../RolesCell/RolesCell.mock'

import RolesList from './Roles'

describe('RolesList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RolesList roles={standard().roles} />)
    }).not.toThrow()
  })

  it('renders table successfully', () => {
    render(<RolesList roles={standard().roles} />)
    const element = screen.getByRole('table')

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })

  it('renders role id successfully', () => {
    render(<RolesList roles={standard().roles} />)
    const [firstTeam, secondTeam] = standard().roles
    const [firstElement] = screen.getAllByText(firstTeam.id)
    const [secondElement] = screen.getAllByText(secondTeam.id)

    expect(firstElement).toBeInTheDocument()
    expect(firstElement).toBeVisible()
    expect(secondElement).toBeInTheDocument()
    expect(secondElement).toBeVisible()
  })

  it('renders name successfully', () => {
    render(<RolesList roles={standard().roles} />)
    const [firstTeam, secondTeam] = standard().roles
    const [firstElement] = screen.getAllByText(firstTeam.name)
    const [secondElement] = screen.getAllByText(secondTeam.name)

    expect(firstElement).toBeInTheDocument()
    expect(firstElement).toBeVisible()
    expect(secondElement).toBeInTheDocument()
    expect(secondElement).toBeVisible()
  })

  it('Has link to edit', () => {
    render(<RolesList roles={standard().roles} />)
    const [firstTeam, secondTeam] = standard().roles
    const [firstElement, secondElement] = screen.getAllByText('Edit')

    expect(firstElement).toHaveAttribute(
      'href',
      routes.adminEditRole({ id: firstTeam.id })
    )
    expect(secondElement).toHaveAttribute(
      'href',
      routes.adminEditRole({ id: secondTeam.id })
    )
  })

  it('renders delete button', () => {
    render(<RolesList roles={standard().roles} />)
    const [firstElement, secondElement] = screen.getAllByText('Delete')

    expect(firstElement).toBeInTheDocument()
    expect(secondElement).toBeInTheDocument()
  })
})
