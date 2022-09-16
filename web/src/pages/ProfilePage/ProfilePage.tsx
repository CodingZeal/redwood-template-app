import { MetaTags } from '@redwoodjs/web'

import ProfileCell from 'src/components/Profile'

type UserPageProps = {
  id: string
}

const ProfilePage = ({ id }: UserPageProps) => {
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <ProfileCell id={id} />
    </>
  )
}

export default ProfilePage
