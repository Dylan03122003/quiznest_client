import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../api/authentication'
import { setCurrentUser } from '../../slices/authSlice'
import { User } from '../../types/user.types'
import DefaultUserPhoto from './DefaultUserPhoto'

interface Props {
  user: User
  className?: string
}
const UserMenu = ({ user, className }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutMutation = useMutation(logout, {
    onSuccess() {
      dispatch(setCurrentUser(null))
      navigate('/log-in')
    },
  })

  const renderUserPhoto = () => {
    const hasUserPhoto = user.photo != null

    if (hasUserPhoto) {
      return <img src={user.photo!} alt="user-photo" />
    } else {
      return <DefaultUserPhoto name={user.name} />
    }
  }

  return (
    <div
      className={`z-20 bg-primary-light dark:bg-primary-dark border border-solid border-gray-300 dark:border-gray-600  rounded-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-5 p-4 border-b-[1px] border-solid border-gray-300 dark:border-gray-600">
        {renderUserPhoto()}
        <div className="min:w-[200px] flex flex-col">
          <p className="text-text-light dark:text-text-dark font-semibold">
            {user.name}
          </p>
          <p className="text-text-light dark:text-text-dark">{user.email}</p>
        </div>
      </div>

      <div className="p-4 flex flex-col items-start justify-start gap-2">
        <Link
          className="text-text-light dark:text-text-dark"
          to={'/my-profile'}
        >
          View my profile
        </Link>
        <button
          className="text-text-light dark:text-text-dark"
          onClick={() => logoutMutation.mutate()}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default UserMenu
