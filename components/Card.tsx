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
import { FontAwesome5 } from "@expo/vector-icons";
import { monthGenerator } from "../utils/monthGenerator";
import { AntDesign } from "@expo/vector-icons";
import { PRIMARY_COLOR, RED } from "../styles";

interface Props {
  item: any;
  animatedValue: any;
}

const Card = ({ item, animatedValue }: Props) => {
  const date = monthGenerator(item.date);

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
            borderColor: "gray",
            backgroundColor: "white",
            elevation: 5,
            height: 70,
            alignItems: "center",
            width: Dimensions.get("window").width,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                padding: 10,
                borderRadius: 6,
                justifyContent: "center",
              }}
            >
              {item.type === "Revenue" ? (
                <AntDesign name="smileo" size={30} color={PRIMARY_COLOR} />
              ) : (
                <AntDesign name="frowno" size={30} color={RED} />
              )}
            </View>
            <View style={{ marginStart: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
                  marginBottom: 5,
                }}
              >
                {item.type}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
                }}
              >
                Description
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
                marginBottom: 5,
                fontWeight: "bold",
              }}
            >
              ₺{item.total}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
              }}
            >
              {date}
            </Text>
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
    height: 70,
    marginTop: 10,
    // borderRadius: 10,
  },
  editBox: {
    backgroundColor: "#06d6a0",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 70,
    marginTop: 10,
    // borderRadius: 10,
  },
});
