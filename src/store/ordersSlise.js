import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cleanCart, cleanStateCart } from "./cartSlise";

export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  console.log("get orders");
  try {
    const response = await fetch(
      `https://skillfactory-task.detmir.team/orders?limit=10&page=1`
    );
    const data = await response.json();

    if (response.ok) {
      console.log("OK");
      console.log(data);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const submitOrders = createAsyncThunk(
  "orders/submitOrders",
  async (cart, { dispatch }) => {
    console.log("submit orders", cart);

    try {
      const response = await fetch(
        `https://skillfactory-task.detmir.team/cart/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch(cleanStateCart());
        console.log("CLEAN");
        dispatch(cleanCart());
        console.log("answer orders after Submit", data);
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(submitOrders.fulfilled, (state, action) => {
        console.log("sumbit payload", action.payload);
      });
  },
});

export default orderSlice.reducer;
