import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import { Avatar } from '../Avatar'

import { AvatarMenu } from './AvatarMenu/AvatarMenu'
import { NAVIGATION } from './constants'
import { LinkItem } from './LinkItem/LinkItem'
import { MobileMenu } from './MobileMenu/MobileMenu'

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
  const { currentUser, isAuthenticated } = useAuth()

  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false)
  console.log(NAVIGATION)

  return (
    <>
      <div
        className="border-#EEF2F6 flex-col-2 flex h-20 w-full items-center
  border-b-2 border-neutral-300 py-3 px-10"
      >
        <div className="flex flex-row items-center">
          <Link
            data-testid="home"
            className="mx-2 font-sans text-4xl font-bold text-rustyOrange no-underline"
            to={routes.home()}
          >
            LUMBERSTACK
          </Link>
          <nav>
            <ul className="mx-10 flex">
              {NAVIGATION.DOCUMENTATION.map((item, index) => (
                <LinkItem
                  key={index}
                  linkClass="mx-4	font-int text-lg text-blackBean no-underline"
                  path={item.path}
                  name={item.name}
                />
              ))}
            </ul>
          </nav>
        </div>
        {isAuthenticated ? (
          <div className="ml-auto flex">
            <div className="relative top-[140px] left-16">
              <AvatarMenu
                isOpen={isAvatarMenuOpen}
                toggleOpen={setIsAvatarMenuOpen}
              />
            </div>
            <button
              className=""
              onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
            >
              <Avatar user={currentUser} />
            </button>
          </div>
        ) : (
          <div className="ml-auto flex font-sans font-bold">
            <Link
              className="mx-4 flex h-12 w-28 items-center justify-center rounded-lg border-2 border-rustyOrange text-rustyOrange no-underline"
              to={routes.login()}
            >
              Login
            </Link>
            <Link
              className="flex h-12 w-32 items-center justify-center rounded-lg border-2 border-rustyOrange bg-rustyOrange text-white no-underline"
              to={routes.signup()}
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

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
        className="border-#EEF2F6 flex h-20 w-full flex-row items-center justify-between
  border-b-2 border-neutral-300 px-5 py-3"
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

export { Navigation }
