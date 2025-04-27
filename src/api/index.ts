// src/api/index.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002/api', // Your backend URL
  timeout: 5000,
});

export const getUserProfile = async (token: string) => {
  try {
    const response = await api.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for protected routes
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
