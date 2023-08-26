import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  data: any;
}

const CurrencyCard = React.forwardRef(({ data }: Props, ref) => {
  const { currency, setCurrency } = useContext(UserContext);

  const handleCurrency = () => {
    ref?.current?.scrollTo(0);
    setTimeout(() => {
      setCurrency(data.value);
    }, 200);
    AsyncStorage.setItem("currency", data.value);
  };

  return (
    <TouchableOpacity onPress={handleCurrency} style={styles.view}>
      <Text style={styles.currencyText}>{data.currency}</Text>
      {data.value === currency && (
        <AntDesign name="check" size={24} color="black" />
      )}
    </TouchableOpacity>
  );
});

export default CurrencyCard;

const styles = StyleSheet.create({
  currencyText: {
    fontSize: 18,
    marginLeft: 10,
    color: "black",
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
