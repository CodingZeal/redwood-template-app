import { Footer } from '../components/Footer/Footer'
import { Navigation } from '../components/Navigation'

const MainLayout = ({ children }) => {
  return (
    <div className="m-4">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}

export { MainLayout }
