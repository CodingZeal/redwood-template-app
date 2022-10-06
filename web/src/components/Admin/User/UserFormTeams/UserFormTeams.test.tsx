import userEvent from '@testing-library/user-event'

import { Form } from '@redwoodjs/forms'
import { render, screen } from '@redwoodjs/testing/web'

import { standard } from '../UserFormTeamsCell/UserFormTeamsCell.mocks'

import { UserFormTeams } from './UserFormTeams'

const [firstTeam] = standard().userFormTeams.teams
const [firstRole, secondRole] = standard().userFormTeams.roles
const mockFunction = jest.fn()

describe('UserFormTeams when a value is not selected.', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Form>
          <UserFormTeams
            roleIds={[]}
            roleValue={[]}
            roles={standard().userFormTeams.roles}
            teamIds={[]}
            teams={standard().userFormTeams.teams}
          />
        </Form>
      )
    }).not.toThrow()
  })

  it('renders team name successfully', () => {
    const { getByTestId } = render(
      <Form>
        <UserFormTeams
          roleIds={[]}
          roleValue={[]}
          roles={standard().userFormTeams.roles}
          teamIds={[]}
          teams={standard().userFormTeams.teams}
        />
      </Form>
    )
    const [firstTeam, secondTeam] = standard().userFormTeams.teams
    const firstElement = firstTeam.name
    const secondElement = secondTeam.name
    userEvent.selectOptions(getByTestId('select team'), `${firstElement}`)
    userEvent.selectOptions(getByTestId('select team'), `${secondElement}`)

    expect(firstElement).toBeTruthy()
    expect(secondElement).toBeTruthy()
  })

  describe('UserFormTeams when a value is selected.', () => {
    it('renders successfully', () => {
      expect(() => {
        render(
          <Form>
            <UserFormTeams
              roleIds={[firstRole.id]}
              roles={standard().userFormTeams.roles}
              teamIds={[firstTeam.id]}
              teams={standard().userFormTeams.teams}
              roleValue={mockFunction}
            />
          </Form>
        )
      }).not.toThrow()
    })

    it('renders Add Team button', () => {
      render(
        <Form>
          <UserFormTeams
            roleIds={[firstRole.id]}
            roles={standard().userFormTeams.roles}
            teamIds={[firstTeam.id]}
            teams={standard().userFormTeams.teams}
            roleValue={mockFunction}
          />
        </Form>
      )
      const element = screen.getByRole('button', { name: 'Add Team' })

      expect(element).toBeInTheDocument()
    })

    it('renders roles within a team', () => {
      render(
        <Form>
          <UserFormTeams
            roleIds={[firstRole.id]}
            roles={standard().userFormTeams.roles}
            teamIds={[firstTeam.id]}
            teams={standard().userFormTeams.teams}
            roleValue={mockFunction}
          />
        </Form>
      )
      const team = screen.getByTestId('teamName')
      const firstelement = screen.getByLabelText(`${firstRole.name}`)
      const secondElement = screen.getByLabelText(`${secondRole.name}`)

      const remove = screen.getByTestId('remove-team')

      expect(team).toBeInTheDocument()
      expect(firstelement).toBeInTheDocument()
      expect(secondElement).toBeInTheDocument()
      expect(remove).toBeInTheDocument()
    })
  })
})
