import { Navigation } from 'src/components/Admin/Navigation/Navigation'

const AdminLayout = ({ children }) => {
  return (
    <div className="m-4 flex flex-row items-start">
      <Navigation />
      <div>{children}</div>
    </div>
  )
}

export { AdminLayout }
