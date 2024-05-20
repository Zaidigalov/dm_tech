import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCart = createAsyncThunk("cart/getCart", async () => {
  console.log("get cart");
  try {
    const response = await fetch(`https://skillfactory-task.detmir.team/cart`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (products, { dispatch }) => {
    console.log("update cart");

    try {
      const response = await fetch(
        `https://skillfactory-task.detmir.team/cart/update`,
        {
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
      //console.log("action.payload.product", action.payload.products);
      state.products = action.payload.products;
    },
    addToCart: (state, action) => {
      state.products.push(action.payload.product);

      state.sum += action.payload.product.product.price;
      //console.log("action.payload.product", action.payload.product);
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
      /* const cartFromServer = action.payload.map((item) => {
        return {
          id: item.product.id,
          quantity: item.quantity,
        };
      }); */
      state.products = action.payload;
      state.sum = action.payload.reduce((sum, item) => {
        const price = item.price || item.product.price;
        const quantity = item.quantity || item.product.quantity;
        return sum + price * quantity;
      }, 0);
      //state.productsDetail = action.payload;
    });
    /* .addCase(updateCart.fulfilled, (state, action) => {
        //console.log("answer aftr update", action.payload);
        const updatedCart = action.payload.map((item) => {
          return {
            id: item.product.id,
            title: item.product.title,
            picture: item.product.picture,
            price: item.product.price,
            description: item.product.description,
            rating: item.product.rating,
            category: item.product.category,
            quantity: item.quantity,
            new: "FROM SERVER",
          };
        });
        //state.products = updatedCart;
      }); */
  },
});

export const { updateStateCart, addToCart, cleanStateCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
