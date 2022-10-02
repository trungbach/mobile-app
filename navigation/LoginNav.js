import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../components/login/Login'
import ResgisterForm from "../components/login/ResgisterForm";

const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={ResgisterForm} />
    </Stack.Navigator>
  );
};

export default LoginNav;

const styles = StyleSheet.create({});
