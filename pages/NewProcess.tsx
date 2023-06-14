import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Button,
  Keyboard,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../contexts/UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const NewProcess = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { selected } = route.params;
  const { data, setData } = useContext(UserContext);
  const [description, setDescription] = useState<string>("");
  const inputRef = useRef<TextInput>(null);
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
        <Text>Save</Text>
      </TouchableOpacity>
    ),
  });

  const [modalHeaderSelected, setModalHeaderSelected] =
    useState<string>("Revenue");
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header
          modalHeaderSelected={modalHeaderSelected}
          setModalHeaderSelected={(e) => setModalHeaderSelected(e)}
        />
        <Pressable
          onPress={() => inputRef?.current.focus()}
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 10,
            marginHorizontal: 20,
            backgroundColor: "#fff",
            flexDirection: "row",
          }}
        >
          <TextInput
            onChangeText={(text) => setTotal(Number(text))}
            ref={inputRef}
            style={{ flex: 1 }}
            inputMode="numeric"
            placeholder="Amount"
          />
          <Text style={{ fontSize: 20 }}>₺</Text>
        </Pressable>

        <Pressable
          onPress={() => inputRef?.current.focus()}
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 10,
            marginHorizontal: 20,
            backgroundColor: "#fff",
            justifyContent: "flex-start",
          }}
        >
          <TextInput
            onChangeText={(text) => setDescription(text)}
            ref={inputRef}
            multiline
            // style={{ minHeight: 200 }}
            placeholder="Description"
            onSelectionChange={(e) => console.log(e)}
          />
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default NewProcess;

const styles = StyleSheet.create({});
