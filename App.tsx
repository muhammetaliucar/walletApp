import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import Header from "./components/HeaderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProcessModal from "./components/ProcessModal";
import FloatButton from "./components/FloatButton";
import CalendarComponent from "./components/CalendarComponent";
import Card from "./components/Card";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const textRef = useRef(null);
  const [monthVisible, setMonthVisible] = useState(new Date().getMonth());
  const [selected, setSelected] = useState(
    new Date().toISOString().slice(0, 10)
  );

  console.log(monthVisible, "monthVisible");
  const [headerSelected, setHeaderSelected] = useState("Revenue");
  const [dateData, setDateDate] = useState<any>([]);

  const fetchData = async () => {
    const data = await AsyncStorage.getItem("data");
    if (data) {
      const parsedData = JSON.parse(data);
      setDateDate(parsedData);
    }
  };

  const filteredData = dateData.filter((item) => {
    return item.date === selected && item.type === headerSelected 
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filteredData.length === 0) {
      setDateDate((prev) => [
        ...prev,
        {
          date: selected,
          revenue: 0,
          expense: 0,
          balance: 0,
        },
      ]);
    }
  }, [selected]);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CalendarComponent
          selected={selected}
          setSelected={setSelected}
          selectedMonth={monthVisible}
          setSelectedMonth={setMonthVisible}
        />
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-around",
            width: Dimensions.get("window").width,
            padding: 10,
          }}
        >
          <Header
            value={headerSelected}
            setValue={setHeaderSelected}
            name={"Revenue"}
          />
          <Header
            value={headerSelected}
            setValue={setHeaderSelected}
            name={"Balance"}
          />
          <Header
            value={headerSelected}
            setValue={(e) => setHeaderSelected(e)}
            name={"Expense"}
          />
        </View>
        <FloatButton setModalVisible={setModalVisible} textRef={textRef} />
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card item={item} animatedValue={animatedValue} />
          )}
        />
      </SafeAreaView>
      <ProcessModal
        setDateData={setDateDate}
        selected={selected}
        dateData={dateData}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        textRef={textRef}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
