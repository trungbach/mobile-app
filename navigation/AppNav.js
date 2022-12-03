import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchListCartAction } from "../redux/actions/cartAction";
import { getUserbyIdAction } from "../redux/actions/userActions";
import LoginNav from "./LoginNav";
import BottomNav from "./ShopBottomNav";

const Nav = () => {
  const { user } = useSelector((state) => state.user);
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        setToken(token);
        const { _id } = jwt_decode(token);
        dispatch(getUserbyIdAction(_id));
        dispatch(fetchListCartAction(_id));
      } else {
        console.log("Da dang xuat");
      }
    };
    fetchToken();
  }, [token]);

  return (
    <Stack.Navigator
      initialRouteName="BottomNav"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      {!user && <Stack.Screen name="LoginNav" component={LoginNav} />}

      <Stack.Screen name="BottomNav" component={BottomNav} />
    </Stack.Navigator>
  );
};

const AppNav = () => {
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
