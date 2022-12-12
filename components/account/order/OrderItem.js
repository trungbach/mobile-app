import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Convert } from "../../../utils/Convert";
export default function OrderItem({ item }) {
  const navigation = useNavigation();
  console.log("item", item);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("OrderDetail", { item });
      }}
      style={styles.orderItem}
    >
      <Text style={styles.idOrder}>{item._id}</Text>
      <Text style={[styles.label, { marginTop: 12 }]}>{`Order at : ${Convert.formatDatetimeOrder(
        new Date(item.updatedAt)
      )}`}</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Shipping Status</Text>
        <Text style={styles.text}>{item.status}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Payment Status</Text>
        <Text style={styles.text}>{item.payment_status}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Items</Text>
        <Text style={styles.text}>{`${item.quantity_items}`} </Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.price}>{`${Convert.formatMoney(item.total_price)} VND`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    marginBottom: 16,
    padding: 16,
    height: 201,
    borderColor: "#EBF0FF",
    borderWidth: 1,
    borderRadius: 4,
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  label: {
    color: "#223263",
    opacity: 0.5,
  },
  text: {
    color: "#223263",
  },
  price: {
    color: "#40BFFF",
    fontWeight: "bold",
  },
  idOrder: {
    color: "#223263",
    fontWeight: "bold",
    fontSize: 14,
  },
});
