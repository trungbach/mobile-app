import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import StarRating from "react-native-star-rating";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import reviewsApi from "../../../api/reviewsApi";

const ReviewItem = ({
  avatar,
  fullName,
  rating,
  content,
  userId,
  commentId,
  reviews,
  setReviews,
  _handleDelete,
  _handleEdit,
  date,
  id,
}) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state?.user);
  const [more, setMore] = useState(false);
  const handleMore = () => {
    setMore(!more);
  };

  const handleEdit = () => {
    navigation.navigate("WriteReview", {
      rating,
      content,
      commentId,
      reviews,
      _handleEdit,
      id,
    });
    setMore(false);
  };

  const handleDelete = async () => {
    // deleteById();

    try {
      await reviewsApi.deleteReview(commentId);
    } catch (error) {
      console.log("Delete Error");
    }
    _handleDelete();
    setMore(false);
  };
  const handleReport = () => {
    setMore(false);
  };

  // const deleteById = () => {
  //   const newReviews = reviews.filter((item) => item._id !== commentId);
  //   setReviews(newReviews);
  // };

  // const handleChange = (id, data) => {
  //   const arrayOfReviews = [...reviews];
  //   arrayOfReviews.forEach((item, index) => {
  //     if (item._id === id) {
  //       arrayOfReviews[index] = data;
  //     }
  //   });
  //   setReviews(arrayOfReviews);
  // };
  return (
    <View style={styles.container}>
      <View style={styles.containerHeading}>
        <Image source={{ uri: avatar }} style={{ width: 40, height: 40 }} />
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.name}>{fullName}</Text>
          <View style={styles.rating}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={rating}
              starSize={16}
              starStyle={{}}
              fullStarColor={"#FFC833"}
              emptyStarColor={"#EBF0FF"}
            />
          </View>
        </View>
      </View>
      <Text style={styles.date}>{`${date.slice(0, 10)}  ${date.slice(
        11,
        19
      )}`}</Text>
      <View style={styles.containerBody}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.commentContainer}>{content}</Text>
          <View>
            <TouchableOpacity onPress={handleMore}>
              <MaterialIcons
                name="more-vert"
                size={24}
                style={{ marginTop: 2 }}
                color="#9098B1"
              />
            </TouchableOpacity>
            <View style={styles.moreBox}>
              {more ? (
                <>
                  {userId === user?._id ? (
                    <View style={styles.moreContainer}>
                      <TouchableOpacity onPress={handleEdit}>
                        <Text style={styles.actionMore}>Edit</Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          borderBottomColor: "#9098B1",
                          borderBottomWidth: 1,
                        }}
                      />
                      <TouchableOpacity onPress={handleDelete}>
                        <Text style={styles.actionMore}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.moreContainer}>
                      <TouchableOpacity onPress={handleReport}>
                        <Text style={styles.actionMore}>Report</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              ) : (
                true
              )}
            </View>
          </View>
        </View>
        <View style={styles.commentImg}>
          <Image
            source={require("../../../../static/images/Adidas/4.webp")}
            style={styles.cmtImgBox}
          />
          <Image
            source={require("../../../../static/images/Adidas/1.webp")}
            style={styles.cmtImgBox}
          />
          <Image
            source={require("../../../../static/images/Adidas/3.webp")}
            style={styles.cmtImgBox}
          />
        </View>
      </View>
      <View style={styles.hr} />
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  containerHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  name: {
    fontSize: 13,
    lineHeight: 21,
    color: "#223263",
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  commentContainer: {
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: 0.5,
    color: "#9098B1",
    width: "80%",
    marginBottom: 12,
  },
  commentImg: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 12,
  },
  cmtImgBox: {
    marginRight: 10,
    borderRadius: 8,
    height: 60,
    width: 60,
  },
  date: {
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
    color: "#9098B1",
  },
  hr: {
    borderBottomColor: "#EBF0FF",
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  moreBox: {
    backgroundColor: "#EBF0FF",
    position: "absolute",
    right: 20,
    top: 5,
    width: 55,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  actionMore: {
    marginVertical: 4,
    marginHorizontal: 5,
  },
});
