import { ZealLogo } from 'web/src/components/ZealLogo/ZealLogo'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

function HomePage() {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div
        data-testid="home-page"
        className="grid w-full py-10  sm:grid-cols-1 md:grid-cols-2"
      >
        <div className="font-inter mx-10 justify-start text-blackBean">
          <h1 className="py-5 font-sans text-6xl font-bold leading-none md:text-[90px]">
            You’re Almost There
          </h1>
          <h3 className="mb-10 text-xl">
            A RedwoodJS template built for Streamlined App Development,
            supporting multi-tenancy out of the box.
          </h3>
          <div>
            <h3 className="mb-2 text-xl font-bold ">Login as Admin</h3>
            <p className="mb-5 text-xl ">
              You can{' '}
              <Link
                className="border-b-2 border-rustyOrange font-bold text-rustyOrange hover:text-black"
                to={routes.login()}
              >
                login
              </Link>{' '}
              as an admin:
            </p>
            {/* TODO: Replace with environmental variables */}
            <code className="border-1 text-mono my-8 flex h-24 w-full flex-col justify-center bg-[#EFEFEF] px-5 text-lg">
              <p>Username: admin@example.com</p>
              <p>Password: password</p>
            </code>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-bold ">Create a New User</h3>
            <p className="mb-5 text-xl ">
              You can create a new generic user by registering them on the{' '}
              <Link
                className="border-b-2 border-rustyOrange font-bold text-primary hover:text-black"
                to={routes.signup()}
              >
                sign-up page
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="order-first mx-auto w-1/2 md:order-none md:mx-4 md:w-auto">
          <ZealLogo />
        </div>
      </div>
    </>
  )
}

export default HomePage
