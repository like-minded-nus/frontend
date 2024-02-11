import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

// Define the State Type
interface UserState {
  userId: number;
}

// Define the initial state
const initialState: UserState = {
  userId: 0,
};

export const userSlice: Slice<UserState> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<number>) => {
      return { ...state, activeItem: action.payload };
    },
  },
});

export const { setActiveItem } = userSlice.actions;
export default userSlice.reducer;
