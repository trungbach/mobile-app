import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating";
import WriteReview from "./WriteReview";
import ReviewItem from "./ReviewItem";
import reviewsApi from "../../../api/reviewsApi";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const Review = ({ id, avgVote, setCurrentProduct, currentProduct }) => {
  const [reviews, setReviews] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [avgRate, setAvgRate] = useState(avgVote);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [page, setPage] = useState(1);
  const [isEdited, setIsEdited] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { user } = useSelector((state) => state.user);
  useFocusEffect(
    React.useCallback(() => {
      fetchReviews();

      return () => {};
    }, [page, isAdd, isDelete, isEdited])
  );

  useEffect(() => {
    setCurrentProduct({ ...currentProduct, vote_average: avgRate });
  }, [avgRate]);

  const fetchReviews = async () => {
    try {
      setIsLoadingReview(true);
      const reviewsList = await reviewsApi.getReview(id, page).finally(() => {
        setIsLoadingReview(false);
      });

      setTotalComments(reviewsList.total_comments);
      setReviews(reviewsList.data);
      setAvgRate(reviewsList.vote_average);
    } catch (error) {
      console.log("Get reviews error");
    }
    setIsAdd(false);
    setIsDelete(false);
    setIsEdited(false);
  };
  const handleDelete = () => {
    setIsDelete(true);
    console.log("delete");
  };
  const handleAdd = () => {
    setIsAdd(true);
    console.log("add");
  };

  const _handleEdit = () => {
    setIsEdited(true);
    console.log("edit");
  };

  return (
    <>
      <WriteReview
        id={id}
        reviews={reviews}
        setReviews={setReviews}
        handleAdd={handleAdd}
        isDetail={true}
      />

      <View style={styles.header}>
        <View
          style={{
            marginBottom: 12,
          }}
        >
          <Text style={styles.title}>Review Product</Text>
        </View>
        <View style={styles.rating}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={avgRate}
            starSize={16}
            starStyle={{}}
            fullStarColor={"#FFC833"}
            emptyStarColor={"#EBF0FF"}
          />
          <Text style={styles.avtRating}>{avgRate || 0}</Text>
          <Text style={styles.quantityReview}>{totalComments} Reviews</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setPage((page) => page - 1);
            setIsLoadingReview(true);
          }}
        >
          <Text style={styles.seemoreBtn}>Prev page</Text>
        </TouchableOpacity>
        <Text style={{ color: "#9098B1", fontSize: 14, fontWeight: "bold" }}>
          {page}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setPage((page) => page + 1);
            setIsLoadingReview(true);
          }}
        >
          <Text style={styles.seemoreBtn}>Next page</Text>
        </TouchableOpacity>
      </View>
      {isLoadingReview ? (
        <ActivityIndicator />
      ) : (
        reviews.map((item, index) => {
          return (
            <ReviewItem
              avatar={item.user.avatar}
              key={index}
              fullName={item.user.fullName}
              rating={item.rating}
              content={item.content}
              userId={item.user._id}
              commentId={item._id}
              reviews={reviews}
              setReviews={setReviews}
              _handleDelete={handleDelete}
              _handleEdit={_handleEdit}
              date={item.createdAt}
              id={id}
            />
          );
        })
      )}
    </>
  );
};

export default Review;

const styles = StyleSheet.create({
  header: { marginTop: 24 },
  title: {
    fontSize: 14,
    lineHeight: 21,
    color: "#223263",
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  seemoreBtn: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.5,
    fontWeight: "bold",
    color: "#40BFFF",
  },
  rating: {
    width: 120,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avtRating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#9098B1",
    marginHorizontal: 6,
  },
  quantityReview: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#9098B1",
  },
});
