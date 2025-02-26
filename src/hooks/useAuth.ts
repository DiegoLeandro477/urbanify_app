import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import requestAxios from "@/utils/requestAxios";
import Toast from "react-native-toast-message";
import { jwtDecode, JwtPayload } from "jwt-decode";
import useAsyncStorage from "./useSyncStorage";
import { Alert } from "react-native";

export default function useAuth() {
  const [email, setEmail] = useState<string>("admin@admin.com");
  const [password, setPassword] = useState<string>("admin123");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorEmailOrPassword, setErrorEmailOrPassword] =
    useState<boolean>(false);
  const { Login } = requestAxios();
  const { setRole, setToken } = useAsyncStorage();

  const signIn = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    setLoading(true);
    setErrorEmailOrPassword(false);
    try {
      const response = await Login({email, password});
      // 🔹 Salva o token no SecureStore
      if (!response?.data.token) throw new Error("Token not found");
      Toast.show({
        type: "success",
        text1: "Login",
        text2: response?.data.message,
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
      });
      await setToken(response?.data.token);

      const { role }: any = jwtDecode(response?.data.token);
      console.log("[ROLE] -> ", role);
      await setRole(role);
      setErrorEmailOrPassword(false);
      router.navigate("/(auth)");
    } catch (err) {
      console.error("Error: ", err);
      setLoading(false);
      alert(err);
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
