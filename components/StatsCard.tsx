import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { RED, REVENUE } from "../styles";
import UserContext from "../contexts/UserContext";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  value: number;
  title: string;
}

const StatsCard = ({ value, title }: Props) => {
  const { currency } = useContext(UserContext);
  return (
    <LinearGradient
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 1.0, y: 1.0 }}
      colors={["rgba(0,0,0,0.8)", "transparent"]}
      style={{
        ...styles.container,
        backgroundColor: title === "Expense" ? RED : REVENUE,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {title === "Revenue" ? (
          <Feather name="arrow-up-left" size={24} color="white" />
        ) : (
          <Feather name="arrow-down-right" size={24} color="white" />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.value}>
        {currency} {value.toFixed(2)}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 14,
          marginLeft: 10,
        }}
      >
        {/* FIXME lang.   */}
        13 process
      </Text>
    </LinearGradient>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  value: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  container: {
    borderRadius: 10,
    marginVertical: 30,
    paddingHorizontal: 10,
    width: 250,
    height: 150,
    marginHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-around",
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});
