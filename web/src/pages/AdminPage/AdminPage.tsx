import { MetaTags } from '@redwoodjs/web'

import { AdminNavigation } from 'src/components/AdminNavigation/AdminNavigation'

const AdminPage = () => {
  return (
    <>
      <MetaTags title="Admin" description="Admin page" />
      <AdminNavigation />
    </>
  )
}

export default AdminPage
