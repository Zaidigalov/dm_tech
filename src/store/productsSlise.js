import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    pageNumber: 1,
    fetching: true,
    totalProducts: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload.newProducts;
      state.pageNumber = action.payload.newPageNumber;
      state.fetching = action.payload.newFetching;
      state.totalProducts = action.payload.newTotalProducts;
    },
  },
});

export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;
