import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import localeReducer from './localeSlice';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    locale: localeReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});