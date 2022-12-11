import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../commons/Loading";
import Notifycation from "../../commons/Notifycation";
import { fetchListCartAction } from "../../redux/actions/cartAction";
import { getListShippingAction } from "../../redux/actions/shippingInfoAction";
import { cartAction } from "../../redux/slice/cartSlice";
import orderApi from "../api/orderApi";
import ShippingList from "./ShippingList";
import { useIsFocused } from "@react-navigation/native";

export const ShippingContext = React.createContext();
function Shipping({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { listShipping, isLoading } = useSelector((state) => state.shipping);
  const { listCart, listPayment } = useSelector((state) => state.cart);
  const [currentIdShipping, setCurrenIdShipping] = useState();
  const [messages, setMessages] = useState([]);

  const [orderMomoId, setOrderMomoId] = useState();

  const isFocused = useIsFocused();
  /**
   * Xử lý focus input mỗi khi màn hình được focus:
   * Back về màn cart nếu ko có order nào để thanh toán.
   */
  useEffect(() => {
    if (isFocused) {
      getOrderIdInStore();
    }
  }, [isFocused]);

  async function getOrderIdInStore() {
    const orderMomoId = await SecureStore.getItemAsync("momoOrderId");
    if (!orderMomoId && listPayment.length === 0) {
      navigation.navigate("Your Cart");
    }
    return null;
  }

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
    } else {
      setMessages([
        ...messages,
        {
          content: checkOrderResponse.message,
          color: "red",
        },
      ]);
      await SecureStore.deleteItemAsync("momoOrderId");
    }
  }

  // tim nạp lại order momo id sau mỗi lần truy cập để cập nhật trạng thái order
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

  // xu ly thanh toan
  const handlePayMomo = async () => {
    await getOrderIdInStore();
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
      console.log("orderResponse", orderResponse);
      if (orderResponse.deeplink && orderResponse.orderId) {
        await SecureStore.setItemAsync("momoOrderId", orderResponse.orderId);
        dispatch(cartAction.setListPayment([]));
        dispatch(fetchListCartAction(user?._id)); // lay lai danh sach cart
        await Linking.openURL(orderResponse.deeplink);
      }
    } catch (error) {
      setMessages([
        ...messages,
        {
          content: "Error create Momo order in test environment. Try again.",
          color: "red",
        },
      ]);
      console.log("Error create Momo order:", error);
    }
  };

  const handleConfirmPaid = async () => {
    const orderMomoId = await SecureStore.getItemAsync("momoOrderId");
    console.log("handleConfirmPaid orderMomoId: ", orderMomoId);
    if (!orderMomoId) {
      setMessages([
        ...messages,
        {
          content: "You don't have any successful payment.",
          color: "red",
        },
      ]);
    } else {
      setOrderMomoId(orderMomoId);
    }
  };

  return (
    <View>
      <Notifycation messages={messages} setMessages={setMessages} style={{ zIndex: 1 }} />
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
              <TouchableOpacity onPress={() => handleConfirmPaid()} style={styles.actionButton}>
                <Text style={styles.textAction}>Confirm you have paid</Text>
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
    marginBottom: 10,
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
