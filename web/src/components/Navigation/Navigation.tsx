import { useAuth } from '@redwoodjs/auth'
import { navigate, NavLink, routes } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
    <NavLink activeClassName="bg-orange-300" {...props}>
      {props.children}
    </NavLink>
  </li>
)
const Navigation = () => {
  const { currentUser, hasRole, isAuthenticated, logOut } = useAuth()

  const handleLogOut = async () => {
    await logOut()

    navigate(routes.home())
    location.reload()
  }

  return (
    <div>
      <div data-testid="nav" className="my-3 flex">
        <ul className="flex flex-row items-start">
          <LinkItem to={routes.home()}>Home</LinkItem>
          {isAuthenticated ? (
            <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
              <button onClick={handleLogOut}>Logout</button>
            </li>
          ) : (
            <LinkItem to={routes.login()}>Login</LinkItem>
          )}
          {hasRole('super admin') && (
            <LinkItem to={routes.adminUsers()}>Admin</LinkItem>
          )}
        </ul>
        <ul className="ml-auto">
          {isAuthenticated && currentUser && (
            <LinkItem to={routes.profile()}>
              {currentUser.nickname || currentUser.name || currentUser.email}
            </LinkItem>
          )}
        </ul>
      </div>
    </div>
  )
}

export { Navigation }
