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
import UserContext from "../contexts/UserContext"; // UserContext düzgün şekilde import edildi
import { monthGenerator } from "../utils/monthGenerator";
import { AntDesign } from "@expo/vector-icons";
import { EDIT, PRIMARY_COLOR, RED } from "../styles";
import ReactNativeModal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

interface Props {
  item: any;
}

const Card = ({ item }: Props) => {
  const navigation = useNavigation();
  const date = monthGenerator(item.date);
  const { currency } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

  const { data, setData } = useContext(UserContext);
  const leftSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        onPress={() => {
          setData((prev: any) => prev.filter((i: any) => i.id !== item.id));
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

  const rightSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("NewProcess", { item: item });
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
          style={styles.cardContainer}
        >
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              {item.type === "Revenue" ? (
                <AntDesign name="smileo" size={30} color={PRIMARY_COLOR} />
              ) : (
                <AntDesign name="frowno" size={30} color={RED} />
              )}
            </View>
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.itemType,
                  {
                    color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
                  },
                ]}
              >
                {item.type}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.itemDescription,
                  {
                    color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
                  },
                ]}
              >
                {item.description ? item.description : "No Description"}
              </Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text
              style={[
                styles.itemAmount,
                {
                  color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
                },
              ]}
            >
              {currency}
              {item.total}
            </Text>
            <Text
              style={[
                styles.itemDate,
                {
                  color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
                },
              ]}
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
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalSection}>
              <Text style={styles.modalType}>{item.type}</Text>
              <Text style={styles.modalDate}>{monthGenerator(item.date)}</Text>
            </View>
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Note:</Text>
              <Text style={styles.modalDescription}>
                {item.description ? item.description : "No Description"}
              </Text>
            </View>
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Total:</Text>
              <Text
                style={[
                  styles.modalAmount,
                  {
                    color: item.type === "Revenue" ? PRIMARY_COLOR : RED,
                  },
                ]}
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
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 10,
    borderColor: "gray",
    backgroundColor: "white",
    height: 70,
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 6,
    justifyContent: "center",
  },
  textContainer: {
    marginStart: 5,
  },
  itemType: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 12,
    width: 150,
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemAmount: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 12,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 70,
    marginTop: 10,
  },
  editBox: {
    backgroundColor: EDIT,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 70,
    marginTop: 10,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 6,
    height: "50%",
    paddingHorizontal: 20,
    width: "80%",
  },
  modalSection: {
    borderBottomWidth: 1,
    borderColor: "#4a4a",
    paddingBottom: 20,
  },
  modalType: {
    fontStyle: "italic",
    color: "black",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
    marginTop: 20,
  },
  modalDate: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  modalLabel: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
    fontStyle: "italic",
  },
  modalDescription: {
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
  modalAmount: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});
