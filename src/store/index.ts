import { configureStore } from '@reduxjs/toolkit';
import testResultReducer from './testResultSlice';

export const store = configureStore({
  reducer: {
    testResult: testResultReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 