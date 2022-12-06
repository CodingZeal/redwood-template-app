import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import { EditEmail } from 'src/components/Profile/EditEmail'

const EditEmailPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <EditEmail profile={currentUser} />
    </>
  )
}

export default EditEmailPage
