import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../base/Header";
import { useIsFocused } from "@react-navigation/native";
import { Convert } from "../../../utils/Convert";
import { GenderConstant } from "../../../commons/constants/gender.constant";
import { userAction } from "../../../redux/slice/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAction } from "../../../redux/actions/userActions";
import { unwrapResult } from "@reduxjs/toolkit";
import { Picker } from "@react-native-picker/picker";

const Gender = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const [selectedValue, setSelectedValue] = useState(0);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getIndex = { Nam: 0, Nu: 1, Khac: 2 };
  // const save = async () => {
  //   const userNew = await dispatch(
  //     updateUserAction({
  //       id: user._id,
  //       data: { gender: selectedValue },
  //     })
  //   );
  //   const result = unwrapResult(userNew);
  //   dispatch(userAction.setUser(result));
  //   navigation.goBack();
  // };

  const save = async (data) => {
    try {
      const response = await dispatch(
        updateUserAction({
          id: user._id,
          data: { gender: selectedValue },
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
  // useEffect(() => {
  //   // TODO fullName truyền từ profile động
  //   setSelectedValue(route?.params?.value);
  // }, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <Header style={styles.header} header="Gender" haveBack={true}></Header>
      <Text style={styles.label}>Choose Gender</Text>
      <View style={styles.wrapperPicker}>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {GenderConstant.map((item, index) => (
            <Picker.Item label={item.label} value={item.value} key={index} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={save}
      >
        <Text style={styles.textButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Gender;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 116,
  },
  wrapperPicker: {
    height: 48,
    width: "100%",
    borderWidth: 1,
    borderColor: "#EBF0FF",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
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
