import React, { useEffect, useRef, useState } from "react";

import { Animated, Button, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Message = (props) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        backgroundColor: props.message.color,
        padding: 10,
        paddingVertical: 20,
        borderRadius: 4,
        shadowColor: "white",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Icon
          name={props.message.icon}
          size={20}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: "white" }}>{props.message.content}</Text>
      </View>
    </Animated.View>
  );
};

export default ({ messages, setMessages }) => {
  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 45,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        {messages.map((message) => (
          <Message
            key={message}
            message={message}
            onHide={() => {
              setMessages((messages) =>
                messages.filter((currentMessage) => currentMessage !== message)
              );
            }}
          />
        ))}
      </View>
    </>
  );
};
