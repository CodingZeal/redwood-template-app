import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
    <Link {...props}>{props.children}</Link>
  </li>
)

const Navigation = () => {
  const { logOut, isAuthenticated } = useAuth()

  const handleLogout = async () => {
    await logOut()
  }

  const handleLogin = () => {
    routes.login()
  }

  return (
    <ul data-testid="nav" className="my-3 flex flex-row items-start">
      <LinkItem to={routes.home()}>Home</LinkItem>
      {isAuthenticated ? (
        <LinkItem href="#" onClick={handleLogout}>
          Logout
        </LinkItem>
      ) : (
        <LinkItem to={handleLogin}>Login</LinkItem>
      )}
    </ul>
  )
}

export { Navigation }
