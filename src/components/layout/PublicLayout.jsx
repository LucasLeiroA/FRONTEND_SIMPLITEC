import NavbarPublic from './NavbarPublic'

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <NavbarPublic />
      <main className="p-4">{children}</main>
    </div>
  )
}

export default PublicLayout
