import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#40BFFF" size={40} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 2,
    paddingBottom: 70,
  },
  logo: {
    width: 75.35,
    height: 72,
  },
  name: {
    fontSize: 24,
    color: "#40BFFF",
    lineHeight: 36,
    marginTop: 20,
    marginBottom: 12,
  },
});
