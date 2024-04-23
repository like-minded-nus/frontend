import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { Report } from '@/models/report';

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';

// Define the State Type
interface ReportState {
  loading: boolean;
  errorMessage: string;
  reports: Report[];
}

// Define the initial state
const initialState: ReportState = {
  loading: false as boolean,
  errorMessage: '' as string,
  reports: [] as Report[],
};

// Argument type
export type GetReportedRecordsArgs = {
  controller: AbortController;
};

// Create actions
export const getReportedRecords = createAsyncThunk(
  'report/getReportedRecords',
  async ({ controller }: GetReportedRecordsArgs, thunkAPI: any) => {
    const response: AxiosResponse<any> = await axios.get<any>(
      `${endpoint}/report`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    );

    if (response?.data?.status !== 200) {
      return thunkAPI.rejectWithValue('Failed to get reported records.');
    }

    if (response?.data?.status === 200) {
      return response?.data?.payload;
    } else {
      return null;
    }
  }
);

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    reportReset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getReportedRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action?.payload;
      })
      .addCase(getReportedRecords.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = 'Failed to get reported records.';
      })
      .addMatcher(isPending(getReportedRecords), (state) => {
        state.loading = true;
      });
  },
});

export const { reportReset } = reportSlice.actions;
export default reportSlice.reducer;
