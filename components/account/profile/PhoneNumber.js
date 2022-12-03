import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../../redux/actions/userActions";
import Header from "../../base/Header";
import CustomInput from "../../login/CustomInput";

const PhoneNumber = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.user);
  const [indexInput, setIndexInput] = useState(10);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { phone: route?.params?.value } });
  const save = async (data) => {
    try {
      const response = await dispatch(
        updateUserAction({
          id: user._id,
          data: { phoneNumber: data.phone },
        })
      );
      const userNew = unwrapResult(response);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header style={styles.header} header="Phone Number" haveBack={true}></Header>
      <Text style={styles.label}>Phone Number</Text>
      <CustomInput
        index={1}
        setIndexInput={setIndexInput}
        isActive={indexInput === 1}
        placeholder={"Phone Number"}
        autoFocus={true}
        rule={{ required: "Your phone number is required" }}
        control={control}
        name="phone"
        iconName="phone-iphone"
      ></CustomInput>
      <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={handleSubmit(save)}>
        <Text style={styles.textButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneNumber;

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
