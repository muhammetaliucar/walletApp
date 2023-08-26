import { Alert, ScrollView, Text } from "react-native";
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
import { PRIMARY_COLOR } from "../styles";
import I18n from "../languages/i18n";
import * as StoreReview from "expo-store-review";

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
    Alert.alert(I18n.t("warning"), I18n.t("deleteDataText"), [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: handleDeleteData },
    ]);
  };

  const openBrowser = async (link: string) => {
    try {
      await WebBrowser.openBrowserAsync(link);
    } catch (error) {
      Alert.alert("Error", "An error occurred while opening the browser.");
    }
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
          text={I18n.t("settings.titles.privacyPolicy")}
          icon={
            <MaterialIcons name="privacy-tip" size={24} color={PRIMARY_COLOR} />
          }
        />
        <SettingsCard
          onPress={() => navigation.navigate("AboutUs")}
          text={I18n.t("settings.titles.aboutUs")}
          icon={
            <MaterialIcons
              name="info-outline"
              size={24}
              color={PRIMARY_COLOR}
            />
          }
        />
        <SettingsCard
          onPress={() => openBrowser("https://www.muhammetaliucar.com")}
          text={I18n.t("settings.titles.createrInfo")}
          icon={
            <MaterialIcons
              name="developer-mode"
              size={24}
              color={PRIMARY_COLOR}
            />
          }
        />
        <SettingsCard
          onPress={handleCurrency}
          icon={
            <Fontisto name="money-symbol" size={24} color={PRIMARY_COLOR} />
          }
          text={I18n.t("settings.titles.currency")}
        />
        <SettingsCard
          onPress={async () => {
            if (await StoreReview.hasAction()) {
              StoreReview.requestReview();
            }
          }}
          text={I18n.t("review")}
          icon={
            <MaterialIcons name="star-rate" size={24} color={PRIMARY_COLOR} />
          }
        />
        <SettingsCard
          onPress={showAlert}
          text={I18n.t("settings.titles.deleteAllData")}
          icon={
            <MaterialIcons
              name="delete-outline"
              size={24}
              color={PRIMARY_COLOR}
            />
          }
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
