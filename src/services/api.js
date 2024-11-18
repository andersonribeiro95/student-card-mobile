// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getDocumentData = async (qrCodeData) => {
  try {
    const response = await api.post("/documents", { qrCodeData });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
