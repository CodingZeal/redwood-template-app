import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LinkItem = (props) => (
  <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
    <Link {...props}>{props.children}</Link>
  </li>
)

const AdminPage = () => {
  return (
    <>
      <MetaTags title="Admin" description="Admin page" />

      <h1>Admin</h1>
      <ul>
        <LinkItem to={routes.adminUsers()}>Users</LinkItem>
        <LinkItem to={routes.adminTeams()}>Teams</LinkItem>
        <LinkItem to={routes.adminRoles()}>Roles</LinkItem>
      </ul>
    </>
  )
}

export default AdminPage
