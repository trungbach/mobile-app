import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "../components/login/Login";
import ResgisterForm from "../components/login/ResgisterForm";
import {
  ALERT_TYPE, Root,
  Toast
} from "react-native-alert-notification";

const LoginScreen = ({ navigation }) => {
  return (
    // <Login navigation={navigation} />;
   <View   >
      <ResgisterForm />
   </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
