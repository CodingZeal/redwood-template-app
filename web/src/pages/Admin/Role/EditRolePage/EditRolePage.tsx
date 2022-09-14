import { MetaTags } from '@redwoodjs/web'

import EditRoleCell from 'src/components/Admin/Role/EditRoleCell'

type RolePageProps = {
  id: string
}

const EditRolePage = ({ id }: RolePageProps) => {
  return (
    <>
      <MetaTags title="Edit Role" />
      <EditRoleCell id={id} />
    </>
  )
}

export default EditRolePage
