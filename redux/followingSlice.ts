import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FollowingState {
    followingList: { 
        id: number,
        username: string,
        top_streak: number,
    }[];
}

const initialState: FollowingState = {
    followingList: [],
};

const followingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {
        setFollowingList: (state, action: PayloadAction<any[]>) => {
            // Clear the existing list before adding new ones
            state.followingList = [];
            
            // Populate the followingList with new data
            action.payload.forEach((user: any) => {
                state.followingList.push({
                    id: user.following.id,
                    username: user.following.username,
                    top_streak: user.following.top_streak,
                });
                console.log('followingSlice.ts setFollowingList:', user.following);
            });

            // Sort the followingList by top_streak in descending order
            state.followingList.sort((a, b) => b.top_streak - a.top_streak);
        },
        followUser: (state, action: PayloadAction<any>) => {
            // Add the new user to the list
            state.followingList.push(action.payload);

            // Sort the followingList by top_streak in descending order after adding
            state.followingList.sort((a, b) => b.top_streak - a.top_streak);
        },
        unfollowUser: (state, action: PayloadAction<{ id: number }>) => {
            // Filter out the user with the given ID to unfollow
            state.followingList = state.followingList.filter(user => user.id !== action.payload.id);
        },
    },
});

export const { setFollowingList, followUser, unfollowUser } = followingSlice.actions;

export default followingSlice.reducer;
