import axios, { AxiosResponse } from 'axios';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ProfilePassionMatchList } from '@/app/models/profile-passion-match-list';

// Define the State Type
interface BrowseState {
  loading: boolean;
  errorMessage: string;
  profilePassionMatchList: ProfilePassionMatchList;
}

// Define the initial state
const initialState: BrowseState = {
  loading: false as boolean,
  errorMessage: '' as string,
  profilePassionMatchList: { profileId: -1, matchList: [] },
};

// Argument type
export type GetProfilePassionMatchListArgs = {
  controller: AbortController;
  profileId: number;
};

// Create actions
export const getProfilePassionMatchList = createAsyncThunk(
  'browse/getProfilePassionMatchList',
  async (
    { controller, profileId }: GetProfilePassionMatchListArgs,
    thunkAPI: any
  ) => {
    const response: AxiosResponse<any> = await axios.get<any>(
      `http://localhost:8080/api/v1/profile/passions/match/${profileId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    );

    if (response?.data?.status !== 200) {
      return thunkAPI.rejectWithValue(
        'Failed to get profile passion match list.'
      );
    }

    if (response?.data?.status === 200) {
      return response?.data?.profilePassionMatchList;
    } else {
      return null;
    }
  }
);

export const browseSlice = createSlice({
  name: 'browse',
  initialState,
  reducers: {
    browseReset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfilePassionMatchList.fulfilled, (state, action) => {
        state.loading = false;
        state.profilePassionMatchList = action?.payload;
      })
      .addCase(getProfilePassionMatchList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = 'Failed to get profile passion match list.';
      })
      .addMatcher(isPending(getProfilePassionMatchList), (state) => {
        state.loading = true;
      });
  },
});

export const { browseReset } = browseSlice.actions;
export default browseSlice.reducer;
