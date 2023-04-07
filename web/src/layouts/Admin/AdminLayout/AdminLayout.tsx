import { NavLink, routes } from '@redwoodjs/router'

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="border-b-#EEF2F6 font-inter flex h-12 flex-row border-b-2 px-8 text-xl text-blackBean no-underline">
        <NavLink
          activeClassName="bg-beige border-b-4 flex justify-center border-blackBean"
          className="px-4 py-2"
          to={routes.adminUsers()}
        >
          Users
        </NavLink>
        <NavLink
          activeClassName="bg-beige border-b-4 flex justify-center border-blackBean"
          className="px-4 py-2"
          to={routes.adminTeams()}
        >
          Teams
        </NavLink>
        <NavLink
          activeClassName="bg-beige border-b-4 flex justify-center border-blackBean"
          className="px-4 py-2"
          to={routes.adminRoles()}
        >
          Roles
        </NavLink>
      </div>
      <div className="rw-scaffold">
        <main className="rw-main">{children}</main>
      </div>
    </div>
  )
}

export { AdminLayout }
