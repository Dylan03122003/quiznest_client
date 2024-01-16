import { AxiosError } from 'axios'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/authentication'
import Button from '../../components/ui/Button'
import ModernEmailField from '../../components/ui/ModernEmailField'
import TextField from '../../components/ui/TextField'
import { setCurrentUser } from '../../slices/authSlice'
import { LogIn } from '../../types/authTypes'
import Logo from './../../assets/img/logo.png'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loggedInData, setLoggedInData] = useState<LogIn>({
    email: '',
    password: '',
  })

  const logInMutation = useMutation(login, {
    onSuccess(data) {
      dispatch(setCurrentUser(data.user))
      navigate('/')
    },
    onError(error: AxiosError<{ message: string }>) {
      console.log(error.response?.data.message)
    },
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoggedInData((preData) => ({
      ...preData,
      [`${event.target.name}`]: event.target.value,
    }))
  }
  // Unused code 2 -----------------------------------------------------------------------
  const signInWithGoogle = async () => {
    // const response = await fetch('http://127.0.0.1:3000/request', {
    //   method: 'post',
    // })
    // const data = await response.json()
    // window.location.href = data.url

    window.open('http://localhost:3000/auth/google', '_self')
  }
  // Unused code 2 -----------------------------------------------------------------------
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    logInMutation.mutate(loggedInData)
  }

  return (
    <div className="flex items-center justify-center flex-col mt-20">
      <div className="bg-slate-50 p-5 rounded-full border border-solid border-slate-200 mb-5">
        <img src={Logo} alt="logo" />
      </div>
      <h2 className="text-4xl font-normal text-gray-700 mb-5">Hello Again!</h2>
      <p className="text-gray-500 mb-10">
        Log in to study quizzes and start exploring functionalities in QuizNest
      </p>
      <form onSubmit={handleSubmit}>
        {/* <EmailField
          label="Email"
          onChange={handleChange}
          name="email"
          value={loggedInData.email}
        /> */}
        <ModernEmailField
          px="px-4"
          py="py-3"
          rounded="rounded-md"
          bgColorInput="bg-white"
          borderColor="border-gray-300"
          onChange={handleChange}
          name="email"
          value={loggedInData.email}
        />
        <TextField
          label="Password"
          onChange={handleChange}
          name="password"
          value={loggedInData.password}
        />
        <Button
          width="w-full"
          rounded="rounded-md"
          paddingY="p-3"
          type="submit"
        >
          Submit
        </Button>
      </form>

      <button onClick={signInWithGoogle}>Continute with Google</button>
    </div>
  )
}

export default LoginPage
