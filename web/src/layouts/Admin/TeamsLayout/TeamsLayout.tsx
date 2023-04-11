import { Link, routes } from '@redwoodjs/router'

import { Addition } from 'src/components/Icon/Addition'
import { Arrow } from 'src/components/Icon/Arrow'

type TeamLayoutProps = {
  children: React.ReactNode
}

const TeamsLayout = ({ children }: TeamLayoutProps) => {
  return (
    <div className="px-10">
      <header className="my-8 grid grid-cols-2">
        <h1 className="font-inter flex flex-row items-center text-3xl text-blackBean">
          Admin
          <Arrow className="mx-2" />
          <Link to={routes.adminTeams()} className="font-sans font-bold">
            Teams
          </Link>
        </h1>
        <div className="grid justify-items-end">
          <Link data-testid="team-add" to={routes.adminNewTeam()}>
            <Addition className="sm:block md:hidden" />
            <div className="hidden h-12 items-center justify-center rounded-lg border-2 border-rustyOrange bg-rustyOrange px-8 font-sans text-lg font-bold text-white md:flex">
              Add Team
            </div>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export { TeamsLayout }
