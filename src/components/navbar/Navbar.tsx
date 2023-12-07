import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { BsPlusCircle } from 'react-icons/bs'
import { GoHomeFill } from 'react-icons/go'
import { IoIosSearch } from 'react-icons/io'
import { MdImageSearch } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import DeckForm from '../deck/DeckForm'
import Button from '../ui/Button'
import ColorMode from '../ui/ColorMode'
import Overlay from '../ui/Overlay'
import DefaultUserPhoto from '../user/DefaultUserPhoto'
import UserMenu from '../user/UserMenu'
import Logo from './../../assets/img/logo.png'

const Navbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.authState)
  const [openCreateDeck, setOpenCreateDeck] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const isLoggedIn = currentUser != null

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {openCreateDeck && (
          <DeckForm
            openCreateDeck={openCreateDeck}
            onClose={() => setOpenCreateDeck(false)}
          />
        )}
      </AnimatePresence>

      <header className="bg-primary-light dark:bg-primary-dark">
        {/* Desktop ----------------------------------------------------------------------------------*/}
        <div className="hidden sm:flex items-center justify-between p-4">
          <Link to="/" className="flex items-center justify-center gap-2">
            <img src={Logo} alt="logo" className="w-7" />
            <p className="text-title-light dark:text-white font-semibold">
              Understanda
            </p>
          </Link>
          <ul className="flex items-center justify-center gap-6">
            <li>
              <Link
                className="text-text-light dark:text-text-dark"
                to={'/posts'}
              >
                Posts
              </Link>
            </li>

            <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700"></div>

            {!isLoggedIn && (
              <>
                <li>
                  <Link to={'/log-in'}>
                    <Button>Log in</Button>
                  </Link>
                </li>
                <li>
                  <Link to={'/sign-up'}>
                    <Button>Sign up</Button>
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <Button onClick={() => setOpenCreateDeck(true)}>
                Create Deck
              </Button>
            )}

            <ColorMode />

            {isLoggedIn && (
              <div className="relative flex items-center justify-center gap-2">
                {!currentUser.photo && (
                  <DefaultUserPhoto
                    name={currentUser.name}
                    onOpenUserMenu={() =>
                      setOpenUserMenu((prevOne) => !prevOne)
                    }
                  />
                )}
                {openUserMenu && (
                  <>
                    <Overlay onClose={() => setOpenUserMenu(false)} />
                    <UserMenu
                      user={currentUser}
                      className="absolute top-12 right-0 "
                    />
                  </>
                )}
              </div>
            )}
          </ul>
        </div>
        {/* Mobile ----------------------------------------------------------------------------------*/}
        <div className="flex sm:hidden items-center justify-around absolute bottom-0 w-full border-solid border-t-[1px] border-gray-300 dark:border-gray-700 p-2">
          <Link to="/" className="flex items-center justify-center flex-col">
            <GoHomeFill className="w-7 h-7 text-primary-dark dark:text-primary-light" />
            <p className="text-sm text-primary-dark dark:text-primary-light">
              Home
            </p>
          </Link>
          <Link to="/" className="flex items-center justify-center flex-col">
            <IoIosSearch className="w-7 h-7 text-primary-dark dark:text-primary-light" />
            <p className="text-sm text-primary-dark dark:text-primary-light">
              Search
            </p>
          </Link>
          <Link to={'/'}>
            <BsPlusCircle className="w-10 h-10 text-primary-dark dark:text-primary-light" />
          </Link>
          <Link to={'/'} className="flex items-center justify-center flex-col">
            <MdImageSearch className="w-7 h-7 text-primary-dark dark:text-primary-light" />
            <p className="text-sm text-primary-dark dark:text-primary-light">
              Posts
            </p>
          </Link>
          {isLoggedIn && (
            <Link
              to={'/'}
              className="flex items-center justify-center flex-col"
            >
              <DefaultUserPhoto
                name={currentUser.name}
                width="w-7"
                height="h-7"
                textSize="text-xs"
              />
              <p className="text-sm text-primary-dark dark:text-primary-light">
                You
              </p>
            </Link>
          )}
        </div>
      </header>
    </>
  )
}

export default Navbar
