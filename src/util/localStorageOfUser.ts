import { User } from '../slices/authSlice'

const USER_INFO_KEY = 'UserInfoKeyOfQuizNestWeb'

export function storeUserInfo(user: User | null) {
  try {
    if (user) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_INFO_KEY)
    }
  } catch (error) {
    console.error('Error storing user information:', error)
  }
}

export function getUserInfo(): User | null {
  try {
    const storedUserInfo = localStorage.getItem(USER_INFO_KEY)
    if (storedUserInfo) {
      return JSON.parse(storedUserInfo) as User
    } else {
      return null
    }
  } catch (error) {
    // Handle any errors that might occur during retrieval
    console.error('Error retrieving user information:', error)
    return null
  }
}
