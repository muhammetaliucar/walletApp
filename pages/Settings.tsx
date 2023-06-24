import { Alert, Dimensions, ScrollView, Text } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";
import { Fontisto } from "@expo/vector-icons";
import BottomSheet, { BottomSheetRefProps } from "../components/BottomSheet";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { currencyData } from "../data/currencyData";
import SettingsCard from "../components/SettingsCard";
import SetCurrency from "../components/SetCurrency";
import { SCREEN_HEIGHT, version } from "../constants";

const Settings = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { setData } = useContext(UserContext);
  const currencyBottomSheetRef = useRef<BottomSheetRefProps>(null);

  const handleDeleteData = () => {
    AsyncStorage.clear();
    setData([]);
  };

  useEffect(() => {
    currencyBottomSheetRef?.current?.scrollTo(0);
  }, [isFocused]);

  const handleCurrency = () => {
    currencyBottomSheetRef.current?.scrollTo(-SCREEN_HEIGHT / 1);
  };

  const showAlert = () => {
    Alert.alert("WARNING", "Are you sure it will delete all data?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: handleDeleteData },
    ]);
  };

  const openBrowser = async (link: string) => {
    let result = await WebBrowser.openBrowserAsync(link);
  };

  return (
    <>
      <ScrollView>
        <SettingsCard
          onPress={() =>
            openBrowser(
              "https://www.freeprivacypolicy.com/live/ee8badfc-3fa6-4b47-b582-a752d94e4104"
            )
          }
          text="Privacy Policy"
          icon={<MaterialIcons name="privacy-tip" size={24} color="black" />}
        />
        <SettingsCard
          onPress={() => navigation.navigate("AboutUs")}
          text="About Us"
          icon={<MaterialIcons name="info-outline" size={24} color="black" />}
        />
        <SettingsCard
          onPress={() => openBrowser("https://www.muhammetaliucar.com")}
          text="Creator Info"
          icon={<MaterialIcons name="developer-mode" size={24} color="black" />}
        />
        <SettingsCard
          onPress={handleCurrency}
          icon={<Fontisto name="money-symbol" size={24} color="black" />}
          text="Currency"
        />
        <SettingsCard
          onPress={showAlert}
          text="Delete All Data"
          icon={<MaterialIcons name="delete-outline" size={24} color="black" />}
        />
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "gray",
          }}
        >
          v{version}
        </Text>
      </ScrollView>
      <BottomSheet ref={currencyBottomSheetRef}>
        <SetCurrency
          currencyData={currencyData}
          currencyBottomSheetRef={currencyBottomSheetRef}
        />
      </BottomSheet>
    </>
  );
};

export default Settings;
