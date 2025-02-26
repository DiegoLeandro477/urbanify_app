


import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

export default function useAsyncStorage() {
  const [role, setRole] = useState<string | null>(null);
  const secret_token = process.env.EXPO_PUBLIC_URBANIFY_SECRET_TOKEN!
  
  const getRole = async () => {
    try {
      return await AsyncStorage.getItem("role");
    } catch (err) {
      console.log("[ROLE]: ", err);
    }
  };

  const saveRole = async (role_: string) => {
    try {
      await AsyncStorage.setItem("role", role_);
      setRole(role_);
    } catch (err) {
      console.log("[ROLE]: ", err);
    }
  };

  const getToken = async () => {
    try {
      return await SecureStore.getItemAsync(secret_token);
    } catch (err) {
      console.error("[TOKEN]: ", err);
      return null;
    }
  };

  return {
    getRole,
    saveRole,
    role,
    getToken,
  };
}
