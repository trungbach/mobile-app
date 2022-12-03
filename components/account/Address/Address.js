import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ShipToScreen from "../../../screens/ShipToScreen";
import Header from "../../base/Header";

const Address = () => {
  return (
    <View style={styles.wrapper}>
      <Header header="Address" haveBack={true}></Header>
      <ShipToScreen />
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    height: "100%",
    marginTop: 16,
    paddingBottom: 60,
  },
});
