import { navigate, NavLink, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const LinkItem = (props) => (
  <NavLink
    data-testid="nav__link-item"
    className="mr-3 cursor-pointer"
    activeClassName="bg-orange-300"
    {...props}
  >
    {props.children}
  </NavLink>
)
const Navigation = () => {
  const { currentUser, hasRole, isAuthenticated, logOut } = useAuth()

  const logoutHandler = () => {
    logOut()
    navigate(routes.home())
  }
  return (
    <div>
      <div data-testid="nav" className="my-3 flex">
        <ul className="flex flex-row items-start">
          <LinkItem to={routes.home()}>Home</LinkItem>
          {isAuthenticated ? (
            <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
              <button onClick={logoutHandler}>Logout</button>
            </li>
          ) : (
            <li className="flex">
              <LinkItem to={routes.login()}>Login</LinkItem>
              <LinkItem to={routes.signup()}>Sign Up</LinkItem>
            </li>
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
