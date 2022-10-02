import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import homeApi from "../api/homeApi";
import ProductList from "../base/ProductList";

const CategoryProduct = ({ type, horizontal }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData(type._id);
  }, []);
  const fetchData = async (id) => {
    try {
      const res = await homeApi
        .getCategoryId(id)
        .finally(() => setIsLoading(false));

      setData(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ProductList data={data} horizontal={horizontal} type={type.name} />
      )}
    </View>
  );
};

export default CategoryProduct;

const styles = StyleSheet.create({});
