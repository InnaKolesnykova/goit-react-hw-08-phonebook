import axios from 'axios';

const apiUrl = 'https://connections-api.herokuapp.com';

export const getCurrentUserAPI = async (token) => {
  const response = await axios.get(`${apiUrl}/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const registerUserAPI = async (userData) => {
  const response = await axios.post(`${apiUrl}/users/signup`, userData);
  return response.data;
};

export const loginUserAPI = async (credentials) => {
  const response = await axios.post(`${apiUrl}/users/login`, credentials);
  return response.data;
};

export const logoutUserAPI = async (token) => {
  const response = await axios.post(`${apiUrl}/users/logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};