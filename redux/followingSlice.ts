import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FollowingState {
    followingList: { 
        id: number,
        username: string,
        top_streak: number,
    }[];
    followersCount: number;
    followingCount: number;
}

const initialState: FollowingState = {
    followingList: [],
    followersCount: 0,
    followingCount: 0,
};

const followingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {
        setFollowingList: (state, action: PayloadAction<{ followingList: any[], followersCount: number, followingCount: number }>) => {
            // setFollowingList: (state, action: any) => {

            const { followingList, followersCount, followingCount } = action.payload
            // console.log('followingSlice action.payload', action.payload)

            // Reset and update the following list
            if (followingList.length > 0) {
                state.followingList = followingList.map((user: any) => ({
                    id: user.following.id,
                    username: user.following.username,
                    top_streak: user.following.top_streak,
                }));
                
                // Sort the list by top_streak in descending order
                state.followingList.sort((a, b) => b.top_streak - a.top_streak);
            }

            // Update counts
            state.followersCount = followersCount;
            state.followingCount = followingCount;

        },
        deleteFollowingList: (state) => {
            state.followingList = [];
        },
        followUser: (state, action: PayloadAction<any>) => {
            // Add the new user to the list
            state.followingList.push(action.payload);

            // Sort the followingList by top_streak in descending order after adding
            state.followingList.sort((a, b) => b.top_streak - a.top_streak);

            // Increment following count
            state.followingCount += 1;
        },
        unfollowUser: (state, action: PayloadAction<{ id: number }>) => {
            // Filter out the user with the given ID to unfollow
            state.followingList = state.followingList.filter(user => user.id !== action.payload.id);

            // Decrement following count
            state.followingCount = Math.max(0, state.followingCount - 1);
        },
    },
});

export const { setFollowingList, followUser, unfollowUser } = followingSlice.actions;

export default followingSlice.reducer;
