import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SizeChoose from "./SizeChoose";
import ColorChoose from "./ColorChoose";

const ColorsAndSizes = ({ sizes,listColor }) => {
  const colors = listColor  ||  [
    "red",
    "green",
    "yellow",
    "white",
    "black",
    "blue",
  ];
  return (
    <View>
      <View style={styles.selectSizeBox}>
        <Text style={styles.selectSize}>Select Size</Text>
        <SizeChoose data={sizes} />
      </View>
      <View style={styles.selectColorBox}>
        <Text style={styles.selectSize}>Select Color</Text>
        <ColorChoose data={colors} />
      </View>
    </View>
  );
};

export default ColorsAndSizes;

const styles = StyleSheet.create({
  selectSizeBox: { marginBottom: 20 },
  selectSize: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#223263",
    marginBottom: 16,
  },
  selectColorBox: { marginBottom: 20 },
});
