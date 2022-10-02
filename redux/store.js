import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/userSlice";
import { cartReducer } from "./slice/cartSlice";
import { shippingReducer } from "./slice/shippingSlice";
import { homeReducer } from "./slice/homeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    shipping: shippingReducer,
    home: homeReducer,
  },
});
