import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  currentUser: null,
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
  },
})

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
