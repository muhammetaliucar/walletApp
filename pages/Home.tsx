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
import { CalendarData } from "types";

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

  const filteredData = useCallback(
    () =>
      data
        .sort((a: CalendarData, b: CalendarData) => b.createdAt - a.createdAt)
        .filter(
          (item: CalendarData) =>
            item.date.split("-")[1] === monthVisible &&
            item.date.split("-")[0] === yearVisible.toString()
        )
        .slice(0, 3),
    [data, monthVisible]
  );

  const handleProcess = useCallback(() => {
    const revenue = data
      .filter(
        (item: CalendarData) =>
          item.type === "Revenue" &&
          item.date.split("-")[1] === monthVisible &&
          item.date.split("-")[0] === yearVisible.toString()
      )
      .reduce((acc: any, item: any) => {
        return acc + item.total;
      }, 0);
    const expense = data
      .filter(
        (item: any) =>
          item.type === "Expense" &&
          item.date.split("-")[1] === monthVisible &&
          item.date.split("-")[0] === yearVisible.toString()
      )
      .reduce((acc: number, item: CalendarData) => acc + item.total, 0);
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <View
              style={{
                borderWidth: 5,
                borderColor: handleProcess().balance >= 0 ? "#F2BE22" : "red",
                height: 130,
                width: 130,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 130,
              }}
            >
              <Text style={{ alignSelf: "center" }}>Balance</Text>
              <Text numberOfLines={1} style={styles.priceText}>
                {currency}
                {handleProcess().balance.toFixed(
                  handleProcess().balance.toString().length > 3 ? 0 : 2
                )}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 5,
                borderColor: "gray",
                height: 130,
                width: 130,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 130,
              }}
            >
              <Text style={{ alignSelf: "center" }}>Your Goals</Text>
              <Text numberOfLines={1} style={styles.priceText}>
                {currency}
                {handleProcess().balance.toFixed(
                  handleProcess().balance.toString().length > 3 ? 0 : 2
                )}
              </Text>
            </View>
          </View>
          <View style={styles.recentView}>
            <Text style={styles.recentText}>RECENT TRANSACTIONS</Text>
            <AntDesign name="arrowright" size={16} color="black" />
          </View>
          {filteredData().length === 0 ? (
            <View style={styles.noContentView}>
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
            filteredData().map((item: any, index: number) => {
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
                  <Card item={item} />
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginVertical: 10,
  },
  noContentView: {
    marginTop: 20,
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
});
