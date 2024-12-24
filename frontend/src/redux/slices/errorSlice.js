import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      // без Иммор
      // state = action.payload;
      // return state

      return action.payload;
    },

    clearError: () => {
      // Одинаково
      // return initialState;
      return '';
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export const selectErrorMessege = (state) => state.error;

export default errorSlice.reducer;
