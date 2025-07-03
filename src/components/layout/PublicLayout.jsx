import NavbarPublic from './NavbarPublic'

const PublicLayout = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<NavbarPublic />
			<main className="flex-grow flex flex-col">{children}</main>
		</div>
	)
}


export default PublicLayout
