import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { Avatar } from 'src/components/Avatar'

import { AvatarMenu } from '../AvatarMenu/AvatarMenu'
import { NAVIGATION } from '../constants'
import { LinkItem } from '../LinkItem/LinkItem'

const DesktopNavigation = () => {
  const { currentUser, isAuthenticated } = useAuth()

  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false)
  const toggleNav = () => {
    setIsAvatarMenuOpen((prevValue) => {
      return !prevValue
    })
  }

  return (
    <div
      className="border-#EEF2F6 flex h-20 items-center
  justify-between border-b-2 border-neutral-300 py-3 px-10"
    >
      <div className="flex items-center justify-between">
        <Link
          data-testid="home"
          className="font-sans text-4xl font-bold text-rustyOrange no-underline"
          to={routes.home()}
        >
          LUMBERSTACK
        </Link>
        <nav>
          <ul className="flex">
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
          <button onClick={toggleNav}>
            <Avatar user={currentUser} />
          </button>
        </div>
      ) : (
        <div className="flex font-sans font-bold">
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
  )
}

export { DesktopNavigation }
