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

  it('Has link to show', () => {
    render(<RolesList roles={standard().roles} />)
    const [firstTeam, secondTeam] = standard().roles
    const [firstElement, secondElement] = screen.getAllByTestId('showRole')

    expect(firstElement).toHaveAttribute(
      'href',
      routes.adminRole({ id: firstTeam.id })
    )
    expect(secondElement).toHaveAttribute(
      'href',
      routes.adminRole({ id: secondTeam.id })
    )
  })

  it('Has link to edit', () => {
    render(<RolesList roles={standard().roles} />)
    const [firstTeam, secondTeam] = standard().roles
    const [firstElement, secondElement] = screen.getAllByTestId('editRole')

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
    const [firstElement, secondElement] = screen.getAllByTestId('archiveIcon')

    expect(firstElement).toBeInTheDocument()
    expect(secondElement).toBeInTheDocument()
  })
})
