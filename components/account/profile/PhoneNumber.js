import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../base/Header";
import CustomInput from "../../login/CustomInput";
import { useIsFocused } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Convert } from "../../../utils/Convert";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../../redux/slice/userSlice";
import { updateUserAction } from "../../../redux/actions/userActions";
import { unwrapResult } from "@reduxjs/toolkit";

const PhoneNumber = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.user);
  const [index, setIndex] = useState(0);
  const [phoneNumberNew, setPhoneNumberNew] = useState();
  const [indexInput, setIndexInput] = useState(10);
  const isFocused = useIsFocused();
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
  /**
   * Xử lý focus input mỗi khi màn hình được focus
   */
  //   useEffect(() => {
  //     setPhoneNumberNew(route?.params?.value);
  //   }, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <Header
        style={styles.header}
        header="Phone Number"
        haveBack={true}
      ></Header>
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
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={handleSubmit(save)}
      >
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
