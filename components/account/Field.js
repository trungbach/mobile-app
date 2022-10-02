import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Field = ({label, iconName, onPress}) => {
	return (
		<TouchableOpacity onPress={() => onPress()} style={styles.field}>
			<Icon style={styles.icon} name={iconName}></Icon>
            <Text style={styles.label}>{label}</Text>
		</TouchableOpacity>
	);
};

export default Field;

const styles = StyleSheet.create({
	field: {
        flexDirection: "row",
        alignItems: "center",
        height: 56
	},
    icon: {
        fontSize: 30,
        color: "#40BFFF",
        marginHorizontal: 18,
    },
    label: {
        color: "#223263",
        fontSize: 12,
        fontWeight: "bold"
    }
});
