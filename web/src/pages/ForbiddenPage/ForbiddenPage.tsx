import { MetaTags } from '@redwoodjs/web'

const ForbiddenPage = () => {
  return (
    <>
      <MetaTags title="Forbidden" description="Forbidden" />

      <h1>403 Forbidden</h1>
    </>
  )
}

export default ForbiddenPage
