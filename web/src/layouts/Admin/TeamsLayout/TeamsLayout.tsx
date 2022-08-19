import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type TeamLayoutProps = {
  children: React.ReactNode
}

const TeamsLayout = ({ children }: TeamLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.adminTeams()} className="rw-link">
            Teams
          </Link>
        </h1>
        <Link to={routes.adminNewTeam()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Team
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export { TeamsLayout }
