import React, { useContext, useEffect } from "react";
import Home from "../pages/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Stats from "../pages/Stats";
import UserContext from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Settings from "../pages/Settings";
import { Feather } from "@expo/vector-icons";
import "react-native-gesture-handler";
import Details from "../pages/Details";
import NewProcess from "../pages/NewProcess";
import { PRIMARY_COLOR } from "../styles";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { Image } from "react-native";
import AboutUs from "../pages/AboutUs";
import I18n from "../languages/i18n";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigator() {
  const { data, setData, setCurrency, currency } = useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchData = async () => {
    const storageData = await AsyncStorage.getItem("data");
    const currency = await AsyncStorage.getItem("currency");

    if (currency) {
      setCurrency(currency);
    } else {
      setCurrency("$");
    }

    if (storageData) {
      const parsedData = JSON.parse(storageData);
      setData(parsedData);
    }
  };

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setIsLoading(true);
    }, 100);
  }, []);

  if (!isLoading)
    return (
      <View>
        <Image
          source={require("../assets/splash.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );

  const BottomTab = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: PRIMARY_COLOR,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f5f5f5",
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name={I18n.t("bottomBar.home")}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name={I18n.t("bottomBar.stats")}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="stats-chart" size={26} color={color} />
            ),
          }}
          component={Stats}
        />
        <Tab.Screen
          name={I18n.t("bottomBar.settings")}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="settings" size={26} color={color} />
            ),
          }}
          component={Settings}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerTitle: "Rimsin",
          headerStyle: {
            backgroundColor: PRIMARY_COLOR,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen
          options={{
            headerBackTitleVisible: false,
            headerTitle: "Details",

            headerTintColor: "white",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
            },
          }}
          name="Details"
          component={Details}
        />
        <Stack.Screen
          options={{
            headerLeft(props) {
              return (
                <AntDesign
                  {...props}
                  style={{ marginLeft: 10 }}
                  name="close"
                  size={24}
                  color="white"
                />
              );
            },
            headerBackTitleVisible: false,
            headerTitle: "New Process",
            headerTintColor: "white",
            gestureEnabled: true,
            gestureDirection: "vertical",
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
            },
          }}
          name="NewProcess"
          component={NewProcess}
        />
        <Stack.Screen
          options={{
            headerBackTitleVisible: false,
            headerTitle: "About Us",
            headerTintColor: "white",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
            },
          }}
          name="AboutUs"
          component={AboutUs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
