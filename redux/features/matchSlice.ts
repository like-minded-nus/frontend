import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { ProfilePassionMatchList } from '@/models/profile-passion-match-list';
import { Match, MatchRequestBody } from '@/models/match';

// Define the State Type
interface MatchState {
  loading: boolean;
  errorMessage: string;
  profilePassionMatchList: ProfilePassionMatchList;
  match: Match;
}

// Define the initial state
const initialState: MatchState = {
  loading: false as boolean,
  errorMessage: '' as string,
  profilePassionMatchList: {} as ProfilePassionMatchList,
  match: {} as Match,
};

// Argument type
export type GetProfilePassionMatchListArgs = {
  controller: AbortController;
  profileId: number;
};

export type CreateMatchRecordArgs = {
  controller: AbortController;
  matchRequestBody: MatchRequestBody;
};

// Create actions
export const getProfilePassionMatchList = createAsyncThunk(
  'match/getProfilePassionMatchList',
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
      return response?.data?.payload;
    } else {
      return null;
    }
  }
);

export const createMatchRecord = createAsyncThunk(
  'match/createMatchRecord',
  async (
    { controller, matchRequestBody }: CreateMatchRecordArgs,
    thunkAPI: any
  ) => {
    const response: AxiosResponse<any> = await axios.post<any>(
      `http://localhost:8080/api/v1/match`,
      matchRequestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    );

    if (response?.data?.status !== 200) {
      return thunkAPI.rejectWithValue(
        'Failed to get create/update match record.'
      );
    }

    if (response?.data?.status === 200) {
      return response?.data?.payload;
    } else {
      return null;
    }
  }
);

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    matchReset() {
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
      .addCase(createMatchRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.match = action?.payload;
      })
      .addCase(createMatchRecord.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = 'Failed to get create/update match record.';
      })
      .addMatcher(
        isPending(getProfilePassionMatchList, createMatchRecord),
        (state) => {
          state.loading = true;
        }
      );
  },
});

export const { matchReset } = matchSlice.actions;
export default matchSlice.reducer;
