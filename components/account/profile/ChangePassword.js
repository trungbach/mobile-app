import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../../redux/actions/userActions";
import Header from "../../base/Header";
import CustomInput from "../../auth/CustomInput";

const ChangePassword = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const [index, setIndex] = useState(1);
  const [indexInput, setIndexInput] = useState(10);
  const [err, seterr] = useState();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const save = async (data) => {
    try {
      if (data.oldPassword !== user.password) {
        seterr("Old password is not correct");
      } else if (data.newPassword !== data.confirmPassword) {
        seterr("Confirm new password not match");
      } else {
        const response = await dispatch(
          updateUserAction({
            id: user._id,
            data: { password: data.newPassword },
          })
        );
        const userNew = unwrapResult(response);
        console.log("userNew", userNew);
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header style={styles.header} header="ChangePassword" haveBack={true}></Header>
      {err && (
        <View style={styles.boxErr}>
          <Icon style={styles.icon} name="warning" size={20} color="red" />
          <Text style={styles.textErr}>{err}</Text>
        </View>
      )}

      <Text style={styles.label}>Old Password</Text>
      <CustomInput
        index={index}
        setIndexInput={setIndexInput}
        isActive={indexInput === index}
        placeholder={"Old password"}
        autoFocus={true}
        control={control}
        rule={{
          required: "Old password is required",
          minLength: {
            value: 6,
            message: "Old password should be minimum 6 characters long",
          },
        }}
        name="oldPassword"
        iconName="lock-outline"
        isHaveVisibility={true}
      ></CustomInput>
      <Text style={styles.label}>New Password</Text>
      <CustomInput
        index={index}
        setIndexInput={setIndexInput}
        isActive={indexInput === index}
        placeholder={"New password"}
        rule={{
          required: "New password is required",
          minLength: {
            value: 6,
            message: "New password should be minimum 6 characters long",
          },
        }}
        control={control}
        name="newPassword"
        iconName="lock-outline"
        isHaveVisibility={true}
      ></CustomInput>
      <Text style={styles.label}>New Password Again</Text>
      <CustomInput
        rule={{
          required: "New password again is required",
          minLength: {
            value: 6,
            message: "New password again should be minimum 6 characters long",
          },
        }}
        index={index}
        setIndexInput={setIndexInput}
        isActive={indexInput === index}
        placeholder={"New password again"}
        control={control}
        name="confirmPassword"
        iconName="lock-outline"
        isHaveVisibility={true}
      ></CustomInput>
      <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={handleSubmit(save)}>
        <Text style={styles.textButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 116,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#223263",
    marginBottom: 12,
  },
  boxErr: {
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textErr: {
    color: "red",
    marginLeft: 10,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#40BFFF",
    width: "100%",
    padding: 16,
    alignItems: "center",
    borderRadius: 5,
    height: 57,
    justifyContent: "center",
    alignContent: "flex-end",
  },
  textButton: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
