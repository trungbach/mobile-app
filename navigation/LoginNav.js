import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import LoginForm from "../components/auth/LoginForm";
import ResgisterForm from "../components/auth/RegisterForm";

const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Register" component={ResgisterForm} />
    </Stack.Navigator>
  );
};

export default LoginNav;

const styles = StyleSheet.create({});
