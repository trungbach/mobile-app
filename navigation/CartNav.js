import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SuccessScreen from "./../screens/SuccessScreen"
import CartScreen from "./../screens/CartScreen";
import ShipToScreen from "./../screens/ShipToScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import EditShipingScreen from "./../screens/EditShipingScreen";

const Stacks = createNativeStackNavigator();
const screens = [
  {
    name: "Your Cart",
    component: CartScreen,
  },
  {
    name: "Ship To",
    component: ShipToScreen,
    headerRight: (navigation) => () =>
      (
        <Icon
          onPress={() =>
            navigation.navigate("Edit shipping", {
              title: "Add shipping information",
            })
          }
          name="plus"
          size={24}
          color="#40BFFF"
        />
      ),
  },
  {
    name: "Success",
    component: SuccessScreen,
  },
  {
    name: "Edit shipping",
    component: EditShipingScreen,
  },
];

function CartNav() {
  const navigation = useNavigation();
  return (
    <Stacks.Navigator initialRouteName="Cart">
      {screens.map((item) => (
        <Stacks.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={({ route }) => ({
            title: route?.params?.title || item?.name,
            headerRight:
              typeof item?.headerRight === "function"
                ? item?.headerRight(navigation)
                : null,
            headerStyle: {},
            headerTintColor: "#223263",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#223263",
              fontSize: 16,
            },
          })}
        />
      ))}
    </Stacks.Navigator>
  );
}

export default CartNav;
