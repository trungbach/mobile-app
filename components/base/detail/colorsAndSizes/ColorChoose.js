import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ColorBox from "./ColorBox";

const ColorChoose = ({ colors, setColor }) => {
  const [indexColor, setIndexColor] = useState();
  const data =
    colors?.length > 0 ? colors : ["red", "green", "yellow", "black", "blue"];
  return (
    <FlatList
      style={{ marginTop: 20, marginBottom: 20 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => {
            setIndexColor(index);
            setColor(item);
          }}
        >
          <ColorBox isActive={index === indexColor} color={item} key={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
    />
  );
};
export default ColorChoose;

const styles = StyleSheet.create({});
