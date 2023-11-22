// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import exampleReducer from '../reducer/exampleReducer';

const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
});

export default store;
