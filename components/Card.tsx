import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../contexts/UserContext";
import { monthGenerator } from "../utils/monthGenerator";
import { AntDesign } from "@expo/vector-icons";
import { PRIMARY_COLOR, RED } from "../styles";
import ReactNativeModal from "react-native-modal";

interface Props {
  item: any;
  animatedValue: any;
}

const Card = ({ item, animatedValue }: Props) => {
  const date = monthGenerator(item.date);
  const { currency } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

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
          onLongPress={() => setModalVisible(true)}
          activeOpacity={0.6}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            marginVertical: 10,
            borderColor: "gray",
            backgroundColor: "white",
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
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  width: 150,
                  color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
                }}
              >
                {item.description ? item.description : "No Description"}
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
              {currency}
              {item.total}
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
      {modalVisible && (
        <ReactNativeModal
          isVisible
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          onBackButtonPress={() => {
            setModalVisible(false);
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 6,
              height: "50%",
              paddingHorizontal: 20,

              width: "80%",
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#4a4a",
                paddingBottom: 20,
              }}
            >
              <Text
                style={{
                  fontStyle: "italic",
                  color: "black",
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: 20,
                  marginTop: 20,
                }}
              >
                {item.type}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  color: "gray",
                }}
              >
                {monthGenerator(item.date)}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                paddingBottom: 20,
                borderColor: "#4a4a",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                Note:
              </Text>
              <Text
                numberOfLines={5}
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: "gray",
                }}
              >
                {item.description ? item.description : "No Description"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Total:
              </Text>
              <Text
                style={{
                  color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {item.total}₺
              </Text>
            </View>
          </View>
        </ReactNativeModal>
      )}
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
