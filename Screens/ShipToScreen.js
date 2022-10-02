import React from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";
import Shipping from "../components/shipping";

function ShipToScreen({route}) {
  return (
    <View
      style={{
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingBottom: 80,
      }}
    >
      <Shipping inCart={route?.params?.inCart} />
    </View>
  );
}

export default ShipToScreen;
