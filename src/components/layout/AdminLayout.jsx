import NavbarAdmin from './NavbarAdmin'

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavbarAdmin />
            <main className="p-6">{children}</main>
        </div>
    )
}

export default AdminLayout
