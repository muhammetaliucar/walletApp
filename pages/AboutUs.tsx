import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { version } from "../constants";

const AboutUs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View style={styles.separator}>
        <Text style={styles.description}>
          Rimsin is a mobile application that helps you take control of your
          personal finances. It enables you to set financial goals, track your
          income and expenses, create budgets, and manage your spending. With
          Rimsin's user-friendly interface and analytical tools, you can gain a
          better understanding of your financial situation and take steps
          towards saving and securing your financial well-being. Discover Rimsin
          to achieve financial freedom!
        </Text>
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
