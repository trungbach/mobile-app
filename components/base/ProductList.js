import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ScrollView,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import ProductItem from "./ProductItem";
import { Config } from "../../config/Config";
import { useNavigation } from "@react-navigation/native";
const ProductList = ({
	navigation,
	type,
	horizontal = false,
	id,
	data,
	numberColumns = 2,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<View style={styles.nikeProduct}>
			{isLoading ? (
				<ActivityIndicator />
			) : horizontal ? (
				<FlatList
					data={data}
					horizontal={horizontal}
					style={styles.productList}
					showsHorizontalScrollIndicator={!horizontal}
					keyExtractor={(item) => `${item._id}`}
					renderItem={({ item }) => (
							<ProductItem
							item={item}
							type={type}
							keyExtractor={(item) => item.id}
							></ProductItem>
					)}
				></FlatList>
			) : (
				<FlatList
					data={data}
					horizontal={horizontal}
					numColumns={numberColumns}
					style={styles.productList}
					showsHorizontalScrollIndicator={!horizontal}
					keyExtractor={(item) => `${item._id}`}
					renderItem={({ item }) => (
						<ProductItem item={item} type={type}></ProductItem>
					)}
				></FlatList>
			)}
		</View>
	);
};

export default ProductList;

const styles = StyleSheet.create({
	productHeading: {
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	productName: {
		fontSize: 16,
		color: "#223263",
		fontWeight: "bold",
	},
	productSeeMore: {
		fontSize: 16,
		color: "#40BFFF",
		fontWeight: "bold",
	},
	productList: { marginBottom: 20, marginHorizontal: -8 },
});
