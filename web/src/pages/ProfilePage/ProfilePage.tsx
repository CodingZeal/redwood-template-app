import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import ProfileCell from 'src/components/ProfileCell'

const ProfilePage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <ProfileCell profile={currentUser} />
    </>
  )
}

export default ProfilePage
