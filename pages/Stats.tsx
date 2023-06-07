import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import UserContext from "../contexts/UserContext";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
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
const year = new Date().getFullYear();

const Stats = () => {
  const { data: userData } = useContext(UserContext);
  const [chartData, setChartData] = React.useState(0);

  // Verileri aylara göre gruplandırma
  const handleData = () => {
    if (!data) return;

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

    console.log(totalsByMonth);
  };

  const handleRevenue = () => {
    let revenue = 0;
    userData
      .filter(
        (i: { type: string; date: string; total: number }) =>
          i.type === "Revenue"
      )
      .map((i) => {
        if (i.date.split("-")[0] == year) {
          revenue += i.total;
        }
      });
    return revenue;
  };

  useEffect(() => {
    setChartData(handleRevenue());
    handleData();
  }, [userData]);

  const data = {
    labels: months.slice(0, monthsNumber + 1),
    datasets: [
      {
        data: [chartData],
      },
    ],
    legend: ["Revenue"],
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#4a4a4a", width: "100%" }}>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default Stats;
