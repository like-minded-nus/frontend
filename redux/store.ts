import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menuSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
