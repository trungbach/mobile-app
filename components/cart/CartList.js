import React from "react";
import { FlatList } from "react-native";
import CartItem from "./CartItem";

function CartList({ listCart }) {
  return listCart.map((item) => <CartItem key={item._id} item={item} />);
}

export default CartList;
