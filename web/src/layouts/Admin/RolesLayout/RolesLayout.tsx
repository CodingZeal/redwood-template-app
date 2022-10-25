import { Link, routes } from '@redwoodjs/router'

type RoleLayoutProps = {
  children: React.ReactNode
}

const RolesLayout = ({ children }: RoleLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.adminRoles()} className="rw-link">
            Roles
          </Link>
        </h1>
        <Link to={routes.adminNewRole()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Role
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export { RolesLayout }
