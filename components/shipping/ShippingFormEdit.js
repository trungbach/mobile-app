import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ShippingInputForm from "./ShippingInputForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputForm from "../../commons/formHelper/InputForm";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { shippingAction } from "../../redux/slice/shippingSlice";
import {
  addShippingAction,
  updateShippingAction,
} from "../../redux/actions/shippingInfoAction";
const phoneRegExp = /^0[0-9]{9}/;
const schema = yup
  .object({
    fullName: yup.string().required(),
    address: yup.string().required().min(5),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  })
  .required();

function ShippingFormEdit({ shippingItem }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { listShipping } = useSelector((state) => state.shipping);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: shippingItem?.fullName || "",
      address: shippingItem?.address || "",
      phoneNumber: shippingItem?.phoneNumber || "",
    },
  });
  const onSubmit = async (data) => {
    console.log("first");
    if (shippingItem) {
      if (!isDirty) {
        navigation.navigate("Ship To", { inCard: true });
      } else {
        await dispatch(updateShippingAction({ id: shippingItem?._id, data }));
        navigation.navigate("Ship To", { inCard: true });
      }
    } else {
      console.log("add");
      const newShipping = {
        ...data,
        user_id: user?._id,
        default: `${listShipping.length === 0 ? true : false}`,
      };
      await dispatch(addShippingAction(newShipping));
      navigation.navigate("Ship To", { inCard: true });
    }
  };

  return (
    <View>
      <InputForm
        placeholder="Full name"
        iconname="user"
        name="fullName"
        control={control}
        errors={errors}
      />
      <InputForm
        placeholder="Address"
        iconname="address-book"
        name="address"
        control={control}
        errors={errors}
      />
      <InputForm
        placeholder="Phone Number"
        iconname="phone-square"
        name="phoneNumber"
        control={control}
        errors={errors}
      />
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonAction}
      >
        <Text style={styles.textAction}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ShippingFormEdit;
const styles = StyleSheet.create({
  wrapInput: {
    width: 343,
    height: 48,
    borderColor: "#EBF0FF",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  buttonAction: {
    width: 343,
    height: 57,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40BFFF",
    borderRadius: 5,
    marginTop: 20,
  },
  textAction: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});
