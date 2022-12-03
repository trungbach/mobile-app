import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../commons/Loading";
import { fetchListCartAction } from "../../redux/actions/cartAction";
import { getListShippingAction } from "../../redux/actions/shippingInfoAction";
import { cartAction } from "../../redux/slice/cartSlice";
import orderApi from "../api/orderApi";
import ShippingList from "./ShippingList";

export const ShippingContext = React.createContext();
function Shipping({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { listShipping, isLoading } = useSelector((state) => state.shipping);
  const { listCart, listPayment } = useSelector((state) => state.cart);
  const [currentIdShipping, setCurrenIdShipping] = useState();

  const [orderMomoId, setOrderMomoId] = useState();

  async function getOrderId() {
    const orderMomoId = await SecureStore.getItemAsync("momoOrderId");
    setOrderMomoId(orderMomoId);
  }

  async function checkOrderStatus(orderMomoId) {
    console.log("orderMomoId", orderMomoId);
    const checkOrderResponse = await orderApi.checkOrderStatus({ orderId: orderMomoId });
    console.log("checkOrderResponse: ", checkOrderResponse);
    if (checkOrderResponse.resultCode === 0) {
      // order thanh toán thành công
      await SecureStore.deleteItemAsync("momoOrderId");
      navigation.navigate("Home", { paymentSuccess: true });
    }
  }

  useFocusEffect(
    useCallback(() => {
      getOrderId();
      return () => {};
    }, [])
  );

  useEffect(() => {
    if (orderMomoId) {
      checkOrderStatus(orderMomoId);
    }
  }, [orderMomoId]);

  useEffect(() => {
    const getListShipping = async () => {
      if (user) {
        dispatch(getListShippingAction(user._id));
        const defaultShipping = listShipping.find((item) => item?.default === true);
        if (defaultShipping) {
          setCurrenIdShipping(defaultShipping._id);
        }
      }
    };
    getListShipping();
  }, [user]);

  const handlePayMomo = async () => {
    const totalItems = listPayment.reduce((totalItems, item) => {
      return totalItems + listCart.find((cartItem) => cartItem?._id === item)?.quantity;
    }, 0);
    const totalPrice = listPayment.reduce((totalPrice, item) => {
      const currentItem = listCart.find((cartItem) => cartItem?._id === item);
      return totalPrice + currentItem?.product?.price * currentItem?.quantity;
    }, 0);
    const newOrder = {
      user_id: user?._id,
      shipping_infomation: currentIdShipping,
      quantity_items: totalItems,
      total_price: totalPrice,
      orders_id: listPayment,
    };
    try {
      let orderResponse = await orderApi.addOrder(newOrder);
      console.log("orderResponse", JSON.parse(orderResponse));
      orderResponse = JSON.parse(orderResponse);
      if (orderResponse.deeplink && orderResponse.orderId) {
        await SecureStore.setItemAsync("momoOrderId", orderResponse.orderId);
        dispatch(cartAction.setListPayment([]));
        dispatch(fetchListCartAction(user?._id)); // lay lai danh sach cart
        await Linking.openURL(orderResponse.deeplink);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      {listShipping.length > 0 ? (
        !isLoading ? (
          <View contentContainerStyle={styles.container}>
            <ScrollView>
              <ShippingList
                listShipping={listShipping}
                currentIdShipping={currentIdShipping}
                setCurrenIdShipping={setCurrenIdShipping}
              />
              <TouchableOpacity onPress={() => handlePayMomo()} style={styles.actionButton}>
                <Text style={styles.textAction}>Pay</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        ) : (
          <Loading />
        )
      ) : !isLoading ? (
        <View style={styles.noShipping}>
          <Text style={styles.textNoshipping}>
            Chưa có địa chỉ,nhấn vào biểu tượng bên góc trên bên phải để thêm
          </Text>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default Shipping;
const styles = StyleSheet.create({
  container: {},
  actionButton: {
    width: 343,
    height: 57,
    backgroundColor: "#40BFFF",
    borderRadius: 5,
    justifyContent: "center",
  },
  textAction: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  noShipping: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  textNoshipping: {
    textAlign: "center",
    fontSize: 16,
    color: "#223263",
    fontWeight: "bold",
  },
});
