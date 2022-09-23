import { Footer } from 'src/components/Footer/Footer'
import { Navigation } from 'src/components/Navigation/Navigation'

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
