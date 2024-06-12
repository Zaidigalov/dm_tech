import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cleanCart, cleanStateCart } from "./cartSlise";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async ({ page, itemsOnPage }, { dispatch }) => {
    //console.log("get orders");
    try {
      const response = await fetch(
        `https://skillfactory-task.detmir.team/orders?page=${page}&limit=${itemsOnPage}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.ok) {
        // console.log("data 2", data);
        dispatch(stateOrders({ data, page }));
        dispatch(rememberPage({ page }));
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const submitOrders = createAsyncThunk(
  "orders/submitOrders",
  async (_, { dispatch }) => {
    //console.log("submit orders", cart);
    try {
      const response = await fetch(
        `https://skillfactory-task.detmir.team/cart/submit`,
        {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch(cleanStateCart());
        console.log("CLEAN");
        dispatch(cleanCart());
        dispatch(cleanOrdersState());
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    total: 0,
    visitedPages: [],
  },
  reducers: {
    stateOrders: (state, action) => {
      state.orders.push(action.payload);
      state.total = action.payload.data.meta.total;
    },
    rememberPage: (state, action) => {
      if (!state.visitedPages.includes(action.payload.page)) {
        state.visitedPages.push(action.payload.page);
      }
    },
    cleanOrdersState: (state, action) => {
      state.orders = [];
      state.total = 0;
      state.visitedPages = [];
    },
  },
});

const { stateOrders, rememberPage, cleanOrdersState } = orderSlice.actions;
export default orderSlice.reducer;
