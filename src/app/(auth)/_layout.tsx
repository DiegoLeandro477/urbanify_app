import React from "react";
import { Stack } from "expo-router";
export default function LayoutProvideRole() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="homePage" />
        <Stack.Screen name="adminPage/index" />
      </Stack>
    </>
  );
}
