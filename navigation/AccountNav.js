import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import Order from "../components/account/order/Order";
import Payment from "../components/account/payment/Payment";
import ChangePassword from "../components/account/profile/ChangePassword";
import Email from "../components/account/profile/Email";
import Gender from "../components/account/profile/Gender";
import Name from "../components/account/profile/Name";
import PhoneNumber from "../components/account/profile/PhoneNumber";
import Profile from "../components/account/profile/Profile";
import OrderDetail from "../components/base/detail/OrderDetail";
import Login from "../components/login/Login";
import AccountScreen from "../screens/AccountScreen";
import ShipToScreen from "../screens/ShipToScreen";

const Stacks = createNativeStackNavigator();

function AccountNav() {
  return (
    <Stacks.Navigator initialRouteName="Account" screenOptions={{ headerShown: false }}>
      <Stacks.Screen name="Account" component={AccountScreen} />
      <Stacks.Screen name="Profile" component={Profile} />
      <Stacks.Screen name="Order" component={Order} />
      {/* <Stacks.Screen name="Address" component={ShipToScreen} /> */}
      <Stacks.Screen
        name="Address"
        component={ShipToScreen}
        options={({ route }) => ({
          title: "Address",
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
          headerStyle: {},
          headerTintColor: "#223263",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#223263",
            fontSize: 16,
          },
        })}
      />
      <Stacks.Screen name="Payment" component={Payment} />
      <Stacks.Screen name="Name" component={Name} />
      <Stacks.Screen name="Gender" component={Gender} />
      <Stacks.Screen name="Email" component={Email} />
      <Stacks.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stacks.Screen name="ChangePassword" component={ChangePassword} />
      <Stacks.Screen name="Login" component={Login} />
      <Stacks.Screen name="OrderDetail" component={OrderDetail} />
    </Stacks.Navigator>
  );
}

export default AccountNav;
