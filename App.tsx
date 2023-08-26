import { PortalProvider } from "@gorhom/portal";
import { UserProvider } from "./contexts/UserContext";
import Navigator from "./navigator/Navigator";
import React from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <UserProvider>
        <PortalProvider>
          <Navigator />
        </PortalProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
