// services/api.js
import axios from "axios";
require("dotenv").config();

const api = axios.create({
  baseURL: process.env.API_URI,
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
    let newUser = {name, email, password};
    const response = await api.post("api/auth/signup", {});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};