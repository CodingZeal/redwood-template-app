import { Toaster } from '@redwoodjs/web/dist/toast'

import { Footer } from 'src/components/Footer/Footer'
import { Navigation } from 'src/components/Navigation/Navigation'

const MainLayout = ({ children }) => {
  return (
    <div className="m-4">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}

export { MainLayout }
