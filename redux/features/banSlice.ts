import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { Ban } from '@/models/ban';

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

// Define the State Type
interface BanState {
  loading: boolean;
  errorMessage: string;
  bans: Ban[];
}

// Define the initial state
const initialState: BanState = {
  loading: false as boolean,
  errorMessage: '' as string,
  bans: [] as Ban[],
};

// Argument type
export type GetBannedUsersArgs = {
  controller: AbortController;
};

// Create actions
export const getBannedUsers = createAsyncThunk(
  'ban/getBannedUsers',
  async ({ controller }: GetBannedUsersArgs, thunkAPI: any) => {
    const response: AxiosResponse<any> = await axios.get<any>(
      `${endpoint}/ban`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    );

    if (response?.data?.status !== 200) {
      return thunkAPI.rejectWithValue('Failed to get banned users.');
    }

    if (response?.data?.status === 200) {
      return response?.data?.payload;
    } else {
      return null;
    }
  }
);

export const banSlice = createSlice({
  name: 'ban',
  initialState,
  reducers: {
    banReset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBannedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.bans = action?.payload;
      })
      .addCase(getBannedUsers.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = 'Failed to get banned users.';
      })
      .addMatcher(isPending(getBannedUsers), (state) => {
        state.loading = true;
      });
  },
});

export const { banReset } = banSlice.actions;
export default banSlice.reducer;
