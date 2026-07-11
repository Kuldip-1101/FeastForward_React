import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLang: localStorage.getItem('lang') || 'en',
  currency: localStorage.getItem('currency') || 'USD',
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const lang = action.payload;
      state.currentLang = lang;
      localStorage.setItem('lang', lang);
      
      //-------------- Update currency automatically based on the language selected ---------------
      if (['gu', 'hi', 'pa'].includes(lang)) {
        state.currency = 'INR';
      } else if (['fr', 'es'].includes(lang)) {
        state.currency = 'EUR';
      } else {
        state.currency = 'USD'; // Default English
      }
      localStorage.setItem('currency', state.currency);
    },
  },
});

export const { setLanguage } = localeSlice.actions;
export default localeSlice.reducer;