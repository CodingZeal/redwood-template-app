import { Link, NavLink, routes } from '@redwoodjs/router'

import { Addition } from 'src/components/Icon/Addition'
import { Arrow } from 'src/components/Icon/Arrow'

type RoleLayoutProps = {
  children: React.ReactNode
}

const RolesLayout = ({ children }: RoleLayoutProps) => {
  return (
    <div className="px-10">
      <header className="my-8 grid grid-cols-2">
        <h1 className="flex flex-row items-center font-int text-3xl text-blackBean">
          Admin
          <Arrow className="mx-2" />
          <Link to={routes.adminRoles()} className="font-sans font-bold">
            Roles
          </Link>
        </h1>
        <div className="grid justify-items-end">
          <NavLink
            data-testid="role-add"
            to={routes.adminNewRole()}
            activeClassName="hidden"
          >
            <Addition className="sm:block md:hidden" />
            <div className="hidden h-12 items-center justify-center rounded-lg border-2 border-rustyOrange bg-rustyOrange px-8 font-sans text-lg font-bold text-white md:flex">
              Add Role
            </div>
          </NavLink>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export { RolesLayout }
