import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'

const Layout = () => {
  return (
    <main className="bg-custom-white">
      <Navbar />
      <Outlet />
    </main>
  )
}

export default Layout
