import { Set, Router, Route, Private } from '@redwoodjs/router'

import { AdminLayout } from './layouts/Admin/Layout'
import { RolesLayout } from './layouts/Admin/RolesLayout'
import { TeamsLayout } from './layouts/Admin/TeamsLayout'
import { UsersLayout } from './layouts/Admin/UsersLayout'
import { MainLayout } from './layouts/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Set wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Private unauthenticated="forbidden">
          <Route path="/profile" page={ProfilePage} name="profile" />
        </Private>
        <Private roles="super admin" unauthenticated="forbidden">
          <Set wrap={AdminLayout}>
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
          </Set>
        </Private>
        <Route notfound page={NotFoundPage} />
        <Route path="/forbidden" page={ForbiddenPage} name="forbidden" />
      </Set>
    </Router>
  )
}

export default Routes
