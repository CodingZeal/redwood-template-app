import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
    <Link {...props}>{props.children}</Link>
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
            <LinkItem onClick={logOut}>Logout</LinkItem>
          ) : (
            <LinkItem to={routes.login()}>Login</LinkItem>
          )}
          {hasRole('super admin') && (
            <LinkItem to={routes.admin()}>Admin</LinkItem>
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
