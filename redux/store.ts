import { configureStore } from '@reduxjs/toolkit';
import followingReducer from './followingSlice';
import streakReducer from './streakSlice'

export const store = configureStore({
    reducer: {
        following: followingReducer,
        streak: streakReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
