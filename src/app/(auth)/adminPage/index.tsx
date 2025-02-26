import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Admin() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  text: { fontSize: 20, fontWeight: "bold" },
});
