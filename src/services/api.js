// services/api.js
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

const setUser = async (data) => {
  try {
    const user = {
      _id: data._id,
      token: data.token,
      documents: []
    };
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Falha ao salvar o usuário!', error);
  }
};

const getUser = async () => {
  try {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    // console.log(user);
    return user;
  } catch (error) {
    console.error('Falha ao recuperar o usuário!', error);
    return null;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    setUser(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post("/api/auth/signup", { name, email, password });
    setUser(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("user");
    return { success: true, message: "Logout bem-sucedido" };
  } catch (error) {
    return { success: false, message: "Falha ao sair" };
  }
};

export const getDocumentData = async (qrCodeData) => {
  try {
    const { token } = await getUser();
    if (!token) {
      throw new Error('Token not available');
    }
    const response = await api.get(`/api/students/${qrCodeData}`, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(`response.data[0]: ${JSON.stringify(response.data[0])}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProfilePicture = (profilePicture) => {
  if (profilePicture) {
    const pictureURL = API_URL + "/" + profilePicture.replace(/\\/g, "/");
    return { uri: pictureURL };
  }
  return require("../assets/profile-picture.jpg");
};