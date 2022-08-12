import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const LinkItem = (props) => (
  <li data-testid="nav__link-item" className="mr-3 cursor-pointer">
    <Link {...props}>{props.children}</Link>
  </li>
)

const Navigation = () => {
  const { logIn, logOut, isAuthenticated } = useAuth()

  const handleAuthButtonClick = async () => {
    if (isAuthenticated) {
      await logOut({ returnTo: process.env.AUTH0_REDIRECT_URI })
    } else {
      const searchParams = new URLSearchParams(window.location.search)
      await logIn({
        appState: { targetUrl: searchParams.get('redirectTo') },
      })
    }
  }

  return (
    <ul data-testid="nav" className="my-3 flex flex-row items-start">
      <LinkItem to={routes.home()}>Home</LinkItem>
      <button onClick={handleAuthButtonClick}>
        {isAuthenticated ? 'Log out' : 'Log in'}
      </button>
      {/* {isAuthenticated ? (
        <LinkItem onClick={logOut}>Logout</LinkItem>
      ) : (
        <LinkItem to={routes.login()}>Login</LinkItem>
      )} */}
    </ul>
  )
}

export { Navigation }
