import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import CurrencyCard from "./CurrencyCard";
import I18n from "../languages/i18n";

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
          fontSize: 18,
          fontWeight: "500",
          marginLeft: 10,
          color: "black",
          marginBottom: 30,
        }}
      >
        {I18n.t("currency")}
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
