import { combineReducers } from 'redux';
import { contactsReducer } from './contactSlice';
import { filterReducer } from './filterSlice';
import { authReducer } from './authSlice'; 
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  auth: authReducer, 
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});