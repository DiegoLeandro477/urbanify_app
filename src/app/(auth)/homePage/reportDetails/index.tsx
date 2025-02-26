import React from "react";
import { router, UnknownInputParams, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles";
import { Report } from "@//components/homeComponents/ReportInterface";
import { useEffect, useState } from "react";
import { ClassColor, Font } from "@//styles/global";
import { Ionicons } from "@expo/vector-icons";
import { ButtonCustom } from "@/components/ButtonCustom";
import useSyncReportsOnline from "@//hooks/useSyncReportsOnline";
import { StatusEnum, StatusEnumType } from "@//constants/statusEnum";
import Toast from "react-native-toast-message";
import { getReport, updateReportOffline } from "@/hooks/useSyncReportsOffline";

export default function ReportDetails() {
  const params = useLocalSearchParams();
  const [item, setItem] = useState<Report | null>(null);
  const [status, setStatus] = useState<StatusEnumType | undefined>(undefined);
  const { getStatusReportOn } = useSyncReportsOnline();
  useEffect(() => {
    (async () => {
      if (params.id) {
        const report = await getReport(params.id as string);
        if (report) {
          let status_on = await getStatusReportOn(report);
          setItem(report);
          console.log("Status -> ", status_on);
          if (status_on != undefined) {
            setStatus(status_on);
            report.status = status_on;
            updateReportOffline(report);
          } else if (report.status) {
            setStatus(report.status);
            Toast.show({
              type: "info",
              position: "bottom",
              autoHide: true,
              visibilityTime: 5000,
              text1: "AVISO",
              text2: "Não foi possível carregar dados",
            });
          } else {
            Toast.show({
              type: "error",
              position: "bottom",
              autoHide: true,
              visibilityTime: 5000,
              text1: "Error",
              text2: "Conecte-se a internet",
            });
            router.back();
          }
        }
      }
    })();
  }, [params.id]);

  if (!item) {
    return <ActivityIndicator style={styles.loadingIsNull} size={"large"} />;
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={[Font.xl, ClassColor.c0, { marginTop: 24 }]}>
          Fluxo de relato e reparo da Via
        </Text>

        <View style={styles.container_timeline}>
          <View
            style={[
              styles.sub_container,
              status != undefined &&
                status === StatusEnum.CONCLUIDO &&
                styles.check_sub_container,
            ]}
          >
            <Ionicons
              name="star"
              size={24}
              style={[
                styles.icon,
                status != undefined &&
                  status >= StatusEnum.CONCLUIDO &&
                  styles.check_icon,
              ]}
            />
            <View style={styles.sub_container_info}>
              <Text
                style={[
                  Font.l,
                  status != undefined && status >= StatusEnum.CONCLUIDO
                    ? ClassColor.p1
                    : ClassColor.c2,
                ]}
              >
                Conclusão da obra
              </Text>
              {status != undefined && status >= StatusEnum.CONCLUIDO && (
                <View style={styles.sub_container_info_02}>
                  <Text style={[Font.s, ClassColor.p1]}>{item.date}</Text>
                  <ButtonCustom
                    onPress={() =>
                      router.push({
                        pathname: "/homePage/reportDetails/ocorrencia",
                        params: {
                          id: item.id,
                        } as unknown as UnknownInputParams,
                      })
                    }
                    title={"VER REGISTRO"}
                    styleCustom={[
                      {
                        alignSelf: "flex-start",
                        paddingVertical: 3,
                      },
                    ]}
                    textCustom={[Font.xs, ClassColor.c12]}
                  />
                </View>
              )}
            </View>
          </View>

          <View
            style={[
              styles.BeforeElement,
              status != undefined &&
                status >= StatusEnum.AVALIADO &&
                styles.BeforeElementCheck,
            ]}
          />

          <View
            style={[
              styles.sub_container,
              status != undefined &&
                status === StatusEnum.AVALIADO &&
                styles.check_sub_container,
            ]}
          >
            <Ionicons
              name="checkmark-sharp"
              size={24}
              style={[
                styles.icon,
                status != undefined &&
                  status >= StatusEnum.AVALIADO &&
                  styles.check_icon,
              ]}
            />
            <View style={styles.sub_container_info}>
              <Text
                style={[
                  Font.l,
                  status != undefined && status >= StatusEnum.AVALIADO
                    ? ClassColor.p1
                    : ClassColor.c2,
                ]}
              >
                Avaliado
              </Text>
              {status != undefined && status >= StatusEnum.AVALIADO && (
                <View style={styles.sub_container_info_02}>
                  <Text style={[Font.s, ClassColor.p1]}>{item.date}</Text>
                </View>
              )}
            </View>
          </View>

          <View
            style={[
              styles.BeforeElement,
              status != undefined &&
                status >= StatusEnum.REPORTADO &&
                styles.BeforeElementCheck,
            ]}
          />
          <View
            style={[
              styles.sub_container,
              status != undefined &&
                status === StatusEnum.REPORTADO &&
                styles.check_sub_container,
            ]}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              style={[
                styles.icon,
                status != undefined &&
                  status >= StatusEnum.REPORTADO &&
                  styles.check_icon,
              ]}
            />
            <View style={styles.sub_container_info}>
              <Text
                style={[
                  Font.l,
                  status != undefined &&
                    status >= StatusEnum.REPORTADO &&
                    ClassColor.p1,
                ]}
              >
                Reportado
              </Text>
              <View style={styles.sub_container_info_02}>
                <Text
                  style={[
                    Font.s,
                    status != undefined &&
                      status >= StatusEnum.REPORTADO &&
                      ClassColor.p1,
                  ]}
                >
                  {item.date}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
