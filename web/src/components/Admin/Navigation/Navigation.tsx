import { NavLink, routes } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="admin__link-item" className="mr-3 cursor-pointer">
    <NavLink activeClassName="bg-orange-300" {...props}>
      {props.children}
    </NavLink>
  </li>
)

const Navigation = () => (
  <ul data-testid="admin-nav" className="my-3">
    <LinkItem to={routes.adminUsers()}>Users</LinkItem>
    <LinkItem to={routes.adminTeams()}>Teams</LinkItem>
    <LinkItem to={routes.adminRoles()}>Roles</LinkItem>
  </ul>
)

export { Navigation }
