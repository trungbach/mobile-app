import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
// import { FilterTextConstant } from "../../commons/constants/Filter.constant";
// import { FilterEnum } from "../../commons/enums/Filter.enum";

const Filter = ({ setIsShowFilter, min, max, setMin, setMax }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  /**
   * Xử lý focus input mỗi khi màn hình được focus
   */
  // useEffect(async () => {}, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setMin(null);
              setMax(null);
              setIsShowFilter(false);
            }}
          >
            <Icon
              style={styles.navigateBack}
              name={min === null && max === null ? "navigate-before" : "close"}
            ></Icon>
          </TouchableOpacity>

          <Text style={styles.headerText}>Filter search</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.label}>Price Range</Text>
          <View style={styles.range}>
            <TextInput
              ref={minInputRef}
              autoFocus={true}
              value={min}
              onChangeText={setMin}
              style={[{ ...styles.inputSearch, marginRight: 13 }]}
              placeholder="Min"
            ></TextInput>
            <TextInput
              ref={maxInputRef}
              value={max}
              onChangeText={setMax}
              style={styles.inputSearch}
              placeholder="Max"
            ></TextInput>
          </View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => setIsShowFilter(false)}
          >
            <Text style={styles.textButton}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    height: "100%",
  },
  container: {},
  header: {
    height: "30%",
    width: "100%",
    borderBottomColor: "#EBF0FF",
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#223263",
    marginLeft: 12,
  },
  navigateBack: {
    fontSize: 24,
  },
  body: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  inputSearch: {
    flex: 1,
    color: "#223263",
    fontSize: 12,
    borderColor: "#EBF0FF",
    borderWidth: 1,
    borderRadius: 5,
    height: 48,
    paddingHorizontal: 16,
  },
  range: {
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#223263",
    marginVertical: 16,
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
