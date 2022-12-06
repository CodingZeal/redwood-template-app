import { Link, routes } from '@redwoodjs/router'

import { LinkItem } from 'src/components/Navigation/LinkItem/LinkItem'
import { SubNavigation } from 'src/components/Navigation/SubNavigation'

type ProfileLayoutProps = {
  children?: React.ReactNode
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="m-4 flex">
      <div className="w-20 sm:w-60">
        <SubNavigation>
          <LinkItem to={routes.profile()}>Edit Profile</LinkItem>
          <LinkItem to={routes.editPassword()}>Edit Password</LinkItem>
          <LinkItem to={routes.editEmail()}>Edit Email</LinkItem>
        </SubNavigation>
      </div>
      <div className="flex-1">
        <div className="rw-scaffold">
          <header className="rw-header">
            <h1 className="rw-heading rw-heading-primary">
              <Link to={routes.profile()} className="rw-link">
                Profile
              </Link>
            </h1>
          </header>
          <main className="rw-main">{children}</main>
        </div>
      </div>
    </div>
  )
}

export { ProfileLayout }
