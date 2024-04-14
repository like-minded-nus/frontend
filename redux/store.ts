import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menuSlice';
import userReducer from './features/userSlice';
import matchReducer from './features/matchSlice';
import profileReducer from './features/profileSlice';
import reportReducer from './features/reportSlice';
import banReducer from './features/banSlice';

export const store = configureStore({
  reducer: {
    menuReducer,
    userReducer,
    matchReducer,
    profileReducer,
    reportReducer,
    banReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
