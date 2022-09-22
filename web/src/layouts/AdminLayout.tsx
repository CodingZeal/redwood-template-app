import { AdminNavigation } from 'src/components/AdminNavigation/AdminNavigation'

const AdminLayout = ({ children }) => {
  return (
    <div className="m-4">
      <AdminNavigation />
      {children}
    </div>
  )
}

export { AdminLayout }
