import RoleCell from 'src/components/Admin/Role/RoleCell'

type RolePageProps = {
  id: string
}

const RolePage = ({ id }: RolePageProps) => {
  return <RoleCell id={id} />
}

export default RolePage
