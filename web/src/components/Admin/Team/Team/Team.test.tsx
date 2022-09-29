import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'
import Team from './Team'

const mockTeam = {
  id: '1',
  name: 'team1',
  active: true,
  updatedAt: '',
  createdAt: '',
  Memberships: {
    id: 'monkey1',
  },
}

describe('Team', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Team team={mockTeam} />)
    }).not.toThrow()
  })

  it('renders h2 successfully', () => {
    render(<Team team={mockTeam} />)
    const element = screen.getByText(`Team ${mockTeam.id} Detail`)

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })

  it('renders table successfully', () => {
    render(<Team team={mockTeam} />)
    const element = screen.getByRole('table')

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })

  it('Has link to edit', () => {
    render(<Team team={mockTeam} />)
    const element = screen.getByText('Edit')

    expect(element).toHaveAttribute(
      'href',
      routes.adminEditTeam({ id: mockTeam.id })
    )
  })

  it('renders button successfully', () => {
    render(<Team team={mockTeam} />)
    const element = screen.getByRole('button', { name: 'Delete' })

    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
  })
})
