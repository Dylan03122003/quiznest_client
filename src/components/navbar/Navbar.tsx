import { useState } from 'react'
import { GoHomeFill } from 'react-icons/go'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../api/authentication'
import { setCurrentUser } from '../../slices/authSlice'
import { RootState } from '../../store'
import DeckForm from '../form/DeckForm'
import Button from '../ui/Button'
import Logo from './../../assets/img/logo.png'

const Navbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.authState)
  const dispatch = useDispatch()
  const [openCreateDeck, setOpenCreateDeck] = useState(false)

  const logoutMutation = useMutation(logout, {
    onSuccess() {
      dispatch(setCurrentUser(null))
    },
  })

  return (
    <>
      {currentUser && openCreateDeck && (
        <DeckForm
          open={openCreateDeck}
          onClose={() => setOpenCreateDeck(false)}
        />
      )}

      <header className="">
        {/* Desktop ----------------------------------------------------------------------------------*/}
        <div className="hidden sm:flex items-center justify-between p-4">
          <Link to="/" className="flex items-center justify-center gap-2">
            <img src={Logo} alt="logo" className="w-10" />
            <p>AnKiPro</p>
          </Link>
          <ul className="flex items-center justify-center gap-4">
            {!currentUser && (
              <>
                <li>
                  <Link
                    to={'/log-in'}
                    className="px-2 py-1 bg-red-50 rounded-md"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/sign-up'}
                    className="px-2 py-1 bg-red-50 rounded-md"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}

            {currentUser && (
              <Button onClick={() => setOpenCreateDeck(true)}>
                Create Deck
              </Button>
            )}

            {currentUser && (
              <div className="flex items-center justify-center gap-2">
                <h2>{currentUser.name}</h2>
                <button onClick={() => logoutMutation.mutate()}>Logout</button>
              </div>
            )}
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
    </>
  )
}

export default Navbar
