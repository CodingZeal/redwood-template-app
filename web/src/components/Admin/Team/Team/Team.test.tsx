import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { standard } from '../TeamCell/TeamCell.mock'

import Team from './Team'

describe('Team', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Team team={standard().team} />)
    }).not.toThrow()
  })

  it('renders h2 successfully', () => {
    render(<Team team={standard().team} />)
    const element = screen.getByText(`Team ${standard().team.id} Detail`)

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })

  it('renders table successfully', () => {
    render(<Team team={standard().team} />)
    const element = screen.getByRole('table')

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })

  it('renders id successfully', () => {
    render(<Team team={standard().team} />)
    const element = screen.getByText(standard().team.id)

    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('1')
  })

  it('renders name successfully', () => {
    render(<Team team={standard().team} />)
    const element = screen.getByText(standard().team.name)

    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('team1')
  })

  it('Has link to edit', () => {
    render(<Team team={standard().team} />)
    const element = screen.getByText('Edit')

    expect(element).toHaveAttribute(
      'href',
      routes.adminEditTeam({ id: standard().team.id })
    )
  })

  it('renders delete button', () => {
    render(<Team team={standard().team} />)
    const element = screen.getByRole('button', { name: 'Delete' })

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })
})
