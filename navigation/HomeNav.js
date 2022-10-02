import HomeScreen from "./../screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TypeFullProduct from "./../screens/TypeFullProduct";
import Search from "./../components/search/Search";
import ProductDetail from "../components/base/detail/ProductDetail";
import WriteReview from "../components/base/detail/comment/WriteReview";
import LoginNav from "./LoginNav";
const Stacks = createNativeStackNavigator();

function HomeNav() {
  return (
    <Stacks.Navigator screenOptions={{ headerShown: false }}>
      <Stacks.Screen name="Home" component={HomeScreen} />
      <Stacks.Screen name="TypeFullProduct" component={TypeFullProduct} />
      <Stacks.Screen name="ProductDetail" component={ProductDetail} />
      <Stacks.Screen name="WriteReview" component={WriteReview} />
      {/* <Stacks.Screen name="LoginNav" component={LoginNav} /> */}
      <Stacks.Screen name="Search" component={Search} />
    </Stacks.Navigator>
  );
}

export default HomeNav;
