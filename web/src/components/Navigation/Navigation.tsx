import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
    <Link {...props}>{props.children}</Link>
  </li>
)

const Navigation = () => {
  const { hasRole, logOut, isAuthenticated } = useAuth()

  return (
    <div>
      <ul data-testid="nav" className="my-3 flex flex-row items-start">
        <LinkItem to={routes.home()}>Home</LinkItem>
        {isAuthenticated ? (
          <LinkItem onClick={logOut}>Logout</LinkItem>
        ) : (
          <LinkItem to={routes.login()}>Login</LinkItem>
        )}
        {hasRole('super admin') && (
          <LinkItem to={routes.admin()}>Admin</LinkItem>
        )}
      </ul>

      <ul className="my-3 flex flex-row items-end justify-end">
        <LinkItem to={routes.profile()}>Nickname</LinkItem>
      </ul>
    </div>
  )
}

export { Navigation }
