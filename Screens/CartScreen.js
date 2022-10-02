import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../components/cart";
import { fetchListCartAction } from "../redux/actions/cartAction";

const CartScreen = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      if (!user) {
        navigation.navigate("LoginNav");
      }
      dispatch(fetchListCartAction(user?._id));
      return () => {};
    }, [user])
  );

  return (
    <View
      style={{
        paddingBottom: 80,
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight,

        flex: 1,
      }}
    >
      <Cart />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
