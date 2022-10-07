import { NavLink, routes } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="admin__link-item" className="mr-3 cursor-pointer">
    <NavLink activeClassName="bg-orange-300" {...props}>
      {props.children}
    </NavLink>
  </li>
)

const SubNavigation = () => (
  <ul data-testid="admin-nav" className="my-3">
    <LinkItem to={routes.profile()}>Edit Profile</LinkItem>
    <LinkItem to={routes.editPassword()}>Edit Password</LinkItem>
  </ul>
)

export { SubNavigation }
