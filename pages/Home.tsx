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
import ProcessModal from "../components/ProcessModal";
import FloatButton from "../components/FloatButton";
import CalendarComponent from "../components/CalendarComponent";
import Card from "../components/Card";
import UserContext from "../contexts/UserContext";
import { AntDesign } from "@expo/vector-icons";

export default function Home() {
  const { data } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);
  const textRef = useRef(null);
  const [monthVisible, setMonthVisible] = useState(
    new Date().getMonth().toString().length === 1
      ? `0${new Date().getMonth()}`
      : new Date().getMonth()
  );
  console.log(typeof monthVisible, "monthVisible");
  const [selected, setSelected] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [dateData, setDateDate] = useState<any>([]);

  const filteredData = data
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    })
    .filter((item) => item.date.split("-")[1] === monthVisible)
    .slice(0, 3);

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

  console.log(monthVisible, "monthVisible");

  useEffect(() => {
    handleProcess();
  }, [monthVisible]);

  const handleProcess = () => {
    const revenue = data
      .filter(
        (item) =>
          item.type === "Revenue" && item.date.split("-")[1] === monthVisible
      )
      .reduce((acc, item) => {
        return acc + item.total;
      }, 0);
    const expense = data
      .filter(
        (item) =>
          item.type === "Expense" && item.date.split("-")[1] === monthVisible
      )
      .reduce((acc, item) => acc + item.total, 0);
    const balance = revenue - expense;
    return { revenue, expense, balance };
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: filteredData.length === 0 ? 0 : 80,
          backgroundColor: "#fff",
        }}
      >
        <SafeAreaView style={styles.container}>
          <CalendarComponent
            selected={selected}
            setSelected={setSelected}
            selectedMonth={monthVisible}
            setSelectedMonth={setMonthVisible}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#4a4a4a",
              marginVertical: 20,
            }}
          >
            ₺{handleProcess().balance.toFixed(2)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 14,
              alignSelf: "flex-start",
              marginStart: 20,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
                color: "#4a4a4a",
                marginEnd: 10,
              }}
            >
              RECENT TRANSACTIONS
            </Text>
            <AntDesign name="arrowright" size={16} color="black" />
          </View>
          {filteredData.length === 0 ? (
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
            filteredData.map((item, index) => {
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
                    setDateDate={setDateDate}
                  />
                </Animated.View>
              );
            })
          )}
        </SafeAreaView>
        <ProcessModal
          setDateData={setDateDate}
          selected={selected}
          dateData={dateData}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          textRef={textRef}
        />
      </ScrollView>
      <FloatButton setModalVisible={setModalVisible} textRef={textRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
