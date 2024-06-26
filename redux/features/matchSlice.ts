import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { ProfilePassionMatchList } from '@/models/profile-passion-match-list';
import { Match, MatchRequestBody } from '@/models/match';

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

// Define the State Type
interface MatchState {
  loading: boolean;
  errorMessage: string;
  profilePassionMatchList: ProfilePassionMatchList;
  match: Match;
  matches: Match[];
}

// Define the initial state
const initialState: MatchState = {
  loading: false as boolean,
  errorMessage: '' as string,
  profilePassionMatchList: {} as ProfilePassionMatchList,
  match: {} as Match,
  matches: [] as Match[],
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

export type GetAllMatchesArgs = GetProfilePassionMatchListArgs;

// Create actions
export const getProfilePassionMatchList = createAsyncThunk(
  'match/getProfilePassionMatchList',
  async (
    { controller, profileId }: GetProfilePassionMatchListArgs,
    thunkAPI: any
  ) => {
    const response: AxiosResponse<any> = await axios.get<any>(
      `${endpoint}/profile/passions/match/${profileId}`,
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
      `${endpoint}/match`,
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

export const getAllMatches = createAsyncThunk(
  'match/getAllMatches',
  async ({ controller, profileId }: GetAllMatchesArgs, thunkAPI: any) => {
    const response: AxiosResponse<any> = await axios.get<any>(
      `${endpoint}/match/${profileId}`,
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

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    matchReset(state) {
      state.match = {} as Match;
    },
    profilePassionMatchListReset(state) {
      state.profilePassionMatchList = {} as ProfilePassionMatchList;
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
      .addCase(getAllMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action?.payload;
      })
      .addCase(getAllMatches.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = 'Failed to get create/update match record.';
      })
      .addMatcher(
        isPending(getProfilePassionMatchList, createMatchRecord, getAllMatches),
        (state) => {
          state.loading = true;
        }
      );
  },
});

export const { matchReset, profilePassionMatchListReset } = matchSlice.actions;
export default matchSlice.reducer;
