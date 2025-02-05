import { configureStore } from '@reduxjs/toolkit';
import followingReducer from './followingSlice';

export const store = configureStore({
    reducer: {
        following: followingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
