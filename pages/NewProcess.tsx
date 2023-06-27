import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
  Keyboard,
  View,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../contexts/UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PRIMARY_COLOR, RED } from "../styles";
import { monthGenerator } from "../utils/monthGenerator";
import I18n from "../languages/i18n";

const NewProcess = () => {
  const route = useRoute();
  const { selected, item }: any = route.params;

  const navigation = useNavigation();
  const { data, setData, currency } = useContext(UserContext);
  const priceRef = useRef<TextInput>(null);
  const textRef = useRef<TextInput>(null);
  const [total, setTotal] = useState<number>(item ? item.total : 0);
  const [description, setDescription] = useState<string>(
    item ? item.description : ""
  );

  const handleSave = () => {
    let dataN = {
      type: modalHeaderSelected,
      total: total,
      description: description,
      date: selected,
      id: Date.now(),
      createdAt: Date.now(),
    };

    if (item) {
      const a = data.filter((e) => e.id !== item.id);
      let dataNItem = {
        type: modalHeaderSelected,
        total: total,
        description: description,
        date: item.date,
        id: Date.now(),
        createdAt: Date.now(),
      };

      setData(a.concat(dataNItem));
      AsyncStorage.setItem("data", JSON.stringify([...a, dataNItem]));
      Keyboard.dismiss();
      setTotal(0);
      navigation.goBack();
      return;
    }

    setData(data.concat(dataN));
    AsyncStorage.setItem("data", JSON.stringify([...data, dataN]));
    Keyboard.dismiss();
    setTotal(0);
    navigation.goBack();
  };

  navigation.setOptions({
    headerTitle: () => (
      <Text style={styles.headerTitle}>
        {item ? monthGenerator(item.date) : monthGenerator(selected)}
      </Text>
    ),

    headerRight: () => (
      <TouchableOpacity onPress={() => handleSave()}>
        <Text style={styles.headerRightText}>{I18n.t("save")}</Text>
      </TouchableOpacity>
    ),
  });

  const [modalHeaderSelected, setModalHeaderSelected] =
    useState<string>("Revenue");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => setModalHeaderSelected("Expense")}
            style={[
              styles.headerButton,
              {
                backgroundColor:
                  modalHeaderSelected === "Expense" ? RED : "#fff",
              },
            ]}
          >
            <Text
              style={[
                styles.headerButtonText,
                {
                  color: modalHeaderSelected === "Expense" ? "#fff" : "#000",
                },
              ]}
            >
              {I18n.t("expense")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0}
            onPress={() => setModalHeaderSelected("Revenue")}
            style={[
              styles.headerButton,
              {
                backgroundColor:
                  modalHeaderSelected === "Revenue" ? PRIMARY_COLOR : "#fff",
              },
            ]}
          >
            <Text
              style={[
                styles.headerButtonText,
                {
                  color: modalHeaderSelected === "Revenue" ? "#fff" : "#000",
                },
              ]}
            >
              {I18n.t("revenue")}
            </Text>
          </TouchableOpacity>
        </View>

        <Pressable
          onPress={() => priceRef?.current?.focus()}
          style={styles.inputContainer}
        >
          <TextInput
            onChangeText={(text) => setTotal(Number(text))}
            ref={priceRef}
            style={styles.input}
            value={total.toString()}
            inputMode="numeric"
            placeholder={I18n.t("amount")}
          />
          <Text style={styles.currency}>{currency}</Text>
        </Pressable>

        <Pressable
          onPress={() => textRef?.current?.focus()}
          style={styles.descriptionContainer}
        >
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            ref={textRef}
            multiline
            placeholder={I18n.t("description")}
          />
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  headerButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  headerButtonText: {
    fontSize: 16,
  },
  headerRightText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 10,
  },
  inputContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 200,
    marginBottom: 50,
  },
});

export default NewProcess;
