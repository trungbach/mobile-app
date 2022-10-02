import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ColorBox = ({ isActive, color }) => {
  return (
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 66,
        backgroundColor: color,
        marginRight: 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={isActive ? styles.boxActive : styles.boxNormal} />
    </View>
  );
};
export default ColorBox;
const styles = StyleSheet.create({
  boxActive: {
    width: 16,
    height: 16,
    borderRadius: 66,
    backgroundColor: "#fff",
  },
  boxNormal: {},
});
