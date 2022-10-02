import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Rating from "./Rating";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import reviewsApi from "../../../api/reviewsApi";

const WriteComment = ({
  id,
  reviews,
  setReviews,
  handleAdd,
  route,
  isDetail,
}) => {
  const [review, setReview] = useState(isDetail ? "" : route?.params?.content);
  const [rate, setRate] = useState(isDetail ? 0 : route?.params?.rating);
  const { user } = useSelector((state) => state.user);
  const navigation = useNavigation();

  const handleReview = async () => {
    if (user !== null) {
      try {
        await reviewsApi.postReview({
          user_id: user._id,
          product_id: id,
          content: review,
          rating: rate,
        });
      } catch (error) {
        console.log("Add review error");
      }
      handleAdd();
      setRate(0);
      setReview("");
    } else {
      navigation.navigate("LoginNav");
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    navigation.goBack();
    try {
      await reviewsApi.editReview(route?.params?.commentId, {
        content: review,
        rating: rate,
      });
    } catch (error) {
      console.log("Submit error");
    }
    route?.params?._handleEdit();
    setRate(0);
    setReview("");
  };
  return (
    <View style={styles.container}>
      {!isDetail && <View style={{ marginTop: 50 }} />}
      <Rating rate={rate} setRate={setRate} />
      <View style={styles.hr} />
      <TextInput
        style={styles.reviewContainer}
        placeholder="Type your review"
        value={review}
        onChangeText={setReview}
        autoFocus={!isDetail}
      />
      {isDetail ? (
        <TouchableOpacity
          onPress={handleReview}
          style={{
            justifyContent: "center",
            backgroundColor: "#40BFFF",
            borderRadius: 8,
            marginHorizontal: 16,
            marginBottom: 16,
            height: 40,
          }}
        >
          <Text style={styles.reviewBtn}>Review</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={handleCancel}
            style={{
              justifyContent: "center",
              backgroundColor: "#40BFFF",
              borderRadius: 8,
              marginHorizontal: 16,
              marginBottom: 16,
              height: 40,
              width: "40%",
            }}
          >
            <Text style={styles.reviewBtn}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              justifyContent: "center",
              backgroundColor: "#40BFFF",
              borderRadius: 8,
              marginHorizontal: 16,
              marginBottom: 16,
              width: "40%",
              height: 40,
            }}
          >
            <Text style={styles.reviewBtn}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default WriteComment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: "#fff",
  },

  hr: {
    borderBottomColor: "#EBF0FF",
    borderBottomWidth: 1,
    width: 200,
    alignSelf: "center",
  },
  reviewContainer: {
    height: 150,
    backgroundColor: "#EBF0FF",
    margin: 16,
    padding: 10,
    textAlignVertical: "top",
    borderRadius: 8,
  },
  reviewBtn: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
});
