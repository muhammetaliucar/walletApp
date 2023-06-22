import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";
import { Fontisto } from "@expo/vector-icons";
import BottomSheet from "../components/BottomSheet";
import CurrencyCard from "../components/CurrencyCard";
import { useIsFocused } from "@react-navigation/native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const currencyData = [
  {
    id: 1,
    currency: "₺ - Turkey Lira",
    value: "₺",
  },
  {
    id: 2,
    currency: "$ - United States Dollar",
    value: "$",
  },
  {
    id: 3,
    currency: "€ - Euro",
    value: "€",
  },
  {
    id: 4,
    currency: "£ - British Pound",
    value: "£",
  },
  {
    id: 5,
    currency: "¥ - Japanese Yen",
    value: "¥",
  },
  {
    id: 6,
    currency: "₹ - Indian Rupee",
    value: "₹",
  },
  {
    id: 7,
    currency: "R - South African Rand",
    value: "R",
  },
];

const Settings = () => {
  const isFocused = useIsFocused();
  const { setData } = useContext(UserContext);
  const currencyBottomSheetRef = useRef(null);
  const handleDeleteData = () => {
    AsyncStorage.clear();
    setData([]);
  };

  useEffect(() => {
    currencyBottomSheetRef.current?.scrollTo(0);
  }, [isFocused]);

  const handleCurrency = () => {
    currencyBottomSheetRef.current?.scrollTo(-SCREEN_HEIGHT / 1);
  };

  const showAlert = () => {
    Alert.alert("WARNING", "Are you sure it will delete all data?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: handleDeleteData },
    ]);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleCurrency}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#f5f5f5",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Fontisto name="money-symbol" size={24} color="black" />
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              color: "black",
            }}
          >
            Currency
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={showAlert}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#f5f5f5",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <MaterialIcons name="delete-outline" size={18} color="black" />
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              color: "black",
            }}
          >
            Delete All Data
          </Text>
        </View>
      </TouchableOpacity>
      <BottomSheet ref={currencyBottomSheetRef}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              marginLeft: 10,
              textAlign: "center",
              color: "black",
              marginBottom: 30,
            }}
          >
            Your current curreny:
          </Text>
          <FlatList
            data={currencyData}
            renderItem={({ item }) => (
              <CurrencyCard
                data={item}
                ref={currencyBottomSheetRef}
                key={item.id}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({});
