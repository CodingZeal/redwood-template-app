import { render } from '@redwoodjs/testing/web'
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
})
