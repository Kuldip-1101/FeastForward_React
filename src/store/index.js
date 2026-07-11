import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import localeReducer from './localeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    locale: localeReducer,
  },
});