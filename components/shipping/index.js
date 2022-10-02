import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useReducer, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../commons/Loading";
import { getListShippingAction } from "../../redux/actions/shippingInfoAction";
import orderApi from "../api/orderApi";
import ShippingList from "./ShippingList";
export const ShippingContext = React.createContext();

function Shipping({ inCart }) {
  const { user } = useSelector((state) => state.user);
  const { listShipping, isLoading } = useSelector((state) => state.shipping);
  const { listCart, listPayment } = useSelector((state) => state.cart);
  const [currentIdShipping, setCurrenIdShipping] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const getListShipping = async () => {
      if (user) {
        await dispatch(getListShippingAction(user._id));
        const defaultShipping = listShipping.find(
          (item) => item?.default === true
        );
        if (defaultShipping) {
          setCurrenIdShipping(defaultShipping._id);
        }
      }
    };
    getListShipping();
  }, [user]);
  // console.log(inCart);

  const handleFinish = async () => {
    const totalItems = listPayment.reduce((totalItems, item) => {
      return (
        totalItems +
        listCart.find((cartItem) => cartItem?._id === item)?.quantity
      );
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
      await orderApi.addOrder(newOrder);

      navigation.navigate("Success");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(inCart);
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
              {/* {inCart && ( */}
              <TouchableOpacity
                onPress={() => handleFinish()}
                style={styles.actionButton}
              >
                <Text style={styles.textAction}>Finish</Text>
              </TouchableOpacity>
              {/* )} */}
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
