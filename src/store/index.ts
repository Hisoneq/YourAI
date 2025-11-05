import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './slices/inputSlice';
import messagesReducer from './slices/messagesSlice';

export const store = configureStore({
  reducer: {
    input: inputReducer,
    messages: messagesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

