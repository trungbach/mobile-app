import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../base/Header";
import CustomInput from "../../login/CustomInput";
import { useIsFocused } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Convert } from "../../../utils/Convert";
import { useSelector } from 'react-redux'

const Email = ({ navigation, route }) => {
    const user = useSelector((state) => state.user.user);
	const [index, setIndex] = useState(1);
	const [emailNew, setEmailNew] = useState();
	const [indexInput, setIndexInput] = useState(10);
    const isFocused = useIsFocused()
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const saveEmail = () =>{
        Convert.saveFieldProfile("email", emailNew, user._id);
    }

    /**
	 * Xử lý focus input mỗi khi màn hình được focus
	 */
	useEffect(() => {
        // TODO fullName truyền từ profile động
		setEmailNew(route?.params?.email);
	}, [isFocused]);

	return (
		<View style={styles.wrapper}>
			<Header style={styles.header} header="Email" haveBack={true}></Header>
			<Text style={styles.label}>Change Email</Text>
            <CustomInput
				index={1}
				setIndexInput={setIndexInput}
				isActive={indexInput === 1}
				setValue={setEmailNew}
				placeholder={"Email"}
                autoFocus={true}
                rule={{ required: "Your email is required" }}
                control={control}
                name="email"
                iconName="mail-outline"
                defaultValue={emailNew}
			></CustomInput>
			<TouchableOpacity
				style={styles.button}
				activeOpacity={0.5}
				onPress={handleSubmit(() => {saveEmail(); navigation.goBack()})}
			>
				<Text style={styles.textButton}>Save</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Email;

const styles = StyleSheet.create({
	wrapper: {
		height: "100%",
		width: "100%",
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		paddingTop: 116,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#223263",
		marginBottom: 12,
	},
	button: {
		marginTop: 16,
		backgroundColor: "#40BFFF",
		width: "100%",
		padding: 16,
		alignItems: "center",
		borderRadius: 5,
		height: 57,
		justifyContent: "center",
		alignContent: "flex-end",
	},
	textButton: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "bold",
	},
});
