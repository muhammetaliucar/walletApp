import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";

const Settings = () => {
  const { data, setData } = useContext(UserContext);
  const handleDeleteData = () => {
    AsyncStorage.clear();
    setData([]);
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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MaterialIcons name="delete-outline" size={24} color="black" />
      <TouchableOpacity onPress={showAlert}>
        <Text>Delete All Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
