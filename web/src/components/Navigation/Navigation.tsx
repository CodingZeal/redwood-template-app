import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
    <Link {...props}>{props.children}</Link>
  </li>
)

const Navigation = () => {
  const { logOut, isAuthenticated } = useAuth()

  return (
    <ul data-testid="nav" className="my-3 flex flex-row items-start">
      <LinkItem to={routes.home()}>Home</LinkItem>
      {isAuthenticated ? (
        <LinkItem onClick={logOut}>Logout</LinkItem>
      ) : (
        <LinkItem to={routes.login()}>Login</LinkItem>
      )}
    </ul>
  )
}

export { Navigation }
