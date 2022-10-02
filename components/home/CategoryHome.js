import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CategoryHome = ({ navigation, types }) => {
  const categoryUrls = [
    {
      name: "Puma",
      url: require("../../static/images/puma.png"),
    },
    {
      name: "Adidas",
      url: require("../../static/images/adidas.png"),
    },
    {
      name: "Vans",
      url: require("../../static/images/vans.png"),
    },
    {
      name: "Nike",
      url: require("../../static/images/nike.png"),
    },
  ];

  return (
    <View style={styles.category}>
      <Text style={styles.heading}>Category</Text>
      <View style={styles.categoryList}>
        {categoryUrls.map((categoryUrl, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => {
              navigation.navigate("TypeFullProduct", {
                type: categoryUrl.name,
                data: types,
              });
            }}
          >
            <View>
              <Image
                style={{ height: 44, width: 44 }}
                source={categoryUrl.url}
              />
            </View>
            <Text style={styles.categoryText}>{categoryUrl.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategoryHome;

const styles = StyleSheet.create({
  category: {
    // flex: 1,
    marginVertical: 8,
  },
  heading: {
    color: "#223263",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  categoryList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 12,
  },
  categoryText: {
    color: "#9098B1",
    textAlign: "center",
    fontSize: 14,
  },
});
