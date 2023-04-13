import { useEffect, useRef } from 'react'

import { navigate, NavLink, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { Avatar } from 'src/components/Avatar'

const LinkItem = (props) => (
  <NavLink className="cursor-pointer p-2 no-underline" {...props}>
    {props.children}
  </NavLink>
)

const MobileMenu = ({ isOpen, toggleOpen }) => {
  const { currentUser, hasRole, isAuthenticated, logOut } = useAuth()

  const logoutHandler = () => {
    logOut()
    navigate(routes.home())
    toggleOpen(!isOpen)
  }
  const menuRef = useRef(null)

  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (e.key === 'Escape') {
        toggleOpen(!isOpen)
      }
    }

    const clickOutside = (e: MouseEvent) =>
      !menuRef.current.contains(e.target as Node)

    const clickAway = (e: MouseEvent) => {
      if (isOpen && clickOutside(e)) {
        toggleOpen(!isOpen)
      }
    }
    document.body.addEventListener('mousedown', clickAway)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('mousedown', clickAway)
      document.body.removeEventListener('keydown', closeOnEscapeKey)
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
        <div className="flex h-1/4 flex-col border-b-2 border-[#D0722C] pt-5 pl-5">
          <LinkItem
            onClick={() => toggleOpen(!isOpen)}
            to={routes.adminUsers()}
          >
            Users
          </LinkItem>
          <LinkItem
            onClick={() => toggleOpen(!isOpen)}
            to={routes.adminTeams()}
          >
            Teams
          </LinkItem>
          <LinkItem
            onClick={() => toggleOpen(!isOpen)}
            to={routes.adminRoles()}
          >
            Roles
          </LinkItem>
        </div>
      )}

      <div className="flex h-1/4 flex-col border-b-2 border-[#D0722C] pt-4 pl-5">
        <a
          onClick={() => toggleOpen(!isOpen)}
          href="http://codingzeal.com"
          target="_blank"
          className="p-2 no-underline"
          rel="noopener noreferrer"
        >
          ZEAL
        </a>
        <a
          onClick={() => toggleOpen(!isOpen)}
          href="https://redwoodjs.com/docs/introduction"
          target="_blank"
          className="p-2 no-underline"
          rel="noopener noreferrer"
        >
          RedwoodJS Docs
        </a>
        <LinkItem onClick={() => toggleOpen(!isOpen)} to={routes.home()}>
          Lumberstack Docs
        </LinkItem>
      </div>

      <div className="flex h-1/4 flex-col">
        {isAuthenticated ? (
          <div className="cursor-pointer">
            <div className="flex flex-col border-b-2 py-4 pl-5">
              {hasRole('super admin') && (
                <LinkItem
                  onClick={() => toggleOpen(!isOpen)}
                  to={routes.adminUsers()}
                >
                  Admin
                </LinkItem>
              )}
              <LinkItem
                onClick={() => toggleOpen(!isOpen)}
                to={routes.editEmail()}
              >
                Edit Email
              </LinkItem>
              <LinkItem
                onClick={() => toggleOpen(!isOpen)}
                to={routes.editPassword()}
              >
                Edit Password
              </LinkItem>
              <LinkItem
                onClick={() => toggleOpen(!isOpen)}
                to={routes.profile()}
              >
                Edit Profile
              </LinkItem>
            </div>
            <div className="flex flex-row items-center pl-5 pt-5">
              <Avatar user={currentUser} />
              <div className="flex flex-col px-4 font-int text-sm">
                <p className="flex justify-start font-bold">
                  Hi {currentUser.name || currentUser.email}!
                </p>
                <button className="flex justify-start" onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col py-5 pl-5">
            <LinkItem onClick={() => toggleOpen(!isOpen)} to={routes.login()}>
              Login
            </LinkItem>
            <LinkItem onClick={() => toggleOpen(!isOpen)} to={routes.signup()}>
              Signup
            </LinkItem>
          </div>
        )}
      </div>
    </div>
  )
}

export { MobileMenu }
