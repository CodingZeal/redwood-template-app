import { navigate, NavLink, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import { Avatar } from '../Avatar'
import { Gear } from '../Icon/Gear'

const LinkItem = (props) => (
  <NavLink
    data-testid="nav__link-item"
    className="cursor-pointer no-underline"
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
    <>
      <div
        data-testid="nav"
        className="flex-col-2 border-#EEF2F6 flex h-20 w-full items-center
        border-b-2 border-neutral-300 py-3 px-10"
      >
        <div className="flex flex-row items-center">
          <LinkItem
            className="mx-2 font-sans text-4xl font-bold text-rustyOrange no-underline"
            to={routes.home()}
          >
            LUMBERSTACK
          </LinkItem>
          <div className="mx-10">
            <LinkItem
              className="mx-4	font-int text-lg text-blackBean no-underline"
              to={routes.home()}
            >
              ZEAL
            </LinkItem>
            <LinkItem
              className="mx-4	font-int text-lg text-blackBean no-underline"
              to={routes.home()}
            >
              RedwoodJS Docs
            </LinkItem>
            <LinkItem
              className="mx-4 font-int text-lg text-blackBean no-underline"
              to={routes.home()}
            >
              Lumberstack Docs
            </LinkItem>
          </div>
        </div>
        <ul className="ml-auto">
          <div className="flex flex-row justify-end">
            {isAuthenticated ? (
              <div className="ml-auto mr-3 flex cursor-pointer items-center">
                <button onClick={logoutHandler}>
                  <Gear />
                </button>
                {isAuthenticated && currentUser && (
                  <LinkItem className="px-5" to={routes.profile()}>
                    <Avatar user={currentUser} />
                  </LinkItem>
                )}
                {hasRole('super admin') && (
                  <LinkItem to={routes.adminUsers()}>Admin</LinkItem>
                )}
              </div>
            ) : (
              <div className="flex justify-end font-sans font-bold">
                <LinkItem
                  className="mx-4 flex h-12 w-28 items-center justify-center rounded-lg border-2 border-rustyOrange text-rustyOrange no-underline"
                  to={routes.login()}
                >
                  Login
                </LinkItem>
                <LinkItem
                  className="flex h-12 w-32 items-center justify-center rounded-lg border-2 border-rustyOrange bg-rustyOrange text-white no-underline"
                  to={routes.signup()}
                >
                  Signup
                </LinkItem>
              </div>
            )}
          </div>
        </ul>
      </div>
    </>
  )
}

export { Navigation }
