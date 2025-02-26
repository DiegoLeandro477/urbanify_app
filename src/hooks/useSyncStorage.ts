


import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export default function useAsyncStorage() {
  const secret_token = process.env.EXPO_PUBLIC_URBANIFY_SECRET_TOKEN!
  const storage_reports = process.env.EXPO_PUBLIC_URBANIFY_STORAGE_REPORTS!
  
  const getRole = async () => {
    try {
      return await AsyncStorage.getItem("role");
    } catch (err) {
      console.log("[ROLE]: ", err);
    }
  };

  const setRole = async (role: string) => {
    try {
      await AsyncStorage.setItem("role", role);
    } catch (err) {
      console.log("[ROLE]: ", err);
    }
  };

  const getToken = async (): Promise<string> => {
    try {
      return await SecureStore.getItemAsync(secret_token) || "";
    } catch (err) {
      console.error("[TOKEN]: ", err);
      return "";
    }
  };

  const setToken = async (token: string) => {
    try {
      await SecureStore.setItemAsync(secret_token, token);
    } catch (err) {
      console.log("[TOKEN]: ", err);
    }
  }

  return {
    getRole,
    setRole,
    getToken,
    setToken,
  };
}
