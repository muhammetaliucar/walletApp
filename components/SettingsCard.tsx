import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  text: string;
  icon: any;
}

const SettingsCard = ({ onPress, text, icon }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
      }}
    >
      <View
        style={{
          backgroundColor: "#f5f5f5",
          padding: 10,
          borderRadius: 10,
        }}
      >
        {icon}
      </View>
      <View>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 10,
            color: "black",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({});
