import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FloatButton = ({ data }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("NewProcess", { selected: data });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={{ fontSize: 30, color: "white" }}>+</Text>
    </TouchableOpacity>
  );
};

export default FloatButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7675A1",
    height: 60,
    width: 60,
    borderRadius: 60,
    marginTop: 20,
    zIndex: 1,
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    right: 20,
    alignItems: "center",
  },
});
