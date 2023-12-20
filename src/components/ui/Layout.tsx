import { Outlet } from 'react-router-dom'
import TestNav from '../navbar/TestNav'

const Layout = () => {
  return (
    <main className="bg-custom-white relative">
      <TestNav />
      {/* <Navbar/> */}
      <Outlet />
    </main>
  )
}

export default Layout
