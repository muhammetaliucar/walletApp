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
import ProcessModal from "../components/ProcessModal";

const Details = () => {
  const route = useRoute();
  const { data, setData } = useContext(UserContext);
  const textRef = useRef(null);
  const [selected, setSelected] = React.useState(route.params.date);
  const [modalVisible, setModalVisible] = React.useState(false);

  const filteredData = data.filter((item) => {
    return item.date === route.params.date;
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card item={item} />}
      />
      <FloatButton
        data={selected}
        textRef={textRef}
        setModalVisible={setModalVisible}
      />
      <ProcessModal
        selected={selected}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        textRef={textRef}
      />
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({});
