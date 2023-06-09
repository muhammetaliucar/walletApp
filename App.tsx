import { UserProvider } from "./contexts/UserContext";
import Navigator from "./navigator/Navigator";
import React from "react";
import "react-native-gesture-handler";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <Navigator />
      </UserProvider>
    </GestureHandlerRootView>
  );
}
