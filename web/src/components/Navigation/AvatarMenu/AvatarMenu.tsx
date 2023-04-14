import { useEffect, useRef } from 'react'

import { Link, navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { Email } from 'src/components/Icon/Email'
import { Lock } from 'src/components/Icon/Lock'
import { Logout } from 'src/components/Icon/Logout'
import { Profile } from 'src/components/Icon/Profile'
import { Security } from 'src/components/Icon/Security'

const AvatarMenu = ({ isOpen, toggleOpen }) => {
  const { hasRole, logOut } = useAuth()

  const logoutHandler = () => {
    logOut()
    navigate(routes.home())
  }
  const avatarMenuRef = useRef(null)

  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (e.key === 'Escape') {
        toggleOpen(!isOpen)
      }
    }

    const clickOutside = (e: MouseEvent) =>
      !avatarMenuRef.current.contains(e.target as Node)

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
    <div className="flex">
      <span
        ref={avatarMenuRef}
        className={`${
          isOpen ? '' : 'hidden'
        } relative left-[139px] -top-[12px] flex h-[41px] w-[41px] rotate-45 border-[1px] bg-white py-2`}
      ></span>

      <div
        data-testid="avatarMenu"
        ref={avatarMenuRef}
        className={`${
          isOpen ? '' : 'hidden'
        } relative flex h-48 w-40 flex-col items-start justify-evenly rounded-lg border-[1px] bg-white font-sans text-sm`}
      >
        <span
          ref={avatarMenuRef}
          className={`${
            isOpen ? '' : 'hidden'
          } absolute left-[115.5px] -top-[22px] flex h-10 w-0 -rotate-90 border-t-4 border-l-4 border-b-4 border-l-white border-t-transparent border-b-transparent py-2`}
        ></span>
        {hasRole('super admin') && (
          <Link
            className="group flex w-full py-1 px-4 text-blackBean hover:bg-rustyOrange"
            onClick={() => toggleOpen(!isOpen)}
            to={routes.adminUsers()}
          >
            <div className="flex flex-row group-hover:text-white">
              <Security className="mx-2 text-rustyOrange group-hover:text-white" />
              Admin
            </div>
          </Link>
        )}

        <Link
          className="group flex w-full py-1 px-4 text-blackBean hover:bg-rustyOrange"
          onClick={() => toggleOpen(!isOpen)}
          to={routes.editEmail()}
        >
          <div className="flex flex-row group-hover:text-white">
            <Email className="mx-2 text-rustyOrange group-hover:text-white" />
            Edit Email
          </div>
        </Link>

        <Link
          className="group flex w-full py-1 px-4 text-blackBean hover:bg-rustyOrange"
          onClick={() => toggleOpen(!isOpen)}
          to={routes.editPassword()}
        >
          <div className="flex flex-row group-hover:text-white">
            <Lock className="mx-2 text-rustyOrange group-hover:text-white" />
            Edit Password
          </div>
        </Link>

        <Link
          className="group flex w-full py-1 px-4 text-blackBean hover:bg-rustyOrange"
          onClick={() => toggleOpen(!isOpen)}
          to={routes.profile()}
        >
          <div className="flex flex-row group-hover:text-white">
            <Profile className="mx-2 text-rustyOrange group-hover:text-white" />
            Edit Profile
          </div>
        </Link>

        <Link
          onClick={logoutHandler}
          to={routes.home()}
          className="group flex w-full py-1 px-4 text-blackBean hover:bg-rustyOrange"
        >
          <div className="flex flex-row group-hover:text-white">
            <Logout className="mx-2 text-rustyOrange group-hover:text-white" />
            Logout
          </div>
        </Link>
      </div>
    </div>
  )
}

export { AvatarMenu }
