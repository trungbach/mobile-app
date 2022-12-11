import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { SortEnum } from "../../commons/enums/sort.enum";
import Loading from "../../commons/Loading";
import { searchProduct } from "../../redux/actions/searchAction";
import Filter from "./Filter";
import SearchModel from "./SearchModel";
import Sort from "./Sort";

const _ = require("lodash");

const Search = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [notFound, setNotFound] = useState("");
  const [visible, setVisible] = useState(false);
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState(SortEnum.TimeAsc);
  const [preSortBy, setPreSortBy] = useState(SortEnum.TimeAsc);
  const [preMin, setPreMin] = useState(null);
  const [preMax, setPreMax] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const textInputRef = useRef(null);
  const { searchLoading, searchResult } = useSelector((state) => state.home);

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params) {
        setSortBy(route.params.sort_by);
      }
      return () => {};
    }, [route?.params])
  );

  useEffect(() => {
    handleSearch();
  }, [name, sortBy, min, max]);

  /**
   * Xử lý khi input thay đổi
   */
  const handleChange = ({ nativeEvent }) => {
    const { text } = nativeEvent;
    setName(text);
  };

  /**
   * reload lại khi dữ liệu bị thay đổi
   */
  const reloadScreen = function () {
    handleSearch(name);
  };

  /**
   * Gọi api search
   */
  const handleSearch = async () => {
    try {
      dispatch(
        searchProduct({
          name: name,
          sort_by: sortBy,
          min: min,
          max: max,
        })
      );
      setVisible(true);
    } catch (err) {
      setNotFound("Có lỗi xảy ra vui lòng thử lại!");
      console.log(err);
    }
  };

  /**
   * Xử lý focus input mỗi khi màn hình được focus
   */
  useEffect(() => {
    if (preSortBy != sortBy || min != preMin || preMax != max) {
      reloadScreen();
      setPreSortBy(sortBy);
      setPreSortBy(min);
      setPreSortBy(max);
    }
  }, [isShowSort, isShowFilter]);

  return (
    <View style={styles.searchPage}>
      {isShowSort && (
        <Sort
          setIsShowSort={setIsShowSort}
          setSortBy={setSortBy}
          sortBy={sortBy}
          isShowSort={isShowSort}
        ></Sort>
      )}
      {isShowFilter && (
        <Filter
          min={min}
          max={max}
          setMin={setMin}
          setMax={setMax}
          setIsShowFilter={setIsShowFilter}
        ></Filter>
      )}
      <View style={styles.searchBoxAndFilter}>
        <View style={styles.searchBox}>
          <View style={styles.searchIcon}>
            <Ionicons name="search" size={16} color="#40BFFF" />
          </View>
          <TextInput
            ref={textInputRef}
            autoFocus={true}
            value={name}
            onChange={handleChange}
            style={styles.inputSearch}
            placeholder="Search Product"
            clearButtonMode="always"
          />
          {name.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setName("");
              }}
              style={styles.clear}
            >
              <Ionicons style={styles.clearBtn} name="close"></Ionicons>
            </TouchableOpacity>
          )}
        </View>
        {visible && (
          <Icon
            onPress={() => {
              navigation.navigate("Sort");
            }}
            style={styles.sort}
            name="sort-ascending"
          ></Icon>
        )}
        {visible && (
          <Icon
            onPress={() => {
              setIsShowFilter(true);
            }}
            style={styles.filter}
            name="filter-outline"
          ></Icon>
        )}
      </View>
      {!searchLoading ? (
        <SearchModel
          reloadScreen={reloadScreen}
          visible={visible}
          data={searchResult}
          notFound={notFound}
        ></SearchModel>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchPage: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingTop: 50,
    height: "100%",
  },
  searchBox: {
    flexDirection: "row",
    borderColor: "#EBF0FF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 5,
    height: 42,
    flex: 1,
  },
  inputSearch: {
    flex: 1,
    height: "100%",
    fontWeight: "bold",
    color: "#223263",
    fontSize: 12,
  },
  searchIcon: {
    paddingHorizontal: 16,
  },
  clear: {
    height: 30,
    width: 30,
    zIndex: 10,
    position: "absolute",
    right: 16,
  },
  clearBtn: {
    width: 30,
    height: 30,
    fontSize: 30,
    color: "#223263",
    opacity: 0.5,
  },
  searchBoxAndFilter: {
    flexDirection: "row",
    alignItems: "center",
  },
  sort: {
    marginHorizontal: 16,
    fontSize: 24,
    color: "#223263",
    opacity: 0.5,
  },
  filter: {
    fontSize: 24,
    color: "#40BFFF",
  },
});
