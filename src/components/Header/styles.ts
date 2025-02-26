import { colors } from "@//styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: colors.p5,
  },

  logo: {
    marginLeft: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
  },

  image: { width: 40, height: 40 },

  textLogo: {
    fontSize: 30,
  },
});
