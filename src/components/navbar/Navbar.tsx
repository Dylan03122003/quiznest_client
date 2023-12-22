import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { BsPlusCircle } from 'react-icons/bs'
import { GoHomeFill } from 'react-icons/go'
import { IoIosSearch } from 'react-icons/io'
import { MdImageSearch, MdLogin } from 'react-icons/md'
import { Link } from 'react-router-dom'
import DeckForm from '../form/DeckForm'
import Button from '../ui/Button'

import ColorMode from '../ui/ColorMode'

import Logo from './../../assets/img/logo.png'

const Navbar = () => {
  const [openCreateDeck, setOpenCreateDeck] = useState(false)

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

      <header className=" bg-primary-light dark:bg-primary-dark">
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

            <SignedIn>
              <Button onClick={() => setOpenCreateDeck(true)}>
                Create Deck
              </Button>
            </SignedIn>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <>
                <li>
                  <Link to={'/sign-in'}>
                    <Button>Log in</Button>
                  </Link>
                </li>
                <li>
                  <Link to={'/register'}>
                    <Button>Sign up</Button>
                  </Link>
                </li>
              </>
            </SignedOut>

            <ColorMode />
          </ul>
        </div>
        {/* Mobile ----------------------------------------------------------------------------------*/}
        <div className="z-10 flex sm:hidden items-center justify-around fixed bottom-0 w-full border-solid border-t-[1px] border-gray-300 dark:border-gray-700 p-2 bg-primary-light dark:bg-primary-dark">
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
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              to={'/sign-in'}
              className="flex items-center justify-center flex-col"
            >
              <MdLogin className="w-7 h-7 text-primary-dark dark:text-primary-light" />
              <p className="text-sm text-primary-dark dark:text-primary-light">
                Login
              </p>
            </Link>
          </SignedOut>
        </div>
      </header>
    </>
  )
}

export default Navbar
