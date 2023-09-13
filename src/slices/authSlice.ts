import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUserInfo, storeUserInfo } from '../util/localStorageOfUser'

export interface User {
  _id: string
  name: string
  email: string
  role: string
  photo: string
}

export interface SignUp {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface LogIn {
  email: string
  password: string
}

interface UserState {
  currentUser: User | null
}

const initialState: UserState = {
  currentUser: getUserInfo(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      storeUserInfo(action.payload)
      state.currentUser = action.payload
    },
  },
})

export const { setCurrentUser } = authSlice.actions

export default authSlice.reducer
