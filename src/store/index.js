import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './features/messageSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    auth: authReducer,
  },
});
