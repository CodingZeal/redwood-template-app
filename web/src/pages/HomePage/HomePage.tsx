import { MetaTags } from '@redwoodjs/web'

import { ZealLogo } from '../../components/ZealLogo'
import { MainLayout } from '../../layouts/MainLayout'

function HomePage() {
  return (
    <MainLayout>
      <MetaTags title="Home" description="Home page" />
      <div
        data-testid="home-page"
        className="m-10 flex flex-col items-center justify-center"
      >
        <h1 className="text-3xl">Redwood Template</h1>
        <ZealLogo />
      </div>
    </MainLayout>
  )
}

export default HomePage
