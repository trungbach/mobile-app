import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../base/Header";
import Field from "./Field";
import { FieldRoleConstant } from "../../commons/constants/field-role.constant";
import Login from "./../login/Login";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/slice/userSlice";

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.wrapper}>
      <Header header="Account"></Header>
      {FieldRoleConstant.map((item, index) => (
        <Field
          key={index}
          label={item.label}
          iconName={item.iconName}
          onPress={async() => {
            if (item.label == "Logout") {
              console.log("logout");
              await SecureStore.deleteItemAsync("token");
              dispatch(userAction.setUser(null));
              
              navigation.navigate("LoginNav");
              return ;
            }
           

            navigation.navigate(item.label);
          }}
        ></Field>
      ))}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    height: "100%",
    paddingTop: 100,
  },
  header: {
    height: 80,
    alignItems: "center",
    flexDirection: "row",
  },
});
