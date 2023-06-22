import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { RED, REVENUE } from "../styles";
import UserContext from "../contexts/UserContext";

interface Props {
  value: number;
  title: string;
}

const StatsCard = ({ value, title }: Props) => {
  const { currency } = useContext(UserContext);
  return (
    <View
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
        {currency} {value}
      </Text>
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  value: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  container: {
    borderRadius: 6,
    marginVertical: 30,
    paddingHorizontal: 10,
    width: "45%",
    paddingVertical: 10,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
