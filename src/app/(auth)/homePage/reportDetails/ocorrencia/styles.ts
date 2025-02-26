import { colors } from "@//styles/global";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  subContainer: {
    marginBottom: 40,
    height: 230,
    gap: 10,
    paddingVertical: 10,
  },
  imageCard: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.p3,
    borderRadius: 10,
  },
});

export default styles;
