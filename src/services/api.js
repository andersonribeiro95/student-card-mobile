// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URI,
});

export const getDocumentData = async (qrCodeData) => {
  try {
    const response = await api.post("/documents", { qrCodeData });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (name, email, password) => {
  try {
    console.log(name, email);
    const response = await api.post("/api/auth/signup", {name, email, password});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};