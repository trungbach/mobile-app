import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import homeApi from "../components/api/homeApi";
import Home from "../components/home/Home";
import { homeAction } from "../redux/slice/homeSlice";
import SplashScreen from "../screens/SplashScreen";
import AccountNav from "./AccountNav";
import CartNav from "./CartNav";
import HomeNav from "./HomeNav";
import SearchNav from "./SearchNav";

const Tab = createBottomTabNavigator();

function BottomNav() {
  const { listCart } = useSelector((state) => state.cart);
  const [homeData, setHomeData] = useState([]); // Mảng type
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchTypes();
  }, []);
  const fetchTypes = async () => {
    try {
      const categoriesResponse = await homeApi.getProductsHome().finally(() => {
        setIsLoading(false);
      });
      dispatch(homeAction.fetchHomeData(categoriesResponse));
    } catch (error) {
      console.log(error);
    }
  };

  return !isLoading ? (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let iconName = route.name;

          if (route.name !== "account")
            return <Ionicons name={iconName} size={28} color={color} />;
          else
            return (
              <MaterialIcons
                name={user ? "account-box" : "login"}
                size={28}
                color={color}
              />
            );
        },
        tabBarActiveTintColor: "#40BFFF",
        tabBarInactiveTintColor: "#9098B1",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: 10,
          paddingBottom: 10,
          height: 65,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeNav}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontSize: 14,
          },
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchNav}
        options={{
          tabBarLabel: "Search",
          tabBarLabelStyle: {
            fontSize: 14,
          },
        }}
      />
      <Tab.Screen
        name="cart"
        component={CartNav}
        options={() =>
          listCart.length > 0
            ? {
                tabBarBadge: listCart.length,
                tabBarLabel: "Cart",
                tabBarLabelStyle: {
                  fontSize: 14,
                },
              }
            : {
                tabBarLabel: "Cart",
                tabBarLabelStyle: {
                  fontSize: 14,
                },
              }
        }
      />
      {user ? (
        <Tab.Screen
          name="account"
          component={AccountNav}
          options={{
            tabBarLabel: "Account",
            tabBarLabelStyle: {
              fontSize: 14,
            },
          }}
        />
      ) : (
        <Tab.Screen
          name="account"
          component={AccountNav}
          options={{
            tabBarLabel: "Login",
            tabBarLabelStyle: {
              fontSize: 14,
            },
          }}
        />
      )}
    </Tab.Navigator>
  ) : (
    <SplashScreen />
  );
}

export default BottomNav;
