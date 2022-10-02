import { useIsFocused, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PopupNoti from "../base/PopupNoti";
import ProductList from "../base/ProductList";

export default function SearchModel({ visible, data, reloadScreen }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused(false);
  // Nếu chưa gõ search
  if (!visible) return <Text></Text>;

  const onPress = () => navigation.navigate("home");
  const button = { title: "Back to Home", onPress: onPress };
  return (
    <View style={styles.model}>
      <View>
        <Text style={styles.text}>
          {(data && data.total_products > 0 ? data.total_products : 0) +
            " Kết quả"}
        </Text>
      </View>
      {data && data.total_products == 0 ? (
        <View>
          <PopupNoti
            content={"Thank you for shopping using suppershoes"}
            header={"Product Not Found"}
            button={button}
            icon={{ name: "close" }}
          ></PopupNoti>
        </View>
      ) : (
        <ProductList
          data={data && data.data ? data.data : []}
          btnSeeMore={false}
          horizontal={false}
          type={"Nike"}
          header={false}
        ></ProductList>
      )}
    </View>
  );
  // );
}
const styles = StyleSheet.create({
  model: {
    paddingTop: 10,
    flex: 1,
    paddingBottom: 10,
  },
  text: {
    color: "#40BFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
