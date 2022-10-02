import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartAction,
  updateCartAction,
} from "../../redux/actions/cartAction";
import { cartAction } from "../../redux/slice/cartSlice";
function CartItem({ item }) {
  const { listPayment } = useSelector((state) => state.cart);
  const isSelected =
    listPayment.findIndex((paymentItem) => paymentItem === item?._id) >= 0;
  const dispatch = useDispatch();
  const handleDeleteCart = () => {
    dispatch(deleteCartAction(item?._id));
  };
  const handleAddListPayment = () => {
    if (!isSelected) {
      dispatch(cartAction.addListPayment(item?._id));
    } else {
      dispatch(cartAction.deletePayment(item?._id));
    }
  };
  const handleUpdateQuantity = (num) => {
    if (item?.quantity + num === 0) {
      dispatch(deleteCartAction(item?._id));
    } else {
      dispatch(
        updateCartAction({
          id: item?._id,
          data: { quantity: item?.quantity + num },
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoProduct}>
        <CheckBox
          checked={isSelected}
          onPress={() => handleAddListPayment()}
          co
          style={styles.checkbox}
        />
        <Image
          style={{ height: 72, width: 72, borderRadius: 5 }}
          source={{
            uri: item?.product?.images[0],
          }}
        />
        <View style={styles.wrapInfoText}>
          <View style={styles.wrapNameSize}>
            <Text numberOfLines={1} style={styles.text}>
              {item.product?.name}
            </Text>
            <Text style={styles.text}>
              {item.size} {item?.color}
            </Text>
          </View>
          <Text style={[styles.text, { color: "#40BFFF" }]}>
            ${item?.product?.price}
          </Text>
        </View>
      </View>
      <View style={styles.action}>
        <TouchableOpacity
          onPress={() => handleUpdateQuantity(-1)}
          style={styles.buttonAction}
        >
          <Text style={styles.textButtonAction}>-</Text>
        </TouchableOpacity>
        <View
          style={[{ flex: 1, backgroundColor: "#EBF0FF" }, styles.buttonAction]}
        >
          <Text style={[styles.textButtonAction]}>{item.quantity}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleUpdateQuantity(1)}
          style={styles.buttonAction}
        >
          <Text style={styles.textButtonAction}>+</Text>
        </TouchableOpacity>
      </View>
      <Icon
        onPress={() => handleDeleteCart()}
        style={styles.iconDelete}
        name="trash"
        size={20}
        color="#9098B1"
      />
    </View>
  );
}

export default CartItem;
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: 343,
    height: 104,
    borderColor: "#EBF0FF",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "relative",
  },
  infoProduct: {
    flexDirection: "row",
  },
  wrapInfoText: {
    justifyContent: "space-between",
    marginLeft: 10,
    height: 76,
  },

  wrapNameSize: {
    width: 158,
  },
  text: {
    color: "#223263",
    fontWeight: "bold",
    fontSize: 12,
  },
  action: {
    width: 100,
    height: 24,
    borderColor: "#EBF0FF",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 5,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  buttonAction: {
    width: 30,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textButtonAction: {
    textAlign: "center",
    fontSize: 12,
    color: "grey",
  },
  iconDelete: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  checkbox: {
    alignSelf: "center",
    marginRight: 10,
  },
});
