import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/Header";

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            header: () => <Header />,
          }}
        />
        <Stack.Screen name="reportDetails" />
      </Stack>
    </>
  );
}
