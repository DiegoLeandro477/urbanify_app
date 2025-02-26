import { colors } from "@/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: colors.p1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  icon: { color: "#fff", fontSize: 20 },

  text: { color: "#fff", fontSize: 16 },
});
