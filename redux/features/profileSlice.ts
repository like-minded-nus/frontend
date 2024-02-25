import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { Profile } from '@/models/profile';

// Define the State Type
interface ProfileState {
  loading: boolean;
  errorMessage: string;
  profile: Profile;
  sessionProfile: Profile;
}

// Define the initial state
const initialState: ProfileState = {
  loading: false as boolean,
  errorMessage: '' as string,
  profile: {} as Profile,
  sessionProfile: {} as Profile,
};

// Argument type
export type GetProfileArgs = {
  controller: AbortController;
  profileId: number;
};

export type GetProfileByUserIdArgs = {
  controller: AbortController;
  userId: number;
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
      return thunkAPI.rejectWithValue('Failed to get profile by profileId.');
    }

    if (response?.data?.status === 200) {
      return response?.data?.payload;
    } else {
      return null;
    }
  }
);

export const getProfileByUserId = createAsyncThunk(
  'profile/getProfileByUserId',
  async ({ controller, userId }: GetProfileByUserIdArgs, thunkAPI: any) => {
    const response: AxiosResponse<any> = await axios.get<any>(
      `http://localhost:8080/api/v1/profile/userId/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    );

    if (response?.data?.status !== 200) {
      return thunkAPI.rejectWithValue('Failed to get profile by userId.');
    }

    if (response?.data?.status === 200) {
      return response?.data?.payload;
    } else {
      return null;
    }
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    sessionProfileReset(state) {
      return { ...state, sessionProfile: {} as Profile };
    },
    profileReset(state) {
      return { ...state, profile: {} as Profile };
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
        state.errorMessage = 'Failed to get profile by profileId.';
      })
      .addCase(getProfileByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionProfile = action?.payload;
      })
      .addCase(getProfileByUserId.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = 'Failed to get profile by userId.';
      })
      .addMatcher(isPending(getProfile, getProfileByUserId), (state) => {
        state.loading = true;
      });
  },
});

export const { sessionProfileReset, profileReset } = profileSlice.actions;
export default profileSlice.reducer;
