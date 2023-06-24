import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useContext, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import UserContext from "../contexts/UserContext";
import Card from "../components/Card";
import FloatButton from "../components/FloatButton";

const Details = () => {
  const route = useRoute();
  const { data } = useContext(UserContext);
  const { date }: any = route.params;

  const filteredData = data.filter((item) => {
    return item.date === date;
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <FlatList
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/noData.jpg")}
              style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height / 3,
                resizeMode: "contain",
              }}
            />
          </View>
        )}
        contentContainerStyle={{
          paddingBottom: 70,
          width: Dimensions.get("window").width,
          alignItems: "center",
        }}
        data={filteredData}
        renderItem={({ item }) => <Card item={item} />}
      />
      <FloatButton data={date} />
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({});
