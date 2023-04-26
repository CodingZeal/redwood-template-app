import { useEffect, useRef } from 'react'

import { navigate, NavLink, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { Avatar } from 'src/components/Avatar'

import { NAVIGATION } from '../constants'

const MobileMenu = ({ isOpen, toggleOpen }) => {
  const { currentUser, hasRole, isAuthenticated, logOut } = useAuth()

  const logoutHandler = () => {
    logOut()
    navigate(routes.home())
    toggleOpen(!isOpen)
  }

  const menuRef = useRef(null)

  // set up click outside
  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (e.key === 'Escape') {
        toggleOpen(!isOpen)
      }
    }

    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [isOpen, toggleOpen])

  // set up escape key
  useEffect(() => {
    const clickOutside = (e: MouseEvent) =>
      !menuRef.current.contains(e.target as Node)

    const clickAway = (e: MouseEvent) => {
      if (isOpen && clickOutside(e)) {
        toggleOpen(!isOpen)
      }
    }

    document.body.addEventListener('mousedown', clickAway)
    return () => {
      document.body.removeEventListener('mousedown', clickAway)
    }
  }, [isOpen, toggleOpen])

  return (
    <div
      data-testid="mobileMenu"
      ref={menuRef}
      className={`${
        isOpen ? '' : 'hidden'
      } fixed	 h-screen w-screen bg-rustyOrange font-sans text-2xl text-white`}
    >
      {hasRole('super admin') && (
        <nav className="border-b-2 border-[#D0722C] pl-5">
          <ul>
            {NAVIGATION.SCHEMAS.map((item, index) => (
              <li key={index}>
                <NavLink
                  activeClassName=""
                  onClick={() => toggleOpen(!isOpen)}
                  to={routes.adminUsers()}
                >
                  Users
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <nav className="flex flex-col justify-between border-b-2 border-[#D0722C] pt-4 pl-5">
        <ul>
          <li>
            <a
              onClick={() => toggleOpen(!isOpen)}
              href="https://redwoodjs.com/docs/introduction"
              target="_blank"
              className="p-2 no-underline"
              rel="noopener noreferrer"
            >
              RedwoodJS Docs
            </a>
          </li>
          <li>
            <a href="#">Lumberstack Docs</a>
          </li>
        </ul>
      </nav>

      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <div className="flex flex-col border-b-2 py-4 pl-5">
                {hasRole('super admin') && (
                  <NavLink
                    activeClassName=""
                    onClick={() => toggleOpen(!isOpen)}
                    to={routes.adminUsers()}
                  >
                    Admin
                  </NavLink>
                )}
                <NavLink
                  activeClassName=""
                  onClick={() => toggleOpen(!isOpen)}
                  to={routes.editEmail()}
                >
                  Edit Email
                </NavLink>
                <NavLink
                  activeClassName=""
                  onClick={() => toggleOpen(!isOpen)}
                  to={routes.editPassword()}
                >
                  Edit Password
                </NavLink>
                <NavLink
                  activeClassName=""
                  onClick={() => toggleOpen(!isOpen)}
                  to={routes.profile()}
                >
                  Edit Profile
                </NavLink>
              </div>
              <div className="flex flex-row items-center pl-5 pt-5">
                <Avatar user={currentUser} />
                <div className="flex flex-col px-4 font-int text-sm">
                  <p className="flex justify-start font-bold">
                    Hi {currentUser.name || currentUser.email}!
                  </p>
                  <button
                    className="flex justify-start"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  onClick={() => toggleOpen(!isOpen)}
                  to={routes.login()}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => toggleOpen(!isOpen)}
                  to={routes.signup()}
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export { MobileMenu }
