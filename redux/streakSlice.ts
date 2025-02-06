import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StreakState {
  currentStreak: number,
  topStreak: number,
}

const initialState: StreakState = {
  currentStreak: 0,
  topStreak: 0,
}

const streakSlice = createSlice({
  name: "streak",
  initialState,
  reducers: {
    setCurrentStreak: (state, action: PayloadAction<number>) => {
      state.currentStreak = action.payload
    },
    updateCurrentStreak: (state, action: PayloadAction<number>) => {
      // if response.current_streak > currentStreak
      if (action.payload > state.currentStreak) {
        state.currentStreak = action.payload
      }
      
      // if currentStreak > topStreak then setTopStreak
      if (action.payload > state.topStreak) {
        state.topStreak = action.payload
      }
    },
    setTopStreak: (state, action: PayloadAction<number>) => {
      state.topStreak = action.payload
    },
  },
})

export const { setCurrentStreak, updateCurrentStreak, setTopStreak } = streakSlice.actions
export default streakSlice.reducer
