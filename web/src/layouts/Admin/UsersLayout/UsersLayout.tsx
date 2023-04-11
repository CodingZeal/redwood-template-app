import { Link, NavLink, routes } from '@redwoodjs/router'

import { Addition } from 'src/components/Icon/Addition'
import { Arrow } from 'src/components/Icon/Arrow'

type UserLayoutProps = {
  children: React.ReactNode
}

const UsersLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="px-10">
      <header className="my-8 grid grid-cols-2">
        <h1 className="font-inter flex flex-row items-center text-3xl text-blackBean">
          Admin
          <Arrow className="mx-2" />
          <Link to={routes.adminUsers()} className="font-sans font-bold">
            Users
          </Link>
        </h1>
        <div className="grid justify-items-end">
          <NavLink
            data-testid="user-add"
            to={routes.adminNewUser()}
            activeClassName="hidden"
          >
            <Addition className="sm:block md:hidden" />
            <div className="hidden h-12 items-center justify-center rounded-lg border-2 border-rustyOrange bg-rustyOrange px-8 font-sans text-lg font-bold text-white md:flex">
              Add User
            </div>
          </NavLink>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export { UsersLayout }
