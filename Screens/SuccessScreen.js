import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
function SuccessScreen(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.wrapCheck}>
        <Icon style={styles.iconDelete} name="check" size={30} color="white" />
      </View>
      <Text style={styles.texSuccess}>Success</Text>
      <Text style={styles.text}>Thank you</Text>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.textButtonBack}>Back To Order</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SuccessScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  wrapCheck: {
    width: 72,
    height: 72,
    borderRadius: 72,
    backgroundColor: "#40BFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  texSuccess: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#223263",
    marginBottom: 15,
  },
  text: {
    fontSize: 12,
    color: "#223263",
    marginBottom: 15,
  },
  buttonBack: {
    width: 343,
    height: 57,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40BFFF",
    borderRadius: 5,
  },
  textButtonBack: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
