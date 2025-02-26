import React from "react";
import { View, Image, Pressable, Text } from "react-native";
import { styles } from "./styles";
import { ClassColor, Font } from "@/styles/global";

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.logo}>
        <Image
          source={require("#/images/IconProvisorio.png")}
          style={styles.image}
        />
        <Text style={[ClassColor.c12, Font.l, styles.textLogo]}>URBANIFY</Text>
      </View>
      {children}
    </View>
  );
};
