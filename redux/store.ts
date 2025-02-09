import { configureStore, combineReducers } from '@reduxjs/toolkit'
import followingReducer from './followingSlice'
import streakReducer from './streakSlice'

// Action type for resetting state
const RESET_STATE = 'RESET_STATE'

// Combine reducers
const appReducer = combineReducers({
  following: followingReducer,
  streak: streakReducer,
})

// Root reducer with reset handling
const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    state = undefined // Reset all Redux state
  }
  return appReducer(state, action)
}

// Configure store
export const store = configureStore({
  reducer: rootReducer,
})

// Action creator for resetting state
export const resetState = () => ({ type: RESET_STATE })

// Types for RootState and Dispatch
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
