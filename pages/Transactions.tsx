import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import UserContext from "../contexts/UserContext";
import Card from "../components/Card";
import I18n from "../languages/i18n";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const route = useRoute();
  const { data } = useContext(UserContext);
  const { month } = route.params;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTransactions(
      data
        .sort((a: any, b: any) => b.createdAt - a.createdAt)
        .filter((item: any) => item.date.split("-")[1] === month)
    );
  }, []);

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
    <ScrollView
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      {transactions.length === 0 ? (
        <View style={styles.noContentView}>
          <Text
            style={{
              fontSize: 16,
              color: "#4a4a4a",
            }}
          >
            {I18n.t("noTransactions")}
          </Text>
        </View>
      ) : (
        transactions.map((item: any, index: number) => {
          console.log(item, "item");
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
    </ScrollView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  noContentView: {
    marginTop: 20,
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
});
