import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../contexts/UserContext";

interface Props {
  item: any;
  animatedValue: any;
}

const Card = ({ item, animatedValue }: Props) => {
  const { data, setData } = useContext(UserContext);
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        onPress={() => {
          setData((prev) => prev.filter((i) => i.id !== item.id));
          AsyncStorage.setItem(
            "data",
            JSON.stringify(data.filter((i) => i.id !== item.id))
          );
        }}
        activeOpacity={0.6}
      >
        <View style={styles.deleteBox}>
          <Animated.Text
            style={{ transform: [{ scale: scale }], color: "white" }}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        onPress={() => {
          setData((prev) => prev.filter((i) => i.id !== item.id));
          AsyncStorage.setItem(
            "data",
            JSON.stringify(data.filter((i) => i.id !== item.id))
          );
        }}
        activeOpacity={0.6}
      >
        <View style={styles.editBox}>
          <Animated.Text
            style={{ transform: [{ scale: scale }], color: "white" }}
          >
            Edit
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            marginVertical: 10,
            borderRadius: 10,
            borderColor: "gray",
            backgroundColor: item.type === "Revenue" ? "#00bbf2" : "#F5B7B1",
            elevation: 5,
            height: 60,
            alignItems: "center",
            shadowColor: "gray",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            width: Dimensions.get("window").width * 0.9,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>{item.type}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>{item.total}</Text>
            <Text style={{ fontSize: 20, color: "white" }}> ₺</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default Card;

const styles = StyleSheet.create({
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 60,
    marginTop: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  editBox: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 60,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
  },
});
