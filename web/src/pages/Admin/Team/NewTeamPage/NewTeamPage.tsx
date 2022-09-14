import { MetaTags } from '@redwoodjs/web'

import NewTeam from 'src/components/Admin/Team/NewTeam'

const NewTeamPage = () => {
  return (
    <>
      <MetaTags title="New Team" />
      <NewTeam />
    </>
  )
}

export default NewTeamPage
