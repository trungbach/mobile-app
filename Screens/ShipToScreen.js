import React from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Shipping from "../components/shipping";

function ShipToScreen({ route, navigation }) {
  return (
    <SafeAreaView
      style={{
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <Shipping navigation={navigation} route={route} />
    </SafeAreaView>
  );
}

export default ShipToScreen;
