import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Notifycation from "../../commons/Notifycation";
import ProductList from "./../base/ProductList";
import CategoryHome from "./CategoryHome";

const Home = ({ navigation, route }) => {
  const { homeData } = useSelector((state) => state.home);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (route?.params?.paymentSuccess) {
      setMessages([
        ...messages,
        {
          content: "Payment Success",
          color: "green",
          icon: "check-circle",
        },
      ]);
    }
  }, [route]);

  const categoryProducts = homeData.map((item) => ({
    _id: item._id,
    name: item.name,
  }));

  return (
    <View style={styles.homePage}>
      <Notifycation messages={messages} setMessages={setMessages} style={{ zIndex: 1 }} />

      <Pressable
        style={styles.homeSearch}
        onPress={() => {
          navigation.navigate("Search", { clean: true });
        }}
      >
        <View style={styles.searchIcon}>
          <Ionicons name="search" size={16} color="#40BFFF" />
        </View>
        <TextInput placeholder="Search Product" />
      </Pressable>
      <View style={styles.category}>
        <CategoryHome navigation={navigation} types={categoryProducts} />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        data={homeData}
        renderItem={({ item }) => (
          <View>
            <View style={styles.productHeading}>
              <Text style={styles.productName}>{item.name}</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TypeFullProduct", {
                    type: item.name,
                    data: categoryProducts,
                  });
                }}
              >
                <Text style={styles.productSeeMore}>See More</Text>
              </TouchableOpacity>
            </View>
            <ProductList
              navigation={navigation}
              data={item.data}
              horizontal={true}
              btnSeeMore={true}
              id={item?._id}
              type={item.name}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 70,
  },
  homeSearch: {
    flexDirection: "row",
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 8,
  },
  searchIcon: {
    paddingHorizontal: 16,
  },
  category: {},
  productHeading: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productName: {
    fontSize: 17,
    color: "#223263",
    fontWeight: "bold",
  },
  productSeeMore: {
    fontSize: 16,
    color: "#40BFFF",
    fontWeight: "bold",
  },
});
