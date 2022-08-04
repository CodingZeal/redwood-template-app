import { MetaTags } from '@redwoodjs/web'
import { ZealLogo } from '../../components/ZealLogo'

function HomePage() {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className='flex justify-center items-center flex-col m-10'>
        <h1 className='text-3xl'>Redwood Template</h1>
        <ZealLogo />
      </div>
    </>
  )
}

export default HomePage
