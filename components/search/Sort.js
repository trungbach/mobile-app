import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { SortTextConstant } from "../../commons/constants/sort.constant";
import { SortEnum } from "../../commons/enums/sort.enum";

const Sort = ({ setSortBy, sortBy }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

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
              navigation.navigate("Search");
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Icon style={styles.navigateBack} name="navigate-before"></Icon>
            <Text style={styles.headerText}>Sort by</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          {SortTextConstant.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                // setSortBy(item.enum);
                navigation.navigate("Search", {
                  sort_by: item.enum,
                });
              }}
              style={[
                styles.optionSort,
                item.enum == sortBy && styles.activeOptionSort,
              ]}
              key={index}
            >
              <Text style={styles.textSort}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    height: "100%",
  },
  header: {
    height: 60,
    flexDirection: "row",
    width: "100%",
    borderBottomColor: "#EBF0FF",
    borderBottomWidth: 1,
    position: "absolute",
    paddingBottom: 26,
    alignItems: "flex-end",
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
    paddingTop: 76,
    flex: 1,
  },
  textSort: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#223263",
  },
  optionSort: {
    height: 54,
    width: "100%",
    paddingLeft: 16,
    justifyContent: "center",
  },
  activeOptionSort: {
    backgroundColor: "#EBF0FF",
  },
});
