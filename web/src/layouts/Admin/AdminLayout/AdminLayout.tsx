import { routes } from '@redwoodjs/router'

import { LinkItem } from 'src/components/Navigation/LinkItem/LinkItem'
import { SubNavigation } from 'src/components/Navigation/SubNavigation'

const AdminLayout = ({ children }) => {
  return (
    <div className="m-4 flex flex-row items-start">
      <div className="w-20 sm:w-60">
        <SubNavigation>
          <LinkItem to={routes.adminUsers()}>Users</LinkItem>
          <LinkItem to={routes.adminTeams()}>Teams</LinkItem>
          <LinkItem to={routes.adminRoles()}>Roles</LinkItem>
        </SubNavigation>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  )
}

export { AdminLayout }
