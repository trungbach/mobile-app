import React from "react";
import {
  ActivityIndicator, Image,
  StyleSheet,
  Text,
  View
} from "react-native";

const Loading = ({fade}) => {
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
  
    // height: Dimensions.get("screen").height,
    // width: Dimensions.get("screen").width,
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
