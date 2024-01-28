import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user.types'
import { getUserInfo, storeUserInfo } from '../util/localStorageOfUser'

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
