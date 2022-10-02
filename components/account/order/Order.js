import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../../base/Header";
import React, { useState, useRef, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import orderApi from "../../api/orderApi";
import { useSelector } from "react-redux";
import OrderItem from "../../base/OrderItem";

const Order = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.user);
  const isFocused = useIsFocused();

  /**
   * Xử lý focus input mỗi khi màn hình được focus
   */
  useEffect(() => {
    console.log(user._id);
    // const res = orderApi.getOrderByUserId({user_id: user._id});
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
