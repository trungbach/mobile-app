import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function InputForm({
  iconname,
  placeholder,
  secureTextEntry,
  secondIcon,
  setToggleVisibilityPassword,
  control,
  name,
  errors,
  defaultValue,
  type,
  autofocus = false
}) {
  const [borderColor, setBorderColor] = useState("#EBF0FF");

  return (
    <View>
      <TouchableOpacity
        style={[styles.wrapInput, { borderColor: borderColor }]}
      >
        <Icon
          style={styles.icon}
          name={iconname}
          size={24}
          color={borderColor}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                autofocus={autofocus}
              value={value}
              onFocus={() => setBorderColor("#40BFFF")}
              onBlur={() => setBorderColor("#EBF0FF")}
              style={styles.input}
              placeholder={placeholder}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry}
              defaultValue = {defaultValue}
            />
          )}
          name={name}
          
        />

        {secondIcon && (
          <MaterialIcons
            onPress={() => {
              setToggleVisibilityPassword();
            }}
            name={secondIcon}
            color={borderColor}
            size={24}
          />
        )}
      </TouchableOpacity>
      {errors[name] && (
        <Text style={styles.textErr}>{errors[name]?.message}</Text>
      )}
    </View>
  );
}

export default InputForm;
const styles = StyleSheet.create({
  wrapInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    minWidth: 343,
    marginBottom: 20,
  },
  icon: {
    marginRight: 5,
    width: 30,
  },
  input: {
    flex: 1,
  },
  textErr: {
    marginTop: -15,
    marginBottom: 10,
    fontSize: 10,
    color: "red",
  },
});
