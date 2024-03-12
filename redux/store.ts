import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menuSlice';
import userReducer from './features/userSlice';
import matchReducer from './features/matchSlice';
import profileReducer from './features/profileSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profileReducer'],
};

const rootReducer = combineReducers({
  menuReducer,
  userReducer,
  matchReducer,
  profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
