import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../static/images/Vector.png")}
      />
      <Text style={styles.name}>SuperShoes</Text>
      <ActivityIndicator color="#fff" size={24} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40BFFF",
    zIndex: 2,
    paddingBottom: 70,
    // height: Dimensions.get("screen").height,
    // width: Dimensions.get("screen").width,
  },
  logo: {
    width: 75.35,
    height: 72,
  },
  name: {
    fontSize: 24,
    color: "#fff",
    lineHeight: 36,
    marginTop: 20,
    marginBottom: 12,
  },
});
