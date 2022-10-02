import { Dimensions, View } from "react-native";
import { createRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";

import React from "react";
import { Tile } from "react-native-elements";

const CarouselImage = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { width: viewportWidth } = Dimensions.get("window");
  let _carousel = createRef(null);

  const _renderItem = ({ item }) => {
    return (
      <View>
        <Tile
          imageSrc={{
            uri: item,
          }}
          activeOpacity={1}
          featured
          onPress={() => {}}
        />
      </View>
    );
  };

  return (
    <View>
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        autoplay={true}
        loop={true}
        layout={"default"}
        data={data}
        renderItem={_renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: "absolute",
          width: "100%",
          bottom: -60,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#40BFFF",
        }}
        inactiveDotOpacity={0.2}
        inactiveDotScale={1}
      />
    </View>
  );
};

export default CarouselImage;
