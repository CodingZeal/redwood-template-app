import { MetaTags } from '@redwoodjs/web'

import TeamsCell from 'src/components/Admin/Team/TeamsCell'

const TeamsPage = () => {
  return (
    <>
      <MetaTags title="Teams" />
      <TeamsCell />
    </>
  )
}

export default TeamsPage
