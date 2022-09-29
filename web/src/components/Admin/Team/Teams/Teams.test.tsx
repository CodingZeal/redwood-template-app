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
    const element = screen.getByText(standard().teams[0].id)

    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('365')
  })

  it('renders a team name', () => {
    render(<TeamsList teams={standard().teams} />)
    const element = screen.getByText(standard().teams[0].name)

    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('team1')
  })

  it('renders link to team show', () => {
    render(<TeamsList teams={standard().teams} />)
    const element = screen.getByText('Show')

    expect(element).toBeVisible()
    expect(element).toHaveAttribute(
      'href',
      routes.adminTeam({ id: standard().teams[0].id })
    )
  })

  it('renders link to team edit', () => {
    render(<TeamsList teams={standard().teams} />)
    const element = screen.getByText('Edit')

    expect(element).toBeVisible()
    expect(element).toHaveAttribute(
      'href',
      routes.adminEditTeam({ id: standard().teams[0].id })
    )
  })

  it('renders delete button', () => {
    render(<TeamsList teams={standard().teams} />)
    const element = screen.getByText('Delete')

    expect(element).toBeInTheDocument()
  })
})
