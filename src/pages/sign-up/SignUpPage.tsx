import { AxiosError } from 'axios'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../api/authentication'
import Button from '../../components/ui/Button'
import EmailField from '../../components/ui/EmailField'
import TextField from '../../components/ui/TextField'
import { setCurrentUser } from '../../slices/authSlice'
import { SignUp } from '../../types/authTypes'

const SignUpPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signedUpData, setSignedUpdata] = useState<SignUp>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const signUpMutation = useMutation(signup, {
    onSuccess(data) {
      dispatch(setCurrentUser(data.user))
      navigate('/')
    },
    onError(error: AxiosError<{ message: string }>) {
      console.log(error.response?.data)
    },
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSignedUpdata((prevSignedData) => ({
      ...prevSignedData,
      [`${event.target.name}`]: event.target.value,
    }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    signUpMutation.mutate(signedUpData)
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <h2>Sign up</h2>
      <p>
        Register to create your first account and start exploring
        functionalities in QuizNest
      </p>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          onChange={handleChange}
          name="name"
          value={signedUpData.name}
        />
        <EmailField
          label="Email"
          onChange={handleChange}
          name="email"
          value={signedUpData.email}
        />
        <TextField
          label="Password"
          onChange={handleChange}
          name="password"
          value={signedUpData.password}
        />
        <TextField
          label="Confirm password"
          onChange={handleChange}
          name="passwordConfirm"
          value={signedUpData.passwordConfirm}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default SignUpPage
