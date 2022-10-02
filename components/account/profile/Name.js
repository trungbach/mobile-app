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

const Name = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.user);
  // console.log(user);
  const [index, setIndex] = useState(0);
  //   const [fullNameNew, setFullNameNew] = useState();
  const [indexInput, setIndexInput] = useState(10);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: user.fullName } });
  // console.log(user.user.fullName);
  const save = async (data) => {
    try {
      const response = await dispatch(
        updateUserAction({
          id: user._id,
          data: { fullName: data.name },
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
  //     // TODO fullName truyền từ profile động
  //     setFullNameNew(route?.params?.fullName);
  //   }, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <Header style={styles.header} header="Name" haveBack={true}></Header>
      <Text style={styles.label}>Full Name</Text>
      <CustomInput
        index={1}
        setIndexInput={setIndexInput}
        isActive={indexInput === 1}
        placeholder={"Full Name"}
        autoFocus={true}
        rule={{ required: "Your name is required" }}
        control={control}
        name="name"
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

export default Name;

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
