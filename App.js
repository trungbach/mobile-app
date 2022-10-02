import { LogBox, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import AppNav from "./navigation/AppNav";
import { store } from "./redux/store";

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    // <View>
    <Provider store={store}>
      <AppNav style={styles.container} />
    </Provider>

    /* <CategoryNav /> */
    /* </View> */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
