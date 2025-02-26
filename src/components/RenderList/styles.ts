import { colors } from "@/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loading: {
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 260,
    borderRadius: 8,
    position: "relative",
    elevation: 4,
  },

  reportCard: {
    width: 200,
    height: 260,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.c12,
    elevation: 4,
  },

  cardInfo: {
    display: "flex",
    padding: 10,
  },

  cardSubInfo: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  icon: {
    color: colors.p3,
    borderRadius: 50,
    boxShadow: "0 0 0 1px #ddd",
    marginBottom: 5,
  },

  imageCard: {
    width: "100%",
    height: 164,
  },

  reportLocationView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },

  severity: {
    marginVertical: "auto",
    paddingHorizontal: 10,
    alignSelf: "flex-start", // conteiner do tamanho do conteudo
    textTransform: "uppercase",
    color: colors.c4,
    borderRadius: 8,
  },
  severityGrave: {
    backgroundColor: "rgb(254, 179, 179)",
  },
  severityModerado: {
    backgroundColor: "rgb(255, 243, 181)",
  },
});
