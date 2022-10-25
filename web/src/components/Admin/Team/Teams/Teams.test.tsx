import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { standard } from '../TeamsCell/TeamsCell.mock'

import TeamsList from './Teams'

describe('TeamsList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamsList teams={standard().teams} />)
    }).not.toThrow()
  })

  it('renders a table', () => {
    render(<TeamsList teams={standard().teams} />)
    const element = screen.getByRole('table')

    expect(element).toBeInTheDocument()
  })

  it('renders a team id', () => {
    render(<TeamsList teams={standard().teams} />)
    const [firstTeam, secondTeam] = standard().teams
    const [firstElement] = screen.getAllByText(firstTeam.id)
    const [secondElement] = screen.getAllByText(secondTeam.id)

    expect(firstElement).toBeInTheDocument()
    expect(firstElement).toContainHTML('365')
    expect(secondElement).toBeInTheDocument()
    expect(secondElement).toContainHTML('10')
  })

  it('renders a team name', () => {
    render(<TeamsList teams={standard().teams} />)
    const [firstTeam, secondTeam] = standard().teams
    const [firstElement] = screen.getAllByText(firstTeam.name)
    const [secondElement] = screen.getAllByText(secondTeam.name)

    expect(firstElement).toBeInTheDocument()
    expect(firstElement).toContainHTML('team1')
    expect(secondElement).toBeInTheDocument()
    expect(secondElement).toContainHTML('team2')
  })

  it('renders link to team show', () => {
    render(<TeamsList teams={standard().teams} />)
    const [firstTeam, secondTeam] = standard().teams
    const [firstElement, secondElement] = screen.getAllByText('Show')

    expect(firstElement).toHaveAttribute(
      'href',
      routes.adminTeam({ id: firstTeam.id })
    )
    expect(secondElement).toHaveAttribute(
      'href',
      routes.adminTeam({ id: secondTeam.id })
    )
  })

  it('renders link to team edit', () => {
    render(<TeamsList teams={standard().teams} />)
    const [firstTeam, secondTeam] = standard().teams
    const [firstElement, secondElement] = screen.getAllByText('Edit')

    expect(firstElement).toHaveAttribute(
      'href',
      routes.adminEditTeam({ id: firstTeam.id })
    )
    expect(secondElement).toHaveAttribute(
      'href',
      routes.adminEditTeam({ id: secondTeam.id })
    )
  })

  it('renders delete button', () => {
    render(<TeamsList teams={standard().teams} />)
    const [firstElement, secondElement] = screen.getAllByText('Delete')

    expect(firstElement).toBeInTheDocument()
    expect(secondElement).toBeInTheDocument()
  })
})
