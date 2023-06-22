import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { RED, SECONDARY_COLOR } from "../styles";

const StatsCard = ({ value, title }) => {
  return (
    <View
      style={{
        backgroundColor: title === "Expense" ? RED : SECONDARY_COLOR,
        borderRadius: 6,
        marginVertical: 30,
        paddingHorizontal: 10,
        width: "45%",
        paddingVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {title === "Revenue" ? (
          <Feather name="arrow-up-left" size={24} color="white" />
        ) : (
          <Feather name="arrow-down-right" size={24} color="white" />
        )}
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </View>

      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        ₺{value}{" "}
      </Text>
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({});
