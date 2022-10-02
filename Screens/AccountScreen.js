import { ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Account from "../components/account/Account";

const AccountScreen = () => {
  const { user } = useSelector((state) => state.user);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      if (!user) {
        navigation.navigate("LoginNav");
      }

      return () => {};
    }, [user])
  );
  const handleLogin = () => {
    navigation.navigate("LoginNav");
  };
  return (
    <>{user ? <Account navigation={navigation} /> : <ActivityIndicator />}</>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: "#40BFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 343,
    width: "100%",
  },
  signInButtonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
});
