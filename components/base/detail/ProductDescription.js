import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProductDescription = () => {
  return (
    <View style={styles.productDescription}>
      <Text style={styles.specification}>Specification</Text>
      <View style={styles.typeBox}>
        <Text style={styles.shown}>Shown:</Text>

        <Text style={styles.type}>
          Laser Blue/Anthracite/Watermelon/White/Yellow
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 12, color: "#223263", width: "50%" }}>
          Style:
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "#9098B1",
            width: "50%",
            textAlign: "right",
          }}
        >
          s CD0113-400
        </Text>
      </View>
      <Text style={styles.desc}>
        The Nike Air Max 270 React ENG combines a full-length React foam midsole
        with a 270 Max Air unit for unrivaled comfort and a striking visual
        experience.
      </Text>
    </View>
  );
};

export default ProductDescription;

const styles = StyleSheet.create({
  specification: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#223263",
    marginBottom: 12,
  },
  typeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  shown: {
    fontSize: 12,
    color: "#223263",
    width: "50%",
  },
  type: {
    fontSize: 12,
    color: "#9098B1",
    width: "50%",
    textAlign: "right",
    textAlignVertical: "top",
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  desc: {
    fontSize: 12,
    color: "#9098B1",
    lineHeight: 22,
    textAlign: "left",
    letterSpacing: 0.6,
  },
});
