import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import requestAxios from "@/utils/requestAxios";
import Toast from "react-native-toast-message";
import { jwtDecode, JwtPayload } from "jwt-decode";
import useAsyncStorage from "./useSyncStorage";

const secretToken: string = process.env.EXPO_PUBLIC_URBANIFY_SECRET_TOKEN!;

export default function useAuth() {
  const [email, setEmail] = useState<string>("admin@admin.com");
  const [password, setPassword] = useState<string>("admin123");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorEmailOrPassword, setErrorEmailOrPassword] =
    useState<boolean>(false);
  const { postJSON } = requestAxios();
  const { saveRole } = useAsyncStorage();

  const signIn = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    setLoading(true);
    setErrorEmailOrPassword(false);
    try {
      const response = await postJSON("/user/login", {
        email,
        password,
      });
      const { token, message } = response?.data;
      // 🔹 Salva o token no SecureStore
      if (!token) throw new Error("Token not found");
      Toast.show({
        type: "success",
        text1: secretToken,
        text2: message,
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
      });
      await SecureStore.setItemAsync(secretToken, token);

      const { role }: any = jwtDecode(token);
      console.log("[ROLE] -> ", role);
      await saveRole(role);
      setErrorEmailOrPassword(false);
      router.navigate("/(auth)");
    } catch (err) {
      console.error("Error: ", err);
      setLoading(false);
      setErrorEmailOrPassword(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    signIn,
    errorEmailOrPassword,
  };
}
