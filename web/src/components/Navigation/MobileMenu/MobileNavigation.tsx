import { useEffect, useRef, useState } from 'react'

import { Link, navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { Avatar } from 'src/components/Avatar'

import { NAVIGATION } from '../constants'
import { LinkItem } from '../LinkItem/LinkItem'

const MobileNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleNav = () => {
    setIsMobileMenuOpen((prevValue) => {
      return !prevValue
    })
  }

  return (
    <>
      <div
        data-testid="mobileNav"
        className="border-#EEF2F6 flex h-20 w-full flex-row items-center justify-between
  border-b-2 border-neutral-300 px-5  py-3"
      >
        <Link
          data-testid="home"
          className="mx-2 font-sans text-4xl font-bold text-rustyOrange no-underline"
          to={routes.home()}
        >
          LUMBERSTACK
        </Link>

        <button
          onClick={toggleNav}
          className="flex flex-col gap-2 text-primary hover:text-black"
        >
          <div className="h-[6px] w-12 bg-current" />
          <div className="h-[6px] w-12 bg-current" />
          <div className="h-[6px] w-12 bg-current" />
        </button>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} toggleOpen={setIsMobileMenuOpen} />
    </>
  )
}

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
      ref={menuRef}
      className={`${
        isOpen ? '' : 'hidden'
      } fixed h-screen w-screen bg-rustyOrange font-sans text-2xl text-white`}
    >
      {hasRole('super admin') && (
        <nav className="border-b-2 border-[#D0722C] py-4 pl-5">
          <ul>
            {NAVIGATION.SCHEMAS.map((item, index) => (
              <LinkItem
                handleClick={() => toggleOpen(!isOpen)}
                key={index}
                linkClass=""
                path={item.path}
                name={item.name}
              />
            ))}
          </ul>
        </nav>
      )}

      <nav className="border-b-2 border-[#D0722C] py-4 pl-5">
        <ul>
          {NAVIGATION.DOCUMENTATION.map((item, index) => (
            <LinkItem
              handleClick={() => toggleOpen(!isOpen)}
              key={index}
              linkClass=""
              path={item.path}
              name={item.name}
            />
          ))}
        </ul>
      </nav>

      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <div className="flex flex-col border-b-2 py-4 pl-5">
                {hasRole('super admin') && (
                  <Link
                    onClick={() => toggleOpen(!isOpen)}
                    to={routes.adminUsers()}
                  >
                    Admin
                  </Link>
                )}
                <nav>
                  <ul>
                    {NAVIGATION.ADMIN.map((item, index) => (
                      <LinkItem
                        handleClick={() => toggleOpen(!isOpen)}
                        key={index}
                        linkClass=""
                        path={item.path}
                        name={item.name}
                      />
                    ))}
                  </ul>
                </nav>
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
            <nav className="pl-5">
              <ul>
                {NAVIGATION.AUTH.map((item, index) => (
                  <LinkItem
                    handleClick={() => toggleOpen(!isOpen)}
                    key={index}
                    linkClass=""
                    path={item.path}
                    name={item.name}
                  />
                ))}
              </ul>
            </nav>
          )}
        </ul>
      </nav>
    </div>
  )
}

export { MobileNavigation }
