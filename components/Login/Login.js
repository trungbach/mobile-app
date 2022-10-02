import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, StyleSheet, Text, View } from "react-native";
import { Root } from "react-native-alert-notification";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import InputForm from "../../commons/formHelper/InputForm";
import { loginAction } from "../../redux/actions/userActions";
import { userAction } from "../../redux/slice/userSlice";

const schema = yup
  .object({
    password: yup.string().required().min(6),
    email: yup.string().required().email(),
  })
  .required();

const Login = ({ route, navigation }) => {
  const [toggleVisibilityPassword, setToggleVisibilityPassword] =
    useState(false);
  const dispatch = useDispatch();
  const [err, seterr] = useState();

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(loginAction(data));
      const result = unwrapResult(user);
      dispatch(userAction.setUser(result));
      navigation.navigate("BottomNav", {
        screen: "home",
      });
    } catch (error) {
      seterr(error);
    }
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (route?.params?.email && route?.params?.password) {
      setValue("email", route?.params?.email);
      setValue("password", route?.params?.password);
    }
  }, [route?.params]);

  return (
    <Root>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logoPrimary}
            source={require("../../static/images/Vector_primary.png")}
          />
          <Text style={styles.welcome}>Welcome to SuperShoes</Text>
          <Text style={styles.title}>Sign in to continue</Text>
        </View>
        {err && (
          <View style={styles.boxErr}>
            <Icon style={styles.icon} name="warning" size={20} color="red" />
            <Text style={styles.textErr}>{err}</Text>
          </View>
        )}
        <View style={styles.loginForm}>
          <InputForm
            placeholder="Email"
            iconname="envelope-o"
            name="email"
            control={control}
            errors={errors}
            autofocus={true}
          />
          <InputForm
            placeholder="Password"
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

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.signInButton}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.orBox}>
            <Text style={styles.line}></Text>
            <Text style={styles.or}>OR</Text>
            <Text style={styles.line}></Text>
          </View>
          <TouchableOpacity style={styles.loginWith}>
            <Image
              source={require("../../static/images/login/Google.png")}
              style={styles.socialIconGoogle}
            />
            <Text style={styles.loginWithText}>Login with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginWith}>
            <Image
              source={require("../../static/images/login/Vector.png")}
              style={styles.socialIconFacebook}
            />
            <Text style={styles.loginWithText}>Login with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotPass}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.haveAAccount}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.register}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Root>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  loginForm: {
    width: "100%",
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
