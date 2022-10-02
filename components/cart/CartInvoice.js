import React from "react";
import { Text, View, StyleSheet } from "react-native";

function CartInvoice({ totalPrice, totalItems }) {
  const shippingPrice = totalItems === 0 ? 0 :20;
  const importCharge =  totalItems === 0 ? 0 :20;
  return (
    <View style={styles.invoice}>
      <View style={styles.invoiceItem}>
        <Text style={styles.invoiceTitle}>{`Item(${totalItems})`}</Text>
        <Text style={styles.invoiceContent}>{totalPrice}</Text>
      </View>
      <View style={styles.invoiceItem}>
        <Text style={styles.invoiceTitle}>Shipping</Text>
        <Text style={styles.invoiceContent}>${shippingPrice}</Text>
      </View>
      <View style={styles.invoiceItem}>
        <Text style={styles.invoiceTitle}>Import charges</Text>
        <Text style={styles.invoiceContent}>${importCharge}</Text>
      </View>
      <View style={[styles.invoiceItem, styles.totalPrice]}>
        <Text
          style={[
            styles.invoiceTitle,
            { fontWeight: "bold", color: "#223263" },
          ]}
        >
          Total Price
        </Text>
        <Text
          style={[
            styles.invoiceContent,
            { fontWeight: "bold", color: "#40BFFF" },
          ]}
        >
          {totalPrice + importCharge + shippingPrice}
        </Text>
      </View>
    </View>
  );
}

export default CartInvoice;
const styles = StyleSheet.create({
  invoice: {
    width: 343,
    padding: 10,
    borderColor: "#EBF0FF",
    borderWidth: 1,
    borderRadius: 5,
  },
  invoiceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  invoiceTitle: {
    color: "#9098B1",
    fontSize: 12,
  },
  invoiceContent: {
    fontSize: 12,
    color: "#223263",
  },
});
