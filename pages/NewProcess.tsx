import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
  Button,
  Keyboard,
  View,
  Animated,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../contexts/UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PRIMARY_COLOR, RED } from "../styles";

const NewProcess = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { selected } = route.params;
  const { data, setData, currency } = useContext(UserContext);
  const [description, setDescription] = useState<string>("");
  const priceRef = useRef<TextInput>(null);
  const textRef = useRef<TextInput>(null);
  const [total, setTotal] = useState<number>(0);

  const handleSave = () => {
    let dataN = {
      type: modalHeaderSelected,
      total: total,
      description: description,
      date: selected,
      id: Date.now(),
      createdAt: Date.now(),
    };
    setData(data.concat(dataN));
    AsyncStorage.setItem("data", JSON.stringify([...data, dataN]));
    Keyboard.dismiss();
    setTotal(0);
    navigation.goBack();
  };

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={handleSave}>
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
        {/* <Header
          modalHeaderSelected={modalHeaderSelected}
          setModalHeaderSelected={(e) => setModalHeaderSelected(e)}
        /> */}
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
