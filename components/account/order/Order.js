import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import orderApi from "../../api/orderApi";
import Header from "../../base/Header";
import OrderItem from "./OrderItem";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.user);
  const isFocused = useIsFocused();

  /**
   * Xử lý focus input mỗi khi màn hình được focus
   */
  useEffect(() => {
    orderGet();
  }, [isFocused]);

  const orderGet = async () => {
    const res = await orderApi.getOrderByUserId({ user_id: user._id });
    setOrders(res);
  };

  return (
    <View style={styles.wrapper}>
      <Header header="Order" haveBack={true}></Header>
      <View style={styles.content}>
        <FlatList
          data={orders}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({ item }) => <OrderItem item={item}></OrderItem>}
        ></FlatList>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    height: "100%",
    marginTop: 16,
    paddingBottom: 60,
  },
});
