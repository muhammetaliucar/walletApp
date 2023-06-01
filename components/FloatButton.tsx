import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  textRef: React.MutableRefObject<any>;
}

const FloatButton = ({ setModalVisible, textRef }: Props) => {
  const handlePress = () => {
    setModalVisible(true);
    setTimeout(() => {
      textRef.current.focus();
    }, 100);
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
    zIndex:1,
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
    right: 30,
    alignItems: "center",
  },
});
