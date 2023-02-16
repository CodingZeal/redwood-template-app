import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { EditPassword } from 'src/components/Profile/EditPassword'

const EditPasswordPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <EditPassword profile={currentUser} />
    </>
  )
}

export default EditPasswordPage
