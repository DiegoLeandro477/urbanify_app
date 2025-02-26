import {
  View,
  Text,
  BackHandler,
  TextInput,
  Pressable,
  Image,
} from "react-native";

import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

import { StyleSheet } from "react-native";
import { colors, ClassColor, Font } from "@/styles/global";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/Button";
import { SplashScreen } from "expo-router";

export default function SignIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    signIn,
    loading,
    errorEmailOrPassword,
  } = useAuth();
  const [securityText, setSecutiryText] = useState<boolean>(false);
  const passwordInputRef = useRef<TextInput>(null); // Referência para o campo de senha

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleCancel = () => {
    BackHandler.exitApp();
  };

  // Quando pressionar 'Enter' no campo de email, foca no campo de senha
  const handleEmailSubmit = () => {
    passwordInputRef.current?.focus(); // Foca no campo de senha
  };
  // Quando pressionar 'Enter' no campo de senha, chama a função signIn()
  const handlePasswordSubmit = () => {
    signIn(); // Chama a função de login
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../../assets/images/LogoProvisoria.png")} />
        <Text
          style={[
            Font.xs,
            ClassColor.c6,
            { marginTop: 10, textAlign: "center" },
          ]}
        >
          Uma rua reparada não é apenas um conserto, mas o caminho para o
          progresso.
        </Text>
      </View>
      <View style={styles.main}>
        <Text style={[Font.xl, ClassColor.p1]}>Login</Text>
        <View style={[{ gap: 28 }]}>
          <View style={styles.viewInput}>
            <Ionicons
              style={[Font.m, ClassColor.p1]}
              name="person-outline"
              size={20}
            />
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={handleEmailSubmit}
              returnKeyLabel="ir"
              placeholder="Digite aqui seu email"
              placeholderTextColor={colors.c8}
            />
          </View>
          <View style={styles.viewInput}>
            <Ionicons
              style={[Font.m, ClassColor.p1]}
              name="lock-closed-outline"
              size={20}
            />
            <TextInput
              ref={passwordInputRef} // Referência para o campo de senha
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!securityText}
              onSubmitEditing={handlePasswordSubmit} // Chama signIn ao pressionar Enter no campo de senha
              returnKeyType="done" // Muda a tecla Enter para "Done"
              placeholder="Digite aqui sua senha"
              placeholderTextColor={colors.c8}
            />
            <Pressable
              style={{ padding: 5 }}
              onPressIn={() => setSecutiryText(!securityText)}
            >
              {password && (
                <Ionicons
                  name={!securityText ? "eye-off-outline" : "eye-outline"}
                  size={24}
                />
              )}
            </Pressable>
          </View>
        </View>
        {errorEmailOrPassword && (
          <View
            style={{
              flexDirection: "row",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, .1)",
              borderRadius: 20,
              paddingVertical: 2,
              paddingHorizontal: 10,
              alignSelf: "center",
            }}
          >
            <Ionicons
              style={ClassColor.red}
              name="alert-circle-outline"
              size={16}
            />
            <Text style={[ClassColor.red]}>Usuário ou senha incorreto</Text>
          </View>
        )}

        <Button
          title={"ENTRAR"}
          styleCustom={styles.buttonSubmit}
          onPress={signIn}
          isLoading={loading}
        />
      </View>
      <View style={styles.footer}>
        <Text style={[Font.l, ClassColor.c8]}>ENVIROMENT</Text>
        <Text>{process.env.EXPO_PUBLIC_URBANIFY_API}</Text>
        <Text>{process.env.EXPO_PUBLIC_URBANIFY_SECRET_TOKEN}</Text>
        <Text>{process.env.EXPO_PUBLIC_URBANIFY_STORAGE_REPORTS}</Text>
        <Text style={[Font.xs, ClassColor.c6, { textAlign: "center" }]}>
          Copyright ©2020 Produced by Ant Finance Experience Technology
          Department
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.c10,
    padding: 20,
    gap: 86,
  },
  logo: { marginTop: 80, alignItems: "center" },
  main: {
    width: 360,
    padding: 10,
    alignItems: "center",
    gap: 24,
  },
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.c12,
    width: "100%",
    borderRadius: 8,
    borderWidth: 0.1,
    paddingHorizontal: 10,
  },
  textInput: { flex: 1, textAlign: "center", color: colors.c4 },
  buttonSubmit: { paddingHorizontal: 40, borderRadius: 5, width: 150 },
  footer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
