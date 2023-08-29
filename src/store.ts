import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

const rootReducer = combineReducers({
  authState: authReducer,
  // ... other reducers ...
})

const store = configureStore({
  reducer: rootReducer,
})

// Define RootState type by merging all slice state types
export type RootState = ReturnType<typeof rootReducer>

export default store
