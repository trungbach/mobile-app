import React, { useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";



/**
 * Item trong list product
 * @param {*} param0
 * @returns
 */
export default function ProductItemV2({ item }) {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => {
			}}
			style={styles.productItem}
		>
            
			<View style={styles.itemImage}>
				<Image
					style={styles.image}
					source={{
						uri:
							item && item.images && item.images.length > 0
								? item.images[0]
								: "https://res.cloudinary.com/thhh/image/upload/v1650387521/mwy0iafro8qz2b8dynad.jpg",
					}}
				/>
			</View>
			<View style={styles.nameAndPrice}>
				<Text style={styles.itemName}>{`${item.name}`}</Text>
                <Text style={styles.itemPrice}>{`$${item.price}`}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
    orderStatusTimeLine:  {

    },
	productItem: {
		marginBottom: 16,
		height: 104,
		width: "100%",
		borderColor: "#EBF0FF",
		borderWidth: 1,
		borderRadius: 4,
		padding: 16,
		flexDirection: "row",
	},
	itemImage: { borderRadius: 5, paddingBottom: 16, width: 72, height: 72 },
	image: {
		height: 72,
		borderRadius: 6,
		width: 72,
		borderColor: "#000",
		borderWidth: 1,
	},
	itemName: {
		color: "#223263",
		fontWeight: "bold",
		marginBottom: 8,
		fontSize: 16,
	},
    nameAndPrice: {
        marginLeft:15,
        justifyContent: "space-between"
    },
    itemPrice: {
        color: "#40BFFF",
        fontWeight: "bold",
      },
});
