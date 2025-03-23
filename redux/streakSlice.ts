import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StreakState {
  currentStreak: number,
  topStreak: number,
}

const initialState: StreakState = {
  currentStreak: 0,
  topStreak: 0,
}

const getDaysPassed = (apiDateString: string) => {
    const apiDate = new Date(apiDateString); // Convert API string to Date object
    const currentDate = new Date();

    
    // Get time difference in milliseconds
    const timeDifference = currentDate.getTime() - apiDate.getTime();

    
    // Convert milliseconds to days
    const daysPassed = timeDifference / (1000 * 60 * 60 * 24);
    
    // console.log('streakSlice daysPassed', daysPassed)
  
    return daysPassed
};

const streakSlice = createSlice({
  name: "streak",
  initialState,
  reducers: {
    setCurrentStreak: (state, action: PayloadAction<{ currentStreak: number, lastStudyDate: string }>) => {
        const lastStudyDate = action.payload.lastStudyDate
        const daysPassed = getDaysPassed(lastStudyDate)

        if (daysPassed > 2) {
            state.currentStreak = 0
        } else {
            state.currentStreak = action.payload.currentStreak
        }
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
