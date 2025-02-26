import useAsyncStorage from "@/hooks/useSyncStorage";
import axios from "axios";

export default function AxiosHTTP() {
  const API_URL = process.env.EXPO_PUBLIC_URBANIFY_API;
  const { getToken } = useAsyncStorage();

  const Login = async (data: any) => {
    try {
      return await axios.post(`${API_URL}/user/login`, data)
    } catch (err) {
      console.error("[LOGIN]: ",err)
    }
  }

  const POST = async (url: string, data: any) => {
    const token = await getToken();
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

  const POST_FormData = async (complement: string, data: any) => {
    const token = await getToken();
    if (!token) throw Error("Token nao encontrado");
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

  const GET = async (complement: string) => {
    const token = await getToken();
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

  return { POST, POST_FormData, GET, Login };
}
