import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menuSlice';
import userReducer from './features/userSlice';
import browseSlice from './features/browseSlice';
import profileSlice from './features/profileSlice';

export const store = configureStore({
  reducer: {
    menuReducer,
    userReducer,
    browseSlice,
    profileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
