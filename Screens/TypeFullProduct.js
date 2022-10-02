import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import CategoryProduct from "../components/home/CategoryProduct";

const TypeFullProduct = ({ navigation, route }) => {
  const { data, type } = route.params;
  const renderProducts = data.map((item, index) => {
    if (item.name === type) {
      return <CategoryProduct type={item} key={index} horizontal={false} />;
    }
  });
  renderProducts;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={styles.goBackBox}
      >
        <MaterialIcons name="arrow-back-ios" style={styles.goBackIcon} />
        <Text style={styles.categoryName}>{route.params.type}</Text>
      </TouchableOpacity>
      <View style={styles.products}>{renderProducts}</View>
    </View>
  );
};

export default TypeFullProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 100,
  },
  goBackBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 70,
    borderBottomColor: "#EBF0FF",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    marginTop: 5,
  },
  goBackIcon: {
    fontSize: 16,
    color: "#9098B1",
  },
  categoryName: {
    fontSize: 17,
    color: "#223263",
    fontWeight: "bold",
    marginLeft: 5,
  },
  products: {
    padding: 16,
  },
});
