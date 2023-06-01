import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ReactNativeModal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderItem from "./HeaderItem";
import Header from "./Header";

interface Props {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  textRef: any;
  selected: string;
  dateData: any;
  setDateData: (value: any) => void;
}

const ProcessModal = ({
  modalVisible,
  setModalVisible,
  textRef,
  selected,
  dateData,
  setDateData,
}: Props) => {
  const [total, setTotal] = useState<number>(0);
  const [modalHeaderSelected, setModalHeaderSelected] =
    useState<string>("Revenue");

  const handleBackDropPress = () => {
    Keyboard.dismiss();
    setModalVisible(false);
  };

  return (
    <ReactNativeModal
      onBackdropPress={handleBackDropPress}
      style={styles.mainContainer}
      isVisible={modalVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Header
            modalHeaderSelected={modalHeaderSelected}
            setModalHeaderSelected={(e)=>setModalHeaderSelected(e)}
          />

          <View style={styles.inputText}>
            <TextInput
              ref={textRef}
              keyboardType="numeric"
              style={{
                fontSize: 20,
                flex: 1,
              }}
              value={total.toString()}
              onChangeText={(text) => setTotal(Number(text))}
            />

            <Text style={{ fontSize: 20 }}>₺</Text>
          </View>
          <View
            style={styles.selected}
          >
            <Text>Selected Date:</Text>
            <Text>{selected}</Text>
          </View>
        </View>
        <View style={styles.inputAcces}>
          <TouchableOpacity>
            <Text style={{ fontSize: 20 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let data = {
                type: modalHeaderSelected,
                total: total,
                date: selected,
              };
              console.log(dateData,"dt")
              setDateData(dateData.concat(data));
              AsyncStorage.setItem("data", JSON.stringify([...dateData, data]));
              setModalVisible(false);
              Keyboard.dismiss();
            }}
          >
            <Text style={{ fontSize: 20, color: "#7675A1" }}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ReactNativeModal>
  );
};

export default ProcessModal;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height / 3,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 38,
  },
  inputAcces: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  inputText: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#7675A1",
    padding: 20,
    marginTop: 20,
  },
  mainContainer: {
    margin: 0,
    justifyContent: "flex-end",
  },
  selected:{
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  }
});
