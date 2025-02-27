import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Report } from "../components/homeComponents/ReportInterface";
import eventBus from "@//utils/eventBus";
import { router } from "expo-router";

const STORAGE_REPORTS = process.env.EXPO_PUBLIC_URBANIFY_STORAGE_REPORTS;
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    await SecureStore.deleteItemAsync(
      process.env.EXPO_PUBLIC_URBANIFY_SECRET_TOKEN!
    );
    console.log("Todos os dados do AsyncStorage foram apagados.");
    eventBus.emit(process.env.EXPO_PUBLIC_URBANIFY_STORAGE_REPORTS!);
    router.replace("..");
  } catch (error) {
    console.error("Erro ao limpar AsyncStorage:", error);
  }
};

export const findReportStreeAndDistrict = async (rep: Report) => {
  const reports = await getReports();
  if (!reports) return false;

  const report =
    reports.filter(
      (r: Report) =>
        r.street === rep.street &&
        r.district === rep.district &&
        r.subregion === rep.subregion
    )[0] || null;

  if (report) return true;

  return false;
};

export const getReports = async (): Promise<Report[] | null> => {
  try {
    const storedReports = await AsyncStorage.getItem(STORAGE_REPORTS!);
    return storedReports ? JSON.parse(storedReports) : [];
  } catch (error) {
    console.error("[GET-REPORTS] : ", error);
    return null;
  }
};

export const getReport = async (id: string) => {
  const reports = await getReports();
  return reports
    ? (reports.filter((rep: Report) => rep.id.toString() === id)[0] as Report)
    : null;
};

export const setReports = async (reports: Report[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_REPORTS!, JSON.stringify(reports));
    eventBus.emit(STORAGE_REPORTS);
  } catch (error) {
    console.log("[SET-REPORTS] : ", error);
  }
};

export const removeReportOffline = async (id: string) => {
  try {
    const reports = await getReports();
    if (!reports) return;
    // Filtra removendo o report com o ID correspondente
    const updatedReports = reports.filter((r: Report) => r.id !== id);

    if (updatedReports.length !== reports.length) {
      console.log(`[STORAGE] Report removido: ${id}`);
      await setReports(updatedReports);
    } else {
      console.log("Report nao encontrado [OFF_REPORTS]");
    }
  } catch (error) {
    console.error(`Erro ao remover o report de ${localStorage}:`, error);
  }
};

export const updateReportOffline = async (updatedReport: Report) => {
  try {
    const reports = await getReports();
    if (!reports) throw Error("Report is Null");

    const updateReports = reports.map((report: Report) =>
      report.id === updatedReport.id ? { ...report, ...updatedReport } : report
    );

    await setReports(updateReports);
    console.info(`[STORAGE] Report atualizado! ${updatedReport.id}`);
  } catch (error) {
    console.error("Erro ao atualizar o report STORAGE", error);
  }
};

export const saveReportOffilne = async (report: Report) => {
  try {
    let reports = await getReports();

    if (!reports) return;
    reports.unshift(report);

    await setReports(reports);
    console.log(`[STORAGE] Report salvo: ${report.id}`);
  } catch (error) {
    console.error("Erro ao salvar report [STORAGE]:", error);
  }
};
