import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const EditPasswordPage = () => {
  return (
    <>
      <MetaTags title="ChangePassword" description="ChangePassword page" />

      <h1>EditPasswordPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/EditPasswordPage/EditPasswordPage.tsx</code>
      </p>
      <p>
        My default route is named <code>changePassword</code>, link to me with `
        <Link to={routes.editPassword()}>ChangePassword</Link>`
      </p>
    </>
  )
}

export default EditPasswordPage
