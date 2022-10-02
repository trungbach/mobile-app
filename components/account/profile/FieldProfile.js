import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FieldProfile = ({label, iconName, onPress = () => {}, value, }) => {
	return (
		<TouchableOpacity onPress={() => onPress()} style={styles.field}>
			<MaterialCommunityIcons style={styles.icon} name={iconName}></MaterialCommunityIcons>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{label === "Change Password" ? "*********" : value}</Text>
            {label !== "Email" && <TouchableOpacity  onPress={() => onPress()}>
				<Icon style={styles.navigateNext} name="navigate-next"></Icon>
			</TouchableOpacity>}
		</TouchableOpacity>
	);
};

export default FieldProfile;

const styles = StyleSheet.create({
	field: {
        flexDirection: "row",
        alignItems: "center",
        height: 56,
        marginLeft: -20
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
    }, 
    value: {
        fontSize: 12,
        color: "#9098B1", flex: 1,
        textAlign: "right",
        marginRight: 16
    },
    navigateNext: {
        fontSize: 30,
        color: "#9098B1"
    }
});
