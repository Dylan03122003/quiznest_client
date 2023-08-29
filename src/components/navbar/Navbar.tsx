import { GoHomeFill } from 'react-icons/go'
import { Link } from 'react-router-dom'
import Logo from './../../assets/img/logo.png'
const Navbar = () => {
  return (
    <header className="bg-blue-100">
      {/* Desktop ----------------------------------------------------------------------------------*/}
      <div className="hidden sm:flex items-center justify-between p-4">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-10" />
        </Link>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link to={'/log-in'}>Log in</Link>
            <Link to={'/sign-up'}>Sign up</Link>
          </li>
        </ul>
      </div>
      {/* Mobile ----------------------------------------------------------------------------------*/}
      <div className="flex sm:hidden items-center justify-center absolute bottom-0 w-full border-solid border-t-[1px] border-gray-400 p-2">
        <Link to="/" className="flex items-center justify-center flex-col">
          <GoHomeFill className="w-7 h-7 text-blue-500" />
          <p className="text-sm text-blue-500">Home</p>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
