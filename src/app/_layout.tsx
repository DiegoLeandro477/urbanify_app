import React from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";

export default function Layout() {
  return (
    <>
      <StatusBar
        hidden={false}
        barStyle="default"
        backgroundColor={"rgba(0,0,0,1)"}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack>

      <Toast />
    </>
  );
}
