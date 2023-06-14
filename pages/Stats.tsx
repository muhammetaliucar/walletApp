import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import UserContext from "../contexts/UserContext";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { PRIMARY_COLOR } from "../styles";
import { FontAwesome5 } from "@expo/vector-icons";

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
  };

  const handleRevenue = () => {
    let revenue = [];
    let revenueData = [];
    let total = 0;

    for (let i = 0; i < monthsNumber + 1; i++) {
      const rev = userData
        .filter(
          (item) =>
            item.date.split("-")[1] === (i + 1).toString().padStart(2, "0")
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

  const data = {
    labels: months.slice(0, monthsNumber + 1),
    datasets: [
      {
        data: handleRevenue().revenueData,
      },
    ],
    legend: ["Revenue"],
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
        <View
          style={{
            backgroundColor: "#ff981d",
            borderRadius: 6,
            marginVertical: 30,
            paddingHorizontal: 10,
            width: "45%",
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Revenue
          </Text>
          <FontAwesome5
            name="money-bill-wave"
            size={24}
            color="white"
            style={{
              marginLeft: 10,
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 20,
            }}
          >
            ₺{handleRevenue().total}{" "}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#ff981d",
            borderRadius: 6,
            marginVertical: 30,
            paddingHorizontal: 10,
            width: "45%",
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Expense
          </Text>
          <FontAwesome5
            name="money-bill-wave"
            size={24}
            color="white"
            style={{
              marginLeft: 10,
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 20,
            }}
          >
            ₺{handleRevenue().total}{" "}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 20,
            marginTop: 20,
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
          data={data}
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
        <BarChart
          barWidth={30}
          noOfSections={3}
          isAnimated={true}
          barBorderRadius={4}
          frontColor="lightgray"
          data={chartData}
          width={screenWidth}
          yAxisOffset={0}
          yAxisAtTop={true}
          yAxisLabelPrefix={"₺"}
          yAxisLabelSuffix={"k"}
          yAxisThickness={0}
          xAxisLabelTextStyle={{
            fontSize: 12,
            color: "white",
          }}
          yAxisTextStyle={{
            marginRight: -15,
            fontSize: 12,
            color: "white",
          }}
          xAxisThickness={0}
        />
      </View>
    </ScrollView>
  );
};

export default Stats;
