import React, { useContext, useEffect } from "react";
import Home from "../pages/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigator() {
  const { data, setData, setCurrency, currency } = useContext(UserContext);

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
  }, []);

  if (!data && !currency) return null;

  const BottomTab = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#00bbf2",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f5f5f5",
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name="Stats"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="stats-chart" size={26} color={color} />
            ),
          }}
          component={Stats}
        />
        <Tab.Screen
          name="Settings"
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
          headerTitle: "Expense Tracker",
          headerStyle: {
            backgroundColor: "#00bbf2",
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
            headerStyle: {
              backgroundColor: "#00bbf2",
            },
          }}
          name="Details"
          component={Details}
        />
        <Stack.Screen
          options={{
            headerBackTitleVisible: false,
            headerTitle: "New Process",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#00bbf2",
            },
          }}
          name="NewProcess"
          component={NewProcess}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
