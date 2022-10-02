import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const CustomInput = ({
  index,
  setIndexInput,
  isActive,
  control,
  rule = {},
  name,
  placeholder,
  iconName,
  isHaveVisibility,
  autoFocus,
  defaultValue,
}) => {
  const renderVisibility = () => (
    <Pressable
      onPress={() => {
        setIsVisibility(!isVisibility);
      }}
      style={styles.visibilityIcon}
    >
      {isVisibility ? (
        <MaterialIcons
          name="visibility"
          color={isActive ? "#40BFFF" : "#EBF0FF"}
          size={24}
        />
      ) : (
        <MaterialIcons
          name="visibility-off"
          color={isActive ? "#40BFFF" : "#EBF0FF"}
          size={24}
        />
      )}
    </Pressable>
  );

  const [isVisibility, setIsVisibility] = useState(false);
  return (
    <Controller
      rules={rule}
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              { borderColor: error ? "red" : isActive ? "#40BFFF" : "#EBF0FF" },
              styles.inputBox,
            ]}
          >
            <MaterialIcons
              name={iconName}
              color={isActive ? "#40BFFF" : "#9098B1"}
              size={24}
              style={styles.loginIcon}
            />
            <TextInput
              onFocus={() => setIndexInput(index)}
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#9098B1"
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={isVisibility}
              style={styles.inputText}
              autoFocus={autoFocus}
            />
            {isHaveVisibility ? renderVisibility() : true}
          </View>
          {error ? <Text style={styles.error}>{error.message}</Text> : true}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
  },
  inputText: {
    width: "80%",
  },

  loginIcon: {
    marginRight: 10,
    marginLeft: 6,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
    marginTop: -6,
    alignItems: "stretch",
  },
});
