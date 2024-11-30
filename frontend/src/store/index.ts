import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import groupReducer from './groupSlice';
import expenseReducer from './expenseSlice';
import cocktailsReducer from './cocktailsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    groups: groupReducer,
    expenses: expenseReducer,
    cocktails: cocktailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
