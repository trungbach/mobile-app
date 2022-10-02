import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Controller } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome";

<RNPickerSelect
  onValueChange={(value) => console.log(value)}
  items={[
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" },
  ]}
/>;

function SelectForm({ control, name, errors, iconname, items }) {
  return (
    <>
      <View style={styles.container}>
        <Icon style={styles.icon} name={iconname} size={24} color="#EBF0FF" />
        <View style={styles.select}>
          <Controller
            control={control}
            render={({ field: { onChange, ...props } }) => (
              <RNPickerSelect
                style={{ inputAndroid: { color: "black" } }}
                {...props}
                onValueChange={(value) => {
                  onChange(value);
                }}
                items={items}
                placeholder={{
                  label: "Gender",
                }}
              />
            )}
            name={name}
          />
        </View>
      </View>
      {errors[name] && (
        <Text style={styles.textErr}>{errors[name]?.message}</Text>
      )}
    </>
  );
}

export default SelectForm;
const styles = StyleSheet.create({
  select: {
    flex: 1,
    marginLeft: 5,
  },
  icon: {},
  container: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "#EBF0FF",
    borderRadius: 5,
    marginBottom: 20,
  },
  textErr: {
    marginTop: -15,
    marginBottom: 10,
    fontSize: 10,
    color: "red",
  },
});
