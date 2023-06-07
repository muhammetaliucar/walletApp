import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useRoute } from "@react-navigation/native";
import UserContext from "../contexts/UserContext";
import Card from "../components/Card";

const Details = () => {
  const route = useRoute();
  const { data, setData } = useContext(UserContext);

  const filteredData = data.filter((item) => {
    return item.date === route.params.date;
  });

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <FlatList
        contentContainerStyle={{
          paddingBottom: 70,
          width: Dimensions.get("window").width,
          alignItems: "center",
        }}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
