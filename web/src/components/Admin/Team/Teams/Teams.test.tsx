import { render, screen } from '@redwoodjs/testing/web'

import TeamsList from './Teams'
import { routes } from '@redwoodjs/router'

const mockTeams = [
 {
    id: '1',
    name: 'team1',
    active: true,
    updatedAt: '',
    createdAt: '',
    memberships: [
      {
        id: 'monkey1',
      },
    ],
  },
]

describe('TeamsList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeamsList teams={[]} />)
    }).not.toThrow()
  })

  it('renders a table', () => {
    render(<TeamsList teams={mockTeams} />)
    const element = screen.getByRole('table')

    expect(element).toBeInTheDocument()
  })

  it('renders link to team show', () => {
    render(<TeamsList teams={mockTeams} />)
    const team = mockTeams[0]
    const element = screen.getByText('Show')
    expect(element).toBeVisible()
    expect(element).toHaveAttribute('href', routes.adminTeam({ id: team.id }))
  })

  it('renders link to team edit', () => {
    render(<TeamsList teams={mockTeams} />)
    const team = mockTeams[0]
    const element = screen.getByText('Edit')
    expect(element).toBeVisible()
    expect(element).toHaveAttribute('href', routes.adminEditTeam({ id: team.id }))
  })

  it('renders a button', () => {
    render(<TeamsList teams={mockTeams} />)
    const element = screen.getByText('Delete')

    expect(element).toBeInTheDocument()
  })
})
