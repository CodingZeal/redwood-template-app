import userEvent from '@testing-library/user-event'

import { Form } from '@redwoodjs/forms'
import { render, screen } from '@redwoodjs/testing/web'

import { standard } from '../UserFormTeamsCell/UserFormTeamsCell.mocks'

import { UserFormTeams } from './UserFormTeams'

jest.mock('./useTeamState', () => ({
  useTeamState: () => ({
    addTeam: () => {},
    dispatch: () => {},
    removeTeam: () => {},
    state: {},
  }),
}))

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

  // it('renders a team name', () => {
  //   render(
  //     <Form>
  //       <UserFormTeams
  //         roleIds={[]}
  //         roleValue={[]}
  //         roles={standard().userFormTeams.roles}
  //         teamIds={[]}
  //         teams={standard().userFormTeams.teams}
  //       />
  //     </Form>
  //   )
  //   const [firstTeam] = standard().userFormTeams.teams
  //   // const [firstElement] = screen.getAllByText(firstTeam.name)
  //   // const [secondElement] = screen.getAllByText(secondTeam.name)
  //   userEvent.selectOptions(
  //     screen.getByRole('option', { name: `${firstTeam.name}` }),
  //     ['team1', 'team2']
  //   )
  //   // expect(screen.getByRole('select', { name: 'team1' }).selected).toBe(true)
  //   expect(
  //     (screen.getByText('team1') as HTMLOptionElement).selected
  //   ).toBeTruthy()
  //   // expect(firstElement).toBeInTheDocument()
  //   // expect(firstElement).toContainHTML('team1')

  //   // expect(secondElement).toBeInTheDocument()
  //   // expect(firstElement).toContainHTML('team2')
  // })
})
