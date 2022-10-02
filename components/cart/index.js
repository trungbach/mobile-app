import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../commons/Loading";
import { fetchListCartAction } from "../../redux/actions/cartAction";
import { cartAction } from "../../redux/slice/cartSlice";
import axiosClient from "../api/axiosClient";
import CartInvoice from "./CartInvoice";
import CartList from "./CartList";
import Notify from "./../../commons/Notifycation";

function Cart() {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { listCart, isLoading } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchListCartAction(user?._id));
  }, [user]);

  const { listPayment } = useSelector((state) => state.cart);

  const totalItems = listPayment.reduce((totalItems, item) => {
    return (
      totalItems + listCart.find((cartItem) => cartItem?._id === item)?.quantity
    );
  }, 0);
  const totalPrice = listPayment.reduce((totalPrice, item) => {
    const currentItem = listCart.find((cartItem) => cartItem?._id === item);
    return totalPrice + currentItem?.product?.price * currentItem?.quantity;
  }, 0);

  const handleCheckOut = () => {
    navigation.navigate("Ship To", {
      quantity_items: totalItems,
      total_price: totalPrice,
      inCart: true,
    });
  };
  const setAllPayment = () => {
    if (listPayment?.length === listCart?.length) {
      dispatch(cartAction.setListPayment([]));
      return;
    }

    let payments = [];
    for (let cartItem of listCart) {
      payments.push(cartItem._id);
    }
    dispatch(cartAction.setListPayment(payments));
  };

  return listCart.length > 0 ? (
    !isLoading ? (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={listPayment.length === listCart.length}
            onPress={() => setAllPayment()}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Select all</Text>
        </View>
        <CartList listCart={listCart} />
        <View style={{ marginTop: 10 }}>
          <CartInvoice totalItems={totalItems} totalPrice={totalPrice} />
          <TouchableOpacity
            onPress={() => handleCheckOut()}
            style={styles.buttonCheckOut}
            disabled={totalItems === 0}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Check Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    ) : (
      <Loading />
    )
  ) : !isLoading ? (
    <View style={styles.noCart}>
      <Text style={styles.titleNocart}>No product in your cart</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ fontSize: 12, color: "#40BFFF" }}>Back to home</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <Loading />
  );
}

export default Cart;
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerCart: {
    height: 70,
    borderBottomColor: "#EBF0FF",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 5,
  },

  title: {
    color: "#223263",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginLeft: -185,
    marginBottom: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 0,
  },
  buttonCheckOut: {
    width: 343,
    height: 57,
    backgroundColor: "#40BFFF",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 10,
  },
  noCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  titleNocart: {
    fontSize: 12,
  },
});
