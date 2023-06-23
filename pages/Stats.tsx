import {
  Alert,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { LineChart, BarChart } from "react-native-chart-kit";
import UserContext from "../contexts/UserContext";
import StatsCard from "../components/StatsCard";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#fff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const expenseChartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#fff",
  backgroundGradientToOpacity: 0,
  color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`, // White color
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemper",
  "October",
  "November",
  "December",
];

const monthsNumber = new Date().getMonth();

const Stats = () => {
  const { data: userData } = useContext(UserContext);
  const [chartData, setChartData] = React.useState(0);

  // Verileri aylara göre gruplandırma
  const handleData = () => {
    if (!userData) return;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Verileri aylara göre gruplandırma
    const groupedData = {};
    userData.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (year === currentYear && month <= currentMonth) {
        const key = `${year}-${month}`;

        if (groupedData[key]) {
          groupedData[key].push(item);
        } else {
          groupedData[key] = [item];
        }
      }
    });

    // Her ay için type'lara göre toplam hesaplama
    const totalsByMonth = {};
    for (const key in groupedData) {
      const monthData = groupedData[key];
      const totalsByType = {};

      monthData.forEach((item) => {
        const type = item.type;
        const total = item.total || 0;

        if (totalsByType[type]) {
          totalsByType[type] += total;
        } else {
          totalsByType[type] = total;
        }
      });

      totalsByMonth[key] = totalsByType;
    }
  };

  const handleExpense = () => {
    let expense = [];
    let expenseData = [];
    let total = 0;

    for (let i = 0; i < monthsNumber + 1; i++) {
      const exp = userData
        .filter(
          (item) =>
            item.date.split("-")[1] === (i + 1).toString().padStart(2, "0") &&
            item.type === "Expense"
        )
        .reduce((acc, item) => acc + item.total, 0);
      const data = {
        value: exp / 1000,
        label: months[i].slice(0, 3),
        frontColor: "white",
      };
      total += exp;
      const month = exp / 1000;
      expense.push(data);
      expenseData.push(month);
    }
    return { expense, expenseData, total };
  };

  const handleRevenue = () => {
    let revenue = [];
    let revenueData = [];
    let total = 0;

    for (let i = 0; i < monthsNumber + 1; i++) {
      const rev = userData
        .filter(
          (item) =>
            item.date.split("-")[1] === (i + 1).toString().padStart(2, "0") &&
            item.type === "Revenue"
        )
        .reduce((acc, item) => acc + item.total, 0);
      const data = {
        value: rev / 1000,
        label: months[i].slice(0, 3),
        frontColor: "white",
      };
      total += rev;
      const month = rev / 1000;
      revenue.push(data);
      revenueData.push(month);
    }

    return { revenue, revenueData, total };
  };

  useEffect(() => {
    setChartData(handleRevenue().revenue);
    handleData();
  }, [userData]);

  const revenueData = {
    labels: months.slice(0, monthsNumber + 1),
    datasets: [
      {
        data: handleRevenue().revenueData,
      },
    ],
    legend: ["Revenue"],
  };

  const expenseData = {
    labels: months.slice(0, monthsNumber + 1),
    datasets: [
      {
        data: handleExpense().expenseData,
      },
    ],
    legend: ["Expense"],
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          {months[0].slice(0, 3)} - {months[monthsNumber].slice(0, 3)}{" "}
          {new Date().getFullYear()}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <StatsCard title="Revenue" value={handleRevenue().total} />
        <StatsCard title="Expense" value={handleExpense().total} />
      </View>

      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 20,
            marginTop: 10,
          }}
        >
          Revenue
        </Text>
      </View>

      <View
        style={{
          borderRadius: 16,
          backgroundColor: "#ff981d",
          marginHorizontal: 20,
          overflow: "hidden",
          marginVertical: 30,
        }}
      >
        <LineChart
          withInnerLines={false}
          data={revenueData}
          yAxisSuffix="k"
          bezier
          horizontalLabelRotation={30}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 20,
          }}
        >
          Expenses
        </Text>
      </View>
      <View
        style={{
          borderRadius: 16,
          backgroundColor: "#fe3b67",
          marginHorizontal: 20,
          overflow: "hidden",
          marginVertical: 30,
          paddingVertical: 20,
        }}
      >
        <LineChart
          withInnerLines={false}
          data={expenseData}
          yAxisSuffix="k"
          bezier
          horizontalLabelRotation={30}
          width={screenWidth}
          height={220}
          chartConfig={expenseChartConfig}
        />
      </View>
    </ScrollView>
  );
};

export default Stats;
