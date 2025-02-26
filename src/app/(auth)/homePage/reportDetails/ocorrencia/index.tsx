import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";
import { ClassColor, colors, Font } from "@//styles/global";
import { useLocalSearchParams } from "expo-router";
import { getReport } from "@//hooks/useSyncReportsOffline";
import { Report } from "@//components/homeComponents/ReportInterface";
import { Ionicons } from "@expo/vector-icons";

interface ReportInfo {
  date: string;
  image: string;
}

const index = () => {
  const params = useLocalSearchParams();
  const [report, setReport] = useState<Report | null>(null);
  const [reportInfo, setReportInfo] = useState<ReportInfo | null>(null);
  useEffect(() => {
    (async () => {
      if (params.id) {
        const rep = await getReport(params.id as string);
        if (rep) {
          setReport(rep);
          console.log("Id -> ", rep.id);
        }
      }
    })();
  }, [params.id]);
  return (
    <>
      <View style={styles.container}>
        <Text style={[Font.xl, ClassColor.c2, { marginVertical: 32 }]}>
          Ocorrência
        </Text>
        <View style={styles.subContainer}>
          <Text style={[Font.m_b, ClassColor.c2]}>{report?.date}</Text>
          <View style={styles.imageCard}>
            <Image
              style={styles.imageCard}
              source={{ uri: report?.image }}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={[Font.m_b, ClassColor.c2]}>{report?.date}</Text>
          <View style={styles.imageCard}>
            {!reportInfo?.image ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="image" size={50} color={colors.c7} />
                <Text style={[Font.m, ClassColor.c7]}>
                  Imagem ainda não carregada
                </Text>
              </View>
            ) : (
              <Image
                style={styles.imageCard}
                source={{ uri: report?.image }}
                resizeMode="cover"
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default index;
