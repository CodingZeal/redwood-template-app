import { MetaTags } from '@redwoodjs/web'

import RoleCell from 'src/components/Admin/Role/RoleCell'

type RolePageProps = {
  id: string
}

const RolePage = ({ id }: RolePageProps) => {
  return (
    <>
      <MetaTags title="Role Detail" />
      <RoleCell id={id} />
    </>
  )
}

export default RolePage
