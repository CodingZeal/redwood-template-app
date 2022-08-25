import EditUserCell from 'src/components/Admin/User/EditUserCell'

type UserPageProps = {
  id: string
}

const EditUserPage = ({ id }: UserPageProps) => {
  return <EditUserCell id={id} />
}

export default EditUserPage
