import { Set, Router, Route } from '@redwoodjs/router'

import TeamsLayout from 'src/layouts/Admin/TeamsLayout'

import RolesLayout from 'src/layouts/Admin/RolesLayout'

import UsersLayout from 'src/layouts/Admin/UsersLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={TeamsLayout}>
        <Route path="/admin/teams/new" page={AdminTeamNewTeamPage} name="adminNewTeam" />
        <Route path="/admin/teams/{id}/edit" page={AdminTeamEditTeamPage} name="adminEditTeam" />
        <Route path="/admin/teams/{id}" page={AdminTeamTeamPage} name="adminTeam" />
        <Route path="/admin/teams" page={AdminTeamTeamsPage} name="adminTeams" />
      </Set>
      <Set wrap={RolesLayout}>
        <Route path="/admin/roles/new" page={AdminRoleNewRolePage} name="adminNewRole" />
        <Route path="/admin/roles/{id}/edit" page={AdminRoleEditRolePage} name="adminEditRole" />
        <Route path="/admin/roles/{id}" page={AdminRoleRolePage} name="adminRole" />
        <Route path="/admin/roles" page={AdminRoleRolesPage} name="adminRoles" />
      </Set>
      <Set wrap={UsersLayout}>
        <Route path="/admin/users/new" page={AdminUserNewUserPage} name="adminNewUser" />
        <Route path="/admin/users/{id}/edit" page={AdminUserEditUserPage} name="adminEditUser" />
        <Route path="/admin/users/{id}" page={AdminUserUserPage} name="adminUser" />
        <Route path="/admin/users" page={AdminUserUsersPage} name="adminUsers" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
