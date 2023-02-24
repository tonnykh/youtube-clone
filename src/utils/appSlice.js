import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: false,
    isButtonListVisible: true,
    isMenuClicked: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    defaultMenuOff: (state) => {
      state.isMenuClicked = true;
    },
    closeButtonList: (state) => {
      state.isButtonListVisible = false;
    },
  },
});

export const { toggleMenu, closeMenu, openMenu, defaultMenuOff, closeButtonList } =
  appSlice.actions;

export default appSlice.reducer;
