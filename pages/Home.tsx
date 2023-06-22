import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  Text,
  ScrollView,
} from "react-native";
import FloatButton from "../components/FloatButton";
import CalendarComponent from "../components/CalendarComponent";
import Card from "../components/Card";
import UserContext from "../contexts/UserContext";
import { AntDesign } from "@expo/vector-icons";

export default function Home() {
  const { data, currency } = useContext(UserContext);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [monthVisible, setMonthVisible] = useState(
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const [yearVisible, setYearVisible] = useState(new Date().getFullYear());
  const [selected, setSelected] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [dateData, setDateData] = useState([]);

  const filteredData = useCallback(
    () =>
      data
        .sort((a, b) => b.createdAt - a.createdAt)
        .filter(
          (item) =>
            item.date.split("-")[1] === monthVisible &&
            item.date.split("-")[0] === yearVisible.toString()
        )
        .slice(0, 3),
    [data, monthVisible]
  );

  const handleProcess = useCallback(() => {
    const revenue = data
      .filter(
        (item) =>
          item.type === "Revenue" &&
          item.date.split("-")[1] === monthVisible &&
          item.date.split("-")[0] === yearVisible.toString()
      )
      .reduce((acc, item) => {
        return acc + item.total;
      }, 0);
    const expense = data
      .filter(
        (item) =>
          item.type === "Expense" &&
          item.date.split("-")[1] === monthVisible &&
          item.date.split("-")[0] === yearVisible.toString()
      )
      .reduce((acc, item) => acc + item.total, 0);
    const balance = revenue - expense;
    return { revenue, expense, balance };
  }, [data, monthVisible]);

  useEffect(() => {
    console.log("animated");
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

  useEffect(() => {
    console.log("selected");
    if (filteredData().length === 0) {
      setDateData((prev) => [
        ...prev,
        {
          date: selected,
          revenue: 0,
          expense: 0,
          balance: 0,
        },
      ]);
    }
  }, [selected, filteredData]);

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: filteredData().length === 0 ? 0 : 80,
          backgroundColor: "#fff",
        }}
      >
        <SafeAreaView style={styles.container}>
          <CalendarComponent
            selected={selected}
            setSelected={setSelected}
            selectedMonth={monthVisible}
            setSelectedMonth={setMonthVisible}
            setYearVisible={setYearVisible}
          />
          <Text style={styles.priceText}>
            {currency}
            {handleProcess().balance.toFixed(2)}
          </Text>
          <View style={styles.recentView}>
            <Text style={styles.recentText}>RECENT TRANSACTIONS</Text>
            <AntDesign name="arrowright" size={16} color="black" />
          </View>
          {filteredData().length === 0 ? (
            <View
              style={{
                marginTop: 20,
                width: Dimensions.get("window").width,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#4a4a4a",
                }}
              >
                No transactions found
              </Text>
            </View>
          ) : (
            filteredData().map((item, index) => {
              return (
                <Animated.View
                  key={index}
                  style={{
                    opacity: animatedValue,
                    transform: [
                      {
                        translateY: animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Card
                    item={item}
                    dateData={dateData}
                    setDateData={setDateData}
                  />
                </Animated.View>
              );
            })
          )}
        </SafeAreaView>
      </ScrollView>
      <FloatButton data={selected} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  recentText: {
    fontSize: 14,
    fontWeight: "300",
    color: "#4a4a4a",
    marginEnd: 10,
  },
  recentView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    alignSelf: "flex-start",
    marginStart: 20,
  },
  priceText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginVertical: 20,
  },
});
