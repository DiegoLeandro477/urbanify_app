import * as SecureStore from "expo-secure-store";
import { Report } from "../components/homeComponents/ReportInterface";
import axios from "axios";
import {
  removeReportOffline,
  saveReportOffilne,
} from "./useSyncReportsOffline";
import { SeverityEnum } from "@//constants/severityEnum";
import { StatusEnum, StatusEnumType } from "@//constants/statusEnum";
import requestHTPP from "@/utils/requestAxios";

const useSyncReportsOnline = () => {
  const { getReportOn, postFormData } = requestHTPP();
  const getStatusReportOn = async (report: Report) => {
    let status: StatusEnumType | undefined = undefined;
    try {
      console.log(`Obtendo dados do Report: id->[${report.id}]`);

      const token = await SecureStore.getItemAsync("authToken");
      if (!token) return;

      const url = `/report/status/address/${report.address}/geohash/${report.geohash}`;

      const response = await getReportOn(url);
      if (!response) return;
      status = StatusEnum[response?.data.status as keyof typeof StatusEnum];
    } catch (error) {
      console.error("[DATABASE] error: ", error);
    } finally {
      return status;
    }
  };

  const saveReportOnline = async (report: Report) => {
    try {
      console.log("Enviando Report");
      const formData = new FormData();

      const data = {
        coordinates: {
          latitude: report.coodenates?.latitude,
          longitude: report.coodenates?.longitude,
        },
        subregion: report.subregion,
        district: report.district,
        street: report.street,
        severity: SeverityEnum[report.severity],
      };
      // Adiciona os outros dados do relatório

      if (typeof report.image === "string") {
        // Extrai o nome do arquivo a partir da URI
        const filename = report.image.substring(
          report.image.lastIndexOf("/") + 1
        );
        const ext = filename.split(".")[1];

        formData.append("data", JSON.stringify(data));
        // Adiciona a imagem ao FormData
        formData.append("file", {
          uri: report.image, // Caminho do arquivo
          name: filename, // Nome do arquivo
          type: `image/${ext}`, // Tipo MIME baseado na extensão
        } as any);
      } else {
        throw new Error("No valid image provided.");
      }
      // Envia os dados para o Xano
      const response = await postFormData("/report", formData);

      if (!response) return;
      console.log("[DATABASE]: ", response.data.message);

      const newReport = report;
      await removeReportOffline(report.id);
      newReport.submit = true;
      newReport.id = response?.data.report.id;
      newReport.address = response?.data.report.address;
      newReport.geohash = response?.data.report.geohash;
      await saveReportOffilne(newReport);
      return true;
    } catch (error: any) {
      {
        console.info(`HTTP Status: ${error.response.status || undefined}`);
        console.error(
          "Erro ao enviar relatório:",
          error.response?.data || error.message
        );
      }
    }
  };

  return {
    saveReportOnline,
    getStatusReportOn,
  };
};

export default useSyncReportsOnline;
