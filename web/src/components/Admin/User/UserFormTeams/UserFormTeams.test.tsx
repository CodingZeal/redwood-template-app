import userEvent from '@testing-library/user-event'

import { Form } from '@redwoodjs/forms'
import { render, screen } from '@redwoodjs/testing/web'

import { standard } from '../UserFormTeamsCell/UserFormTeamsCell.mocks'

import { UserFormTeams } from './UserFormTeams'

describe('UserFormTeams', () => {
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

  it('renders Add Team button', () => {
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
    const element = screen.getByRole('button', { name: 'Add Team' })

    expect(element).toBeInTheDocument()
  })
})
