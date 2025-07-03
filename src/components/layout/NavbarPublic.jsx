import { Link } from 'react-router-dom'

const NavbarPublic = () => {
    return (
        <header className="flex justify-between items-center p-4 shadow-md bg-white">
            <Link to="/" className="text-xl font-bold">SimpliTEC</Link>
            <nav className="space-x-4">
                <Link to="/">Inicio</Link>
                <Link to="/autos">Comprar</Link>
                <Link to="/nosotros">Nosotros</Link>
                <Link to="/contacto">Contacto</Link>
            </nav>
        </header>
    )
}

export default NavbarPublic
