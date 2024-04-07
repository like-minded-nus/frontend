import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

// Define the State Type
interface UserState {
  userId: number;
  isPremium: number;
}

// Define the initial state
const initialState: UserState = {
  userId: 0,
  isPremium: 0,
};

export const userSlice: Slice<UserState> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<number>) => {
      return { ...state, activeItem: action.payload };
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    setIsPremium: (state, action: PayloadAction<number>) => {
      state.isPremium = action.payload;
    },
  },
});

export const { setActiveItem, setUserId, setIsPremium } = userSlice.actions;
export default userSlice.reducer;
