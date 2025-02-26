import React from "react";
import { View, Image, Text, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { UnknownInputParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { Report } from "@/components/Interfaces/report";
import { ClassColor, colors, Font } from "@/styles/global";
import { SeverityEnum } from "@/constants/severityEnum";
import Toast from "react-native-toast-message";

interface RenderReportProps {
  item: Report;
}

export const RenderReport: React.FC<RenderReportProps> = ({ item }) => {
  const router = useRouter();

  return (
    <>
      {!item.coodenates ? (
        <View style={styles.loading}>
          <ActivityIndicator
            style={[{ position: "absolute", top: 84.4, right: 82.4 }]}
            size="large"
            color={colors.p2}
          />
          <Ionicons
            name="time-outline"
            size={24}
            style={[ClassColor.p2, { position: "absolute", top: 90 }]}
          />
          <Text style={[ClassColor.p2, Font.m, { marginTop: 20 }]}>
            Criando Report
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            if (item.submit)
              router.push({
                pathname: "/(auth)/homePage/reportDetails",
                params: { id: item.id } as unknown as UnknownInputParams,
              });
            else
              Toast.show({
                type: "error",
                position: "bottom",
                autoHide: true,
                visibilityTime: 2500,
                text1: "AVISO",
                text2: "O relatório ainda não foi enviado",
              });
          }}
          style={styles.reportCard}
        >
          <View style={styles.imageCard}>
            {/* Exibe a imagem do report, se disponível */}
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>

          <View style={styles.cardInfo}>
            <View style={styles.reportLocationView}>
              <Text
                style={[Font.xs, ClassColor.c0, { width: "85%" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.street}
              </Text>
              <Ionicons
                style={[
                  styles.icon,
                  item.submit ? ClassColor.green : ClassColor.red,
                ]}
                name={
                  item.submit
                    ? "checkmark-circle-outline"
                    : "alert-circle-outline"
                }
                size={20}
              />
            </View>
            {/* Gravidade do report */}
            <View style={styles.cardSubInfo}>
              <Text
                style={[
                  styles.severity,
                  item.severity === SeverityEnum.MODERADO
                    ? styles.severityModerado
                    : styles.severityGrave,
                ]}
              >
                {SeverityEnum[item.severity]}
              </Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={[Font.xs, ClassColor.c5]}>{item.date}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      )}
    </>
  );
};
