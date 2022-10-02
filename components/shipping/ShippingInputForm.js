import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function ShippingInputForm({ iconname, placeholder, value,handleChange }) {
  const [borderColor, setBorderColor] = useState("#EBF0FF");

  return (
    <View style={[styles.wrapInput, { borderColor: borderColor }]}>
      <Icon style={styles.icon} name={iconname} size={24} color={borderColor} />
      <TextInput
        value={value}
        onFocus={() => setBorderColor("#40BFFF")}
        onBlur={() => setBorderColor("#9098B1")}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={handleChange}
      />
    </View>
  );
}

export default ShippingInputForm;
const styles = StyleSheet.create({
  wrapInput: {
    width: 343,
    height: 48,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
});
