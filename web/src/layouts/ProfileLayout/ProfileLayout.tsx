import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { SubNavigation } from 'src/components/Profile/SubNavigation'

type ProfileLayoutProps = {
  children?: React.ReactNode
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="m-4 flex">
      <div className="w-20 sm:w-60">
        <SubNavigation />
      </div>
      <div className="flex-1">
        <div className="rw-scaffold">
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
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
