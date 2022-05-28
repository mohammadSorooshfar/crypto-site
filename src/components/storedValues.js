import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coinDetail: {},
  darkMode: true,
};
export const storedSlice = createSlice({
  name: "storedValues",
  initialState,
  reducers: {
    coinDetailAdd: (state, action) => {
      state.coinDetail = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { coinDetailAdd, toggleDarkMode } = storedSlice.actions;
export default storedSlice.reducer;
