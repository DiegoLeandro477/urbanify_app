import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/Header";

export default function ReportDetailsLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="index"
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="ocorrencia/index"
          options={{
            header: () => <Header />,
          }}
        />
      </Stack>
    </>
  );
}
