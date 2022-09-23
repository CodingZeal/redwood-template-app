import { useAuth } from '@redwoodjs/auth'
import { NavLink, routes } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
    <NavLink activeClassName="bg-orange-300" {...props}>
      {props.children}
    </NavLink>
  </li>
)
const Navigation = () => {
  const { currentUser, hasRole, isAuthenticated, logOut } = useAuth()

  return (
    <div>
      <ul data-testid="nav" className="my-3 flex">
        <div className="flex flex-row items-start">
          <LinkItem to={routes.home()}>Home</LinkItem>
          {isAuthenticated ? (
            <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
              <button onClick={logOut}>Logout</button>
            </li>
          ) : (
            <LinkItem to={routes.login()}>Login</LinkItem>
          )}
          {hasRole('super admin') && (
            <LinkItem to={routes.adminUsers()}>Admin</LinkItem>
          )}
        </div>
        <div className="ml-auto">
          {isAuthenticated && currentUser && (
            <LinkItem to={routes.profile()}>
              {currentUser.nickname || currentUser.name || currentUser.email}
            </LinkItem>
          )}
        </div>
      </ul>
    </div>
  )
}

export { Navigation }
