import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
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

  return <>{user ? <Account navigation={navigation} /> : <ActivityIndicator />}</>;
};

export default AccountScreen;
