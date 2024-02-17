import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { Profile } from '@/app/models/profile';

// Define the State Type
interface ProfileState {
  loading: boolean;
  errorMessage: string;
  profile: Profile;
}

// Define the initial state
const initialState: ProfileState = {
  loading: false as boolean,
  errorMessage: '' as string,
  profile: {} as Profile,
};

// Argument type
export type GetProfileArgs = {
  controller: AbortController;
  profileId: number;
};

// Create actions
export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async ({ controller, profileId }: GetProfileArgs, thunkAPI: any) => {
    const response: AxiosResponse<any> = await axios.get<any>(
      `http://localhost:8080/api/v1/profile/${profileId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    );

    if (response?.data?.status !== 200) {
      return thunkAPI.rejectWithValue('Failed to get profile.');
    }

    if (response?.data?.status === 200) {
      return response?.data;
    } else {
      return null;
    }
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileReset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action?.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = 'Failed to get profile.';
      })
      .addMatcher(isPending(getProfile), (state) => {
        state.loading = true;
      });
  },
});

export const { profileReset } = profileSlice.actions;
export default profileSlice.reducer;
