import { useState } from 'react'

import { navigate, NavLink, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import { Avatar } from '../Avatar'
import { NavMenu } from '../Icon/NavMenu'

import { MobileMenu } from './MobileMenu/MobileMenu'

const LinkItem = (props) => (
  <NavLink className="cursor-pointer no-underline" {...props}>
    {props.children}
  </NavLink>
)
const Navigation = () => {
  return (
    <div data-testid="nav">
      <div className="hidden lg:block">
        <DesktopNavigation />
      </div>
      <div className="block lg:hidden">
        <MobileNavigation />
      </div>
    </div>
  )
}

const DesktopNavigation = () => {
  const { currentUser, hasRole, isAuthenticated, logOut } = useAuth()

  const logoutHandler = () => {
    logOut()
    navigate(routes.home())
  }
  return (
    <>
      <div
        className="flex-col-2 border-#EEF2F6 flex h-20 w-full items-center
  border-b-2 border-neutral-300 py-3 px-10"
      >
        <div className="flex flex-row items-center">
          <LinkItem
            data-testid="home"
            className="mx-2 font-sans text-4xl font-bold text-rustyOrange no-underline"
            to={routes.home()}
          >
            LUMBERSTACK
          </LinkItem>
          <div className="mx-10">
            <a
              href="http://codingzeal.com"
              target="_blank"
              className="mx-4	font-int text-lg text-blackBean no-underline"
              rel="noopener noreferrer"
            >
              ZEAL
            </a>
            <a
              href="https://redwoodjs.com/docs/introduction"
              target="_blank"
              className="mx-4	font-int text-lg text-blackBean no-underline"
              rel="noopener noreferrer"
            >
              RedwoodJS Docs
            </a>
            <LinkItem
              className="mx-4 font-int text-lg text-blackBean no-underline"
              to={routes.home()}
            >
              Lumberstack Docs
            </LinkItem>
          </div>
        </div>
        <ul className="ml-auto">
          <div className="flex flex-row items-center justify-end">
            {hasRole('super admin') && (
              <LinkItem className="px-4" to={routes.adminUsers()}>
                Admin
              </LinkItem>
            )}
            {isAuthenticated ? (
              <div className="ml-auto flex cursor-pointer items-center">
                {isAuthenticated && currentUser && (
                  <>
                    <LinkItem className="px-4" to={routes.profile()}>
                      Profile
                    </LinkItem>
                    <button className="px-4" onClick={logoutHandler}>
                      Logout
                    </button>
                    <Avatar className="mx-4" user={currentUser} />
                  </>
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

const MobileNavigation = () => {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false)
  return (
    <>
      <div
        className="border-#EEF2F6 flex h-20 w-full flex-row items-center justify-between
  border-b-2 border-neutral-300 px-5 py-3"
      >
        <LinkItem
          data-testid="home"
          className="mx-2 font-sans text-4xl font-bold text-rustyOrange no-underline"
          to={routes.home()}
        >
          LUMBERSTACK
        </LinkItem>

        <button onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}>
          <NavMenu />
        </button>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} toggleOpen={setisMobileMenuOpen} />
    </>
  )
}

export { Navigation }
