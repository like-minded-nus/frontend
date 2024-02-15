import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menuSlice';
import userReducer from './features/userSlice';
import browseSlice from './features/browseSlice';

export const store = configureStore({
  reducer: {
    menuReducer,
    userReducer,
    browseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
