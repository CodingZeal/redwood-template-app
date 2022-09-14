import { MetaTags } from '@redwoodjs/web'

import EditTeamCell from 'src/components/Admin/Team/EditTeamCell'

type TeamPageProps = {
  id: string
}

const EditTeamPage = ({ id }: TeamPageProps) => {
  return (
    <>
      <MetaTags title="Edit Team" />
      <EditTeamCell id={id} />
    </>
  )
}

export default EditTeamPage
