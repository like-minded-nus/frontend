import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menuSlice';
import userReducer from './features/userSlice';
import matchReducer from './features/matchSlice';
import profileReducer from './features/profileSlice';

export const store = configureStore({
  reducer: {
    menuReducer,
    userReducer,
    matchReducer,
    profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
