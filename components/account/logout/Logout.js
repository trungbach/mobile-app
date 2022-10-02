import { StyleSheet, Text, View } from "react-native";
import Header from "../../base/Header";

const Logout = ({ navigation }) => {
	return (
		<Header header="Logout" haveBack={true} ></Header>
	);
};

export default Logout;

const styles = StyleSheet.create({
});
