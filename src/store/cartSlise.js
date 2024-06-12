import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCart = createAsyncThunk("cart/getCart", async () => {
  //console.log("get cart");
  try {
    const response = await fetch(`https://skillfactory-task.detmir.team/cart`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (products, { dispatch }) => {
    try {
      const response = await fetch(
        `https://skillfactory-task.detmir.team/cart/update`,
        {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: products.map((item) => {
              return {
                id: item.product.id,
                quantity: item.quantity,
              };
            }),
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch(updateStateCart({ products }));
        //console.log("updated cart", data);
      } else {
        products.pop();
        dispatch(updateStateCart({ products }));
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const cleanCart = createAsyncThunk("cart/cleanCart", async () => {
  try {
    const response = await fetch(
      `https://skillfactory-task.detmir.team/cart/update`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [],
        }),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    sum: 0,
  },
  reducers: {
    updateStateCart: (state, action) => {
      state.products = action.payload.products;
    },
    addToCart: (state, action) => {
      state.products.push(action.payload.product);
      state.sum += action.payload.product.product.price;
    },
    updateQuantity: (state, action) => {
      state.products = action.payload.products;
      state.sum = action.payload.products.reduce((sum, item) => {
        const price = item.price || item.product.price;
        const quantity = item.quantity || item.product.quantity;
        return sum + price * quantity;
      }, 0);
    },
    cleanStateCart: (state) => {
      state.products = [];
      state.sum = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.products = action.payload;
      state.sum = action.payload.reduce((sum, item) => {
        const price = item.price || item.product.price;
        const quantity = item.quantity || item.product.quantity;
        return sum + price * quantity;
      }, 0);
    });
  },
});

export const { updateStateCart, addToCart, cleanStateCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
