import { Routes, Route } from 'react-router-dom'
import Home from '../pages/public/Home'
import Autos from '../pages/public/Autos'
import PublicLayout from '../components/layout/PublicLayout'
import PublicLogin from '../pages/public/PublicLogin '
import RegisterClient from '../pages/public/RegisterClient '

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/autos" element={<Autos />} />
        <Route path="/login" element={<PublicLogin />} />
        <Route path="/registro" element={<RegisterClient />} />
      </Routes>
    </PublicLayout>
  )
}

export default PublicRoutes
