import { MetaTags } from '@redwoodjs/web'

import { MainLayout } from 'src/layouts'

const HomePage = () => {
  return (
    <MainLayout>
      <MetaTags title="Home" description="Home page" />
      <h1>Redwood template home page</h1>
      <h3>I like toast. It&apos;s a great place for jelly to lie.</h3>
    </MainLayout>
  )
}

export default HomePage
