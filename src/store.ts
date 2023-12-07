import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import deckReducer from './slices/deck/deckSlice'

const rootReducer = combineReducers({
  authState: authReducer,
  deckState: deckReducer,
  // ... other reducers ...
})

const store = configureStore({
  reducer: rootReducer,
})

// Define RootState type by merging all slice state types
export type RootState = ReturnType<typeof rootReducer>

export default store
