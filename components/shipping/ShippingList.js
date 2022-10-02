import React from "react";
import { FlatList, View } from "react-native";
import ShippingItem from "./ShippingItem";

function ShippingList({
  listShipping,
  setCurrenIdShipping,
  currentIdShipping,
  
}) {
  return (
    <View>
      {listShipping.length > 0 && listShipping.map((item) => (
        <ShippingItem
          key={item._id}
          setCurrenIdShipping={setCurrenIdShipping}
          isSelected={currentIdShipping === item._id}
          item={item}
        />
      ))}
    </View>
  );
}

export default ShippingList;
