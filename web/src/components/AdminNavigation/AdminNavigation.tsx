import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
    <Link {...props} clickHandler={() => selected(routes)}>{props.children}</Link>
  </li>
)

const AdminNavigation = () => {
  const { hasRole } = useAuth()
  const selected = () => {
    if (LinkItem === onclick(MouseEvent)) {
      return true
    }
  }
  const adminNav = selected ? 'text-gray-400' : 'text-black'
  return (
    <ul
      data-testid="nav"
      className={`my-3 flex flex-row items-start ${adminNav}`}
    >
      {hasRole('super admin') && (
        <div className="flex flex-row items-start">
          <LinkItem to={routes.adminUsers()}>Users</LinkItem>
          <LinkItem to={routes.adminTeams()}>Teams</LinkItem>
          <LinkItem to={routes.adminRoles()}>Roles</LinkItem>
        </div>
      )}
    </ul>
  )
}

export { AdminNavigation }

