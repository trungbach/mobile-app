import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SizeBox from "./SizeBox";

const SizeChoose = ({ sizes,setSize }) => {
  const [indexSize, setIndexSize] = useState();
  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={sizes}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => {
            setIndexSize(index);
            setSize(item);
          }}
        >
          <SizeBox isActive={index === indexSize} num={item} key={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
    />
  );
};
export default SizeChoose;

const styles = StyleSheet.create({});
