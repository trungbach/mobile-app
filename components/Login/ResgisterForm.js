import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import { useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ALERT_TYPE, Root, Toast } from "react-native-alert-notification";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import InputForm from "../../commons/formHelper/InputForm";
import SelectForm from "../../commons/formHelper/SelectForm";
import { registerAction } from "../../redux/actions/userActions";
import { userAction } from "../../redux/slice/userSlice";

const ResgisterForm = ({ navigation }) => {
  const [toggleVisibilityPassword, setToggleVisibilityPassword] =
    useState(false);
  const [err, seterr] = useState();

  const dispatch = useDispatch();
  const naviagtion = useNavigation();
  const phoneRegExp = /^0[0-9]{9}/;
  const schema = yup
    .object({
      fullName: yup.string().required(),
      address: yup.string().required().min(5),
      email: yup.string().required().email(),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid"),
      password: yup.string().required().min(6),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      gender: yup.string().required(),
    })
    .required();

  const onSubmit = async (data) => {
    const dataSubmit = { ...data };
    delete dataSubmit.confirmPassword;
    try {
      const user = await dispatch(registerAction(dataSubmit));
      const result = unwrapResult(user);
      // dispatch(userAction.setUser(result));
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "SUCCESS",
        textBody: "Successful Registration",
        autoClose: 2000,
      });
      naviagtion.navigate("Login", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      seterr(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  return (
    <Root>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logoPrimary}
            source={require("../../static/images/Vector_primary.png")}
          />
          <Text style={styles.welcome}>Let's Get Started</Text>
          <Text style={styles.title}>Create a new account</Text>
        </View>
        <KeyboardAvoidingView>
          {err && (
            <View style={styles.boxErr}>
              <Icon style={styles.icon} name="warning" size={20} color="red" />
              <Text style={styles.textErr}>{err}</Text>
            </View>
          )}
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

          <InputForm
            placeholder="Email"
            iconname="envelope-o"
            name="email"
            control={control}
            errors={errors}
          />

          <InputForm
            placeholder="password"
            iconname="lock"
            name="password"
            control={control}
            errors={errors}
            secureTextEntry={!toggleVisibilityPassword}
            secondIcon={`${
              toggleVisibilityPassword ? "visibility" : "visibility-off"
            }`}
            setToggleVisibilityPassword={() =>
              setToggleVisibilityPassword(!toggleVisibilityPassword)
            }
          />

          <InputForm
            placeholder="Confirm Password"
            iconname="lock"
            name="confirmPassword"
            control={control}
            errors={errors}
            secureTextEntry={!toggleVisibilityPassword}
            secondIcon={`${
              toggleVisibilityPassword ? "visibility" : "visibility-off"
            }`}
            setToggleVisibilityPassword={() =>
              setToggleVisibilityPassword(!toggleVisibilityPassword)
            }
          />
          <SelectForm
            errors={errors}
            iconname="transgender"
            name="gender"
            control={control}
            items={[
              { label: "Nam", value: "Nam" },
              {
                label: "Nữ",
                value: "Nữ",
              },
            ]}
          />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.signInButton}
          >
            <Text style={styles.signInButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 12,
            }}
          >
            <Text style={styles.haveAAccount}>Have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.register}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Root>
  );
};

export default ResgisterForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 16,
    alignItems: "center",
    paddingBottom: 40,
  },
  header: { alignItems: "center", marginTop: 50, marginBottom: 32 },
  logoPrimary: { width: 75, height: 72, marginBottom: 16 },
  welcome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#223263",
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  title: {
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: 0.5,
    color: "#9098B1",
  },

  visibilityIcon: { marginHorizontal: 10 },
  signInButton: {
    backgroundColor: "#40BFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
  },
  signInButtonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  orBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    marginTop: 12,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#EBF0FF",
    width: "40%",
    height: 20,
  },
  or: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#9098B1",
    height: 40,
    paddingTop: 10,
  },
  loginWith: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#EBF0FF",
    marginBottom: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  socialIconFacebook: { marginLeft: 8, width: 14.3, height: 26 },
  socialIconGoogle: { width: 31.2, height: 31.2 },
  loginWithText: {
    width: "86%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: "#9098B1",
    marginRight: 16,
  },
  forgotPass: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#40BFFF",
    marginTop: 8,
    marginBottom: 5,
  },
  haveAAccount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#9098B1",
    lineHeight: 18,
  },
  register: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#40BFFF",
    lineHeight: 18,
  },
  textErr: {
    fontSize: 10,
    color: "red",
    marginTop: -7,
    marginBottom: 10,
  },
  boxErr: {
    width: 343,
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
});
