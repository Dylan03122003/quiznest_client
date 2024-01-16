import { LogIn, SignUp } from '../types/authTypes'
import { apiInstance } from './config'

export const login = async (loggedInData: LogIn) => {
  const response = await apiInstance.post('/api/users/log-in', loggedInData)
  return response.data
}

export const signup = async (signedUpData: SignUp) => {
  const response = await apiInstance.post('/api/users/sign-up', signedUpData)
  return response.data
}

export const logout = async () => {
  const response = await apiInstance.post('/api/users/log-out')
  return response.data
}
