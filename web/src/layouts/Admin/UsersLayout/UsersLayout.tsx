import { Link, routes } from '@redwoodjs/router'

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
        <div className="flex justify-end">
          <div className="flex h-12 items-center justify-center rounded-lg border-2 border-rustyOrange bg-rustyOrange px-8 font-sans text-lg font-bold text-white">
            <Link to={routes.adminNewUser()}>Add User</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export { UsersLayout }
