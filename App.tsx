import { UserProvider } from "./contexts/UserContext";
import Navigator from "./navigator/Navigator";
import React from "react";

export default function App() {
  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
}
