import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../store/productsSlise";
import productsPageReducer from "../store/productsPageSlice";
import cartSlise from "./cartSlise";
import ordersSlise from "./ordersSlise";

export default configureStore({
  reducer: {
    products: productsReducer,
    productsPage: productsPageReducer,
    cart: cartSlise,
    orders: ordersSlise,
  },
});
