import React, { useEffect, useState } from "react";
import ModalSelectedInfo from "@//components/homeComponents/modalSelectedInfo";
import { Ionicons } from "@expo/vector-icons";
import { ButtonCustom } from "@/components/ButtonCustom";
import { ClassColor, colors, Font } from "@///styles/global";
import * as Location from "expo-location";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { Report } from "@/components/Interfaces/report";
import ConfirmDeleteModal from "@/components/homeComponents/confirmeDeleteModal";
import { useReports } from "@/hooks/useReports";
import useCapture from "@//hooks/useCapture";
import { RenderReport } from "@/components/RenderList";
import { SeverityEnumType } from "@//constants/severityEnum";
import { clearAllStorage } from "@/hooks/useSyncReportsOffline";

export default function Home() {
  const { reports, loadReports, createReport } = useReports(); // Pega a lista de reports monitorada
  const { photo, handleCapture, setPhoto } = useCapture(); // Controle da Câmera
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Report | null>(null);
  const [selectedVisibleModal, setSelectedVisibleModal] =
    useState<boolean>(false);
  useEffect(() => {
    console.log("[HOME-PAGE]");
    loadReports();
  }, []);
  // UseEffect para carregar os reports ao iniciar o app
  useEffect(() => {
    if (photo) {
      (async () => {
        try {
          // Solicitar permissão para acessar a localização
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            Alert.alert(
              "Aviso",
              "precisamos de sua localização para continuar o relato"
            );
            console.log("Permissão para acessar a localização foi negada");
            setPhoto(null);
            return;
          }
          setSelectedVisibleModal(true);
        } catch (error) {
          console.error("Erro ao carregar reports:", error);
        }
      })();
    }
  }, [photo]);

  const handleSeverity = async (severity: SeverityEnumType) => {
    if (severity === undefined || !photo) return;

    createReport(severity, photo);

    setSelectedItem(null);
    setPhoto(null);
  };

  const deleteItem = (item: Report) => {
    if (!item) {
      alert("Sem item selecionado");
      return;
    }
  };
  return (
    <ScrollView>
      <ModalSelectedInfo
        onCreateReport={handleSeverity}
        onRequestClose={() => setSelectedVisibleModal(false)}
        visible={selectedVisibleModal}
      />
      {/* Modal de confirmação de exclusão */}
      <ConfirmDeleteModal
        visible={confirmDeleteModalVisible}
        onClose={() => setConfirmDeleteModalVisible(false)}
        onConfirm={deleteItem}
        itemDelete={selectedItem}
      />

      <View style={{ padding: 16 }}>
        <Text style={[{ marginTop: 28 }, Font.xl]}>
          Fotografe o local do problema
        </Text>
        <TouchableOpacity style={styles.photoBox} onPress={handleCapture}>
          <Ionicons name="camera-outline" size={48} color={colors.p1} />
          <Text style={styles.photoText}>Fotografe aqui</Text>
        </TouchableOpacity>
        <ButtonCustom
          styleCustom={{ marginTop: 21 }}
          title={"ENVIAR"}
          onPress={handleCapture}
        />
        <View
          style={{
            marginTop: 42,
          }}
        >
          {/* Lista de reports recentes */}
          <Text style={[styles.reportsTitle, Font.l, ClassColor.c2]}>
            Histórico de Ocorrências
          </Text>
          { reports.length > 0 ? 
            <FlatList
            data={reports}
            renderItem={({ item }) => <RenderReport item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.fletListIn}
            /> : <View>
              <Text>Olá</Text>
              </View>
        }
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    zIndex: 10,
    position: "absolute",
    width: "100%",
    bottom: 20,
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
  photoBox: {
    width: "100%",
    height: 150,
    borderWidth: 2,
    borderColor: colors.p1,
    borderStyle: "dashed",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    backgroundColor: "#EAF4FF",
  },
  photoText: {
    color: colors.p1,
    fontSize: 16,
    marginTop: 8,
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  reportsTitle: {
    marginBottom: 16,
  },
  reportCard: {
    width: 200,
    height: 260,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.c12,
    elevation: 4,
  },
  fletListIn: {
    padding: 10,
    gap: 20,
  },
  imageCard: {
    width: "100%",
    height: 164,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: colors.c6,
    paddingRight: 30,
    paddingLeft: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
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
  erroSubmit: {
    position: "absolute",
    backgroundColor: "rgba(255, 236, 236, 0.56)",
    bottom: 10,
    right: -10,
    marginRight: 20,
    borderRadius: 10,
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
  reportLocationView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    color: colors.p3,
    borderRadius: 50,
    boxShadow: "0 0 0 1px #ddd",
    marginBottom: 5,
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
  cardReports: {
    width: "100%",
    paddingHorizontal: 10,
  },
});
