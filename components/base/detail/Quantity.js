import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function Quantity({ quantity = 0, setQuantity }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quantity : </Text>
      <View style={styles.action}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
        >
          <Text style={styles.textButton}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantity}>
          <Text style={styles.textQuantity}>{quantity}</Text>
        </View>

        <TouchableOpacity
          onPress={() => setQuantity(quantity + 1)}
          style={styles.button}
        >
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Quantity;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -20,
    // backgroundColor:'red'
  },
  action: {
    width: 150,
    height: 30,
    borderColor: "#EBF0FF",
    flexDirection: "row",
    borderRadius: 5,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    width: 50,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40BFFF",
  },
  textButton: {
    color: "white",
  },
  textQuantity: {
    textAlign: "center",
  },
  quantity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#40BFFF",
    borderWidth: 1,
  },
  title: {
    fontSize: 14,
    lineHeight: 21,
    color: "#223263",
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
});
