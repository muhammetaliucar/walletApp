import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { version } from "../constants";
import I18n from "../languages/i18n";

const AboutUs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View style={styles.separator}>
        <Text style={styles.description}>{I18n.t("aboutUs")}</Text>
      </View>
      <Text style={styles.developedByText}>
        This app is developed by <Text style={styles.boldText}>Ali Uçar</Text>
        {"\n"}
        designed by <Text style={styles.boldText}> Elif Yıldırım.</Text>
      </Text>
      <Text style={styles.versionText}>Version: {version}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  logo: {
    width: 130,
    height: 130,
    alignSelf: "center",
    marginTop: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 20,
  },
  description: {
    fontSize: 14,
    alignSelf: "center",
    marginTop: 10,
    lineHeight: 20,
    color: "black",
    textAlign: "center",
  },
  developedByText: {
    marginTop: 20,
    alignSelf: "center",
    textAlign: "center",
    lineHeight: 20,
    color: "black",
  },
  boldText: {
    fontWeight: "bold",
  },
  versionText: {
    color: "gray",
    fontSize: 14,
    alignSelf: "center",
    marginTop: 40,
    lineHeight: 20,
  },
});

export default AboutUs;
