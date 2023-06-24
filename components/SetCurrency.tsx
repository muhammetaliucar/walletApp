import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import CurrencyCard from "./CurrencyCard";

interface Props {
  currencyData: any;
  currencyBottomSheetRef: any;
}

const SetCurrency = ({ currencyData, currencyBottomSheetRef }: Props) => {
  return (
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
  );
};

export default SetCurrency;

const styles = StyleSheet.create({});
