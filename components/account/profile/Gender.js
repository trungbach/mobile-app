import { Picker } from "@react-native-picker/picker";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { GenderConstant } from "../../../commons/constants/gender.constant";
import { updateUserAction } from "../../../redux/actions/userActions";
import Header from "../../base/Header";

const Gender = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const [selectedValue, setSelectedValue] = useState(0);
  const dispatch = useDispatch();

  const save = async () => {
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

  return (
    <View style={styles.wrapper}>
      <Header style={styles.header} header="Gender" haveBack={true}></Header>
      <Text style={styles.label}>Choose Gender</Text>
      <View style={styles.wrapperPicker}>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {GenderConstant.map((item, index) => (
            <Picker.Item label={item.label} value={item.value} key={index} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={save}>
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
