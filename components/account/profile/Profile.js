import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FieldProfileConstant } from "../../../commons/constants/field-profile.constant";
import Header from "../../base/Header";
import FieldProfile from "./FieldProfile";
import { useSelector } from "react-redux";

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  return (
    <View style={styles.wrapper}>
      <Header header="Profile" haveBack={true}></Header>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Name", { fullName: user["fullName"] })
          }
          style={styles.avatarAndName}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: user["avatar"],
            }}
          ></Image>
          <View style={styles.nameAndNickname}>
            <Text style={styles.name}>{user["fullName"]}</Text>
            <Text style={styles.nickname}>{user["address"]}</Text>
          </View>
        </TouchableOpacity>
        <View>
          {FieldProfileConstant.map((item, index) => (
            <FieldProfile
              key={index}
              label={item.label}
              iconName={item.iconName}
              onPress={() =>
                item.field !== "email"
                  ? navigation.navigate(item.component, {
                      value: user[item.field],
                      field: item.field,
                    })
                  : true
              }
              value={user[item.field]}
            ></FieldProfile>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Profile;

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
  },
  avatarAndName: {
    flexDirection: "row",
    alignItems: "center",
    height: 72,
    marginTop: 24,
    marginBottom: 9,
  },
  avatar: {
    height: 72,
    width: 72,
    borderRadius: 50,
    marginRight: 16,
  },
  nameAndNickname: {},
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#223263",
  },
  nickname: {
    color: "#9098B1",
    fontSize: 12,
  },
});
