import useAsyncStorage from "@/hooks/useSyncStorage";
import axios from "axios";

export default function AxiosHTTP() {
  const API_URL = process.env.EXPO_PUBLIC_URBANIFY_API;
  const secretToken = process.env.EXPO_PUBLIC_URBANIFY_SECRET_TOKEN;
  const { getToken } = useAsyncStorage();

  const postJSON = async (url: string, data: any) => {
    const token = await getToken(secretToken!);
    try {
      return await axios.post(`${API_URL}${url}`, data, {
        headers: {
          Accept: "application/json", // Aceitar resposta em JSON
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Tipo de conteúdo para envio de arquivo
        },
      });
    } catch (err) {
      console.error("[AXIOS]: ", err);
      return null;
    }
  };

  const postFormData = async (complement: string, data: any) => {
    const token = await getToken(secretToken!);
    try {
      return await axios.post(`${API_URL}${complement}`, data, {
        headers: {
          Accept: "application/json", // Aceitar resposta em JSON
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Tipo de conteúdo para envio de arquivo
        },
      });
    } catch (err) {
      console.error("[AXIOS]: ", err);
      return null;
    }
  };

  const getReportOn = async (complement: string) => {
    const token = await getToken(secretToken!);
    console.log("url => ", `${API_URL}${complement}`);
    try {
      return await axios.get(`${API_URL}${complement}`, {
        headers: {
          Accept: "application/json", // Aceitar resposta em JSON
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Tipo de conteúdo para envio de arquivo
        },
      });
    } catch (err) {
      console.error("[AXIOS]: ", err);
      return null;
    }
  };

  return { postJSON, postFormData, getReportOn };
}
