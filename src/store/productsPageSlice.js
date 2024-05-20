import { createSlice } from "@reduxjs/toolkit";

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState: {
    scroll: null,
  },
  reducers: {
    rememberScroll: (state, action) => {
      state.scroll = action.payload.scrollPosition;
    },
  },
});

export const { rememberScroll } = productsPageSlice.actions;
export default productsPageSlice.reducer;
