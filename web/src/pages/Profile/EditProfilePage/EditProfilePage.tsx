import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import ProfileCell from 'src/components/Profile/EditProfileCell'

const EditProfilePage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <ProfileCell profile={currentUser} />
    </>
  )
}

export default EditProfilePage
