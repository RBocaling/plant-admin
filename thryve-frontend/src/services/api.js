import axios from "axios";
import { useAuthStore } from "../store/authStore";

<<<<<<< HEAD
export const baseURL = "http://localhost:5000/api";
//test
=======
const baseURL = "https://plant-api-v2.onrender.com/api"
// 
>>>>>>> 3c6ba390d13aa339562afc74905f7858485a46f6
const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

        setTokens(newAccessToken, newRefreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
