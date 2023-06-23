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

const NewProcess = () => {
  const route = useRoute();
  const { selected, item } = route.params;

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
      <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
        {item ? monthGenerator(item.date) : monthGenerator(selected)}
      </Text>
    ),

    headerRight: () => (
      <TouchableOpacity onPress={() => handleSave()}>
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            marginRight: 10,
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    ),
  });

  const [modalHeaderSelected, setModalHeaderSelected] =
    useState<string>("Revenue");
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
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
          }}
        >
          <View>
            <TouchableOpacity
              activeOpacity={0}
              onPress={() => setModalHeaderSelected("Expense")}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                backgroundColor:
                  modalHeaderSelected === "Expense" ? RED : "#fff",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: modalHeaderSelected === "Expense" ? "#fff" : "#000",
                }}
              >
                Expense
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0}
            onPress={() => setModalHeaderSelected("Revenue")}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 20,
              backgroundColor:
                modalHeaderSelected === "Revenue" ? PRIMARY_COLOR : "#fff",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: modalHeaderSelected === "Revenue" ? "#fff" : "#000",
              }}
            >
              Revenue
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable
          onPress={() => priceRef?.current.focus()}
          style={{
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
          }}
        >
          <TextInput
            onChangeText={(text) => setTotal(Number(text))}
            ref={priceRef}
            style={{ flex: 1 }}
            value={total.toString()}
            inputMode="numeric"
            placeholder="Amount"
          />
          <Text
            style={{
              fontSize: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: "#f5f5f5",
              borderRadius: 5,
            }}
          >
            {currency}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => textRef?.current.focus()}
          style={{
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
          }}
        >
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            ref={textRef}
            multiline
            placeholder="Description"
          />
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default NewProcess;

const styles = StyleSheet.create({});
