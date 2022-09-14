import { MetaTags } from '@redwoodjs/web'

import TeamCell from 'src/components/Admin/Team/TeamCell'

type TeamPageProps = {
  id: string
}

const TeamPage = ({ id }: TeamPageProps) => {
  return (
    <>
      <MetaTags title="Team Detail" />
      <TeamCell id={id} />
    </>
  )
}

export default TeamPage
