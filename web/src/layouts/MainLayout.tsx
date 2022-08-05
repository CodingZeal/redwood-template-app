import { Navigation } from '../components/Navigation'

const MainLayout = ({ children }) => {
  return (
    <div className="m-4">
      <Navigation />
      {children}
    </div>
  )
}

export { MainLayout }
