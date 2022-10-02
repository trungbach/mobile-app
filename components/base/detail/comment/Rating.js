import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

const Rating = ({ rate, setRate }) => {
  const rating = [1, 2, 3, 4, 5];
  const StarRate = () => (
    <MaterialIcons
      name="star"
      size={30}
      color="#FFC833"
      style={{ marginHorizontal: 2 }}
    />
  );
  const StarNoRate = () => (
    <MaterialIcons
      name="star"
      size={30}
      color="#EBF0FF"
      style={{ marginHorizontal: 2 }}
    />
  );
  return (
    <View style={styles.rating}>
      {rating.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => {
            setRate(item);
          }}
        >
          {item <= rate ? <StarRate /> : <StarNoRate />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  rating: {
    width: "100%",
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
