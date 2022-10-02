import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Header from "../../base/Header";
import React, { useState, useRef, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import orderApi from "../../api/orderApi";
import { useSelector } from "react-redux";
import ProductItemV2 from "../../base/ProductItemV2";
import StepIndicator from "react-native-step-indicator";
import { statusOrderEnum } from "../../../commons/enums/status-order.enum";
import { Convert } from "../../../utils/Convert";

const OrderDetail = ({ navigation, route }) => {
  const [order, setOrder] = useState([]);
  const user = useSelector((state) => state.user.user);
  const isFocused = useIsFocused();
  const labels = [
    statusOrderEnum.packing,
    statusOrderEnum.shipping,
    statusOrderEnum.arriving,
    statusOrderEnum.success,
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#40BFFF",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#40BFFF",
    stepStrokeUnFinishedColor: "#EBF0FF",
    separatorFinishedColor: "#40BFFF",
    separatorUnFinishedColor: "#EBF0FF",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#EBF0FF",
    stepIndicatorCurrentColor: "#40BFFF",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fff",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#40BFFF",
  };
  /**
   * Xử lý focus input mỗi khi màn hình được focus
   */
  useEffect(() => {
    // const res = orderApi.getOrderByUserId({user_id: user._id});
    orderet();
  }, [isFocused]);
  const orderet = async () => {
    const res = await orderApi.getOrderDetail(route?.params?.item._id);
    setOrder(res);
  };

  console.log(order?.order_products);
  return (
    <View style={styles.wrapper}>
      <Header header="Order Detail" haveBack={true}></Header>
      <ScrollView>
        <View style={styles.content}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={labels.indexOf(order?.status)}
            labels={labels}
            stepCount={labels?.length}
          />
          <View style={styles.listItemContainTop}>
            <Text style={styles.title}>Product</Text>
            <FlatList
              data={order?.order_products}
              keyExtractor={(item) => `${item?.order_product_item?._id}`}
              renderItem={({ item }) => (
                <ProductItemV2
                  item={{ ...item?.order_product_item }}
                  keyExtractor={(item) => item?.order_product_item?._id}
                ></ProductItemV2>
              )}
            ></FlatList>
            {/* {order?.order_products.map((item, index) => (
              <ProductItemV2
                item={{ ...item?.order_product_item }}
                //   keyExtractor={(item) => item?.order_product_item?._id}
                key={index}
              ></ProductItemV2>
            ))} */}
          </View>
          <View style={styles.listItemContain}>
            <Text style={styles.title}>Shipping Details</Text>
            <View style={styles.shippingDetail}>
              <View style={styles.field}>
                <Text style={styles.label}>Date Shipping</Text>
                <Text style={styles.text}>
                  {Convert.formatDatetime(order.shippedDate)}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>No. Resi</Text>
                <Text style={styles.text}>{order?._id?.substring(0, 16)}</Text>
              </View>
              <View style={styles.fieldBottom}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.text}>
                  {order?.shipping_infomation?.address}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.listItemContain}>
            <Text style={styles.title}>Shipping Details</Text>
            <View style={styles.shippingDetail}>
              <View style={styles.field}>
                <Text
                  style={styles.label}
                >{`Items (${order?.quantity_items})`}</Text>
                <Text style={styles.text}>{`$${order?.total_price}`}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Shipping</Text>
                <Text style={styles.text}>$20</Text>
              </View>
              <View style={styles.fieldBottom}>
                <Text style={styles.labelBold}>Total Price</Text>
                <Text style={styles.textActive}>{`$${
                  order?.total_price + 20
                }`}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    paddingTop: 100,
    // marginBottom: 200,
    // marginBottom: 60,
    paddingBottom: 100,
  },
  content: {
    paddingHorizontal: 16,
    height: "100%",
    justifyContent: "flex-start",
    marginTop: 16,
    marginBottom: 60,
  },
  title: {
    color: "#223263",
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  shippingDetail: {
    paddingHorizontal: 16,
    padding: 16,
    borderColor: "#EBF0FF",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  listItemContainTop: { marginTop: 10, marginBottom: 10 },
  listItemContain: { marginBottom: 10 },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    color: "#223263",
    opacity: 0.5,
  },
  text: {
    color: "#223263",
  },
  labelBold: {
    color: "#223263",
    fontWeight: "bold",
    fontSize: 16,
  },
  textActive: {
    color: "#40BFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  fieldBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
