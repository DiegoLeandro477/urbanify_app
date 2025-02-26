import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  styleCustom?: any;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  isLoading = false,
  icon,
  styleCustom,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styleCustom]}
      disabled={isLoading}
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={"#fff"} />
      ) : (
        <>
          {icon && <Ionicons style={styles.icon} name={icon} />}
          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
