import { MetaTags } from '@redwoodjs/web'

import UsersCell from 'src/components/Admin/User/UsersCell'
import { useToggle } from 'src/lib/hooks'

const UsersPage = () => {
  const [showInactive, toggleShowInactive] = useToggle(false)

  return (
    <>
      <MetaTags title="Users" />
      <div className="ml-4 mb-4 flex">
        <div className="mr-2 text-sm font-light">Show inactive: </div>
        <input
          className="mt-0.5 cursor-pointer"
          type="checkbox"
          checked={showInactive}
          onChange={toggleShowInactive}
        />
      </div>
      <UsersCell showInactive={showInactive} />
    </>
  )
}

export default UsersPage
