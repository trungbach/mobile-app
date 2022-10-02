import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ScrollView,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Config } from "../../config/Config";
import { useNavigation } from "@react-navigation/native";
const PopupNoti = ({ icon, header, content, button }) => {
	return (
		<View style={styles.wrapper}>
			<View style={styles.boxIcon}>
                <Ionicons style={styles.icon} name={icon.name}></Ionicons>
            </View>
			<Text style={styles.header}>{header}</Text>
			<Text style={styles.content}>{content}</Text>

				<TouchableOpacity style={styles.button} activeOpacity={0.5}
					onPress={() => button.onPress()}
				><Text style={styles.text}>{button.title}</Text></TouchableOpacity>
		</View>
	);
};

export default PopupNoti;

const styles = StyleSheet.create({
	wrapper: {
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	},
	boxIcon: {
		width: 72,
		height: 72,
		borderRadius: 50,
		backgroundColor: "#40BFFF",
        alignItems: 'center',
        justifyContent: 'center'
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 16,
		marginBottom: 8,
		color: "#223263",
	},
	content: {
		fontSize: 12,
		color: "#9098B1",
	},
	button: {
		marginTop: 16,
        backgroundColor: "#40BFFF",
        width: "100%",
        padding: 16,
        alignItems: "center",
        borderRadius: 5,
        height: 57,
        justifyContent: "center"
	},
    text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold"
    },
    icon: {
        color: "#fff",
        fontSize: 50,
    }
});
