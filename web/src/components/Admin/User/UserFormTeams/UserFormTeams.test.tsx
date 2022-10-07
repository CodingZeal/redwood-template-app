import userEvent from '@testing-library/user-event'

import { Form } from '@redwoodjs/forms'
import { render, screen, within } from '@redwoodjs/testing/web'

import { standard } from '../UserFormTeamsCell/UserFormTeamsCell.mocks'

import { UserFormTeams } from './UserFormTeams'

const [firstTeam] = standard().userFormTeams.teams
const [firstRole, secondRole] = standard().userFormTeams.roles

describe('UserFormTeams', () => {
  describe('when a value is not selected', () => {
    const renderComponent = () =>
      render(
        <Form>
          <UserFormTeams
            roleIds={[]}
            roles={standard().userFormTeams.roles}
            roleValue={jest.fn()}
            teamIds={[]}
            teams={standard().userFormTeams.teams}
          />
        </Form>
      )

    it('renders successfully', () => {
      expect(renderComponent).not.toThrow()
    })

    it('renders team name successfully', () => {
      renderComponent()
      const [firstTeam, secondTeam] = standard().userFormTeams.teams
      const firstElement = firstTeam.name
      const secondElement = secondTeam.name
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', {
          name: `${firstElement}`,
        })
      )
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', {
          name: `${secondElement}`,
        })
      )
      expect(firstElement).toBeTruthy()
      expect(secondElement).toBeTruthy()
    })

    it('renders Add Team button', () => {
      renderComponent()
      const element = screen.getByRole('button', { name: 'Add Team' })

      expect(element).toBeInTheDocument()
    })
  })
  describe('when a value is selected.', () => {
    const renderComponent = () =>
      render(
        <Form>
          <UserFormTeams
            roleIds={[firstRole.id]}
            roles={standard().userFormTeams.roles}
            teamIds={[firstTeam.id]}
            teams={standard().userFormTeams.teams}
            roleValue={(_x, y) => y}
          />
        </Form>
      )
    it('renders successfully', () => {
      expect(renderComponent).not.toThrow()
    })

    it('renders roles within a team', () => {
      renderComponent()
      const team = screen.getByText(firstTeam.name).closest('tr')
      const selectedRole = within(team).getByLabelText(firstRole.name, {
        selector: 'input',
      })
      const unselectedRole = within(team).getByLabelText(secondRole.name, {
        selector: 'input',
      })

      expect(team).toBeInTheDocument()
      expect(selectedRole).toBeInTheDocument()
      expect(selectedRole).toBeChecked()
      expect(unselectedRole).toBeInTheDocument()
      expect(unselectedRole).not.toBeChecked()
    })

    it('renders remove team button', () => {
      renderComponent()
      const team = screen.getByText(firstTeam.name).closest('tr')
      const remove = within(team).getByRole('button', { name: 'Remove Team' })
      expect(remove).toBeInTheDocument()
    })
  })
})
