// services/api.js
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});


const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Falha ao salvar o token!', error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Falha ao recuperar o token!', error);
    return null;
  }
};


export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    setToken(response.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post("/api/auth/signup", { name, email, password });
    setToken(response.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const getDocumentData = async (qrCodeData) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('Token not available');
    }
    const response = await api.get(`/api/students/${qrCodeData}`, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(`response.data[0]: ${JSON.stringify(response.data[0])}`);
    return response.data[0].name;
  } catch (error) {
    console.error(error);
  }
};