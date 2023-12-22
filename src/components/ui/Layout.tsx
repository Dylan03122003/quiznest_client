import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'

const Layout = () => {
  return (
    <main className="bg-custom-white relative">
      <Navbar />
      <Outlet />
    </main>
  )
}

export default Layout
