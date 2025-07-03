import { Routes, Route } from 'react-router-dom'
import Home from '../pages/public/Home'
import Autos from '../pages/public/Autos'
import PublicLayout from '../components/layout/PublicLayout'

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/autos" element={<Autos />} />
      </Routes>
    </PublicLayout>
  )
}

export default PublicRoutes
