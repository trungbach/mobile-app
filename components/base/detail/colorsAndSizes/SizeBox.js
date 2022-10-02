import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SizeBox = ({ isActive, num }) => {
  return (
    <View style={isActive ? styles.sizeBoxActive : styles.sizeBox}>
      <Text style={isActive ? styles.sizeNumActive : styles.sizeNum}>
        {num}
      </Text>
    </View>
  );
};
export default SizeBox;
const styles = StyleSheet.create({
  sizeBox: {
    width: 48,
    height: 48,
    borderRadius: 66,
    backgroundColor: "#fff",
    borderColor: "#EBF0FF",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  sizeBoxActive: {
    width: 48,
    height: 48,
    borderRadius: 66,
    backgroundColor: "#fff",
    borderColor: "#40BFFF",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  sizeNum: {
    fontSize: 14,
    color: "#223263",
    fontWeight: "bold",
  },
  sizeNumActive: {
    fontSize: 14,
    color: "#FFC833",
    fontWeight: "bold",
  },
});
