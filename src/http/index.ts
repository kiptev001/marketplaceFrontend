'use client';
import axios from 'axios';
import { IAuthResponse } from '../types/index';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use((config)=> config, async (error)=>{
//   const originalRequest = error.config;
//   if(error.response.status === 401 && error.config && !error.config._isRetry){
//     originalRequest._isRetry = true;
//     try {
//       const response = await axios.get<IAuthResponse>(`${API_URL}/users/refresh`, { withCredentials:true });
//       localStorage.setItem('token',response.data.accessToken);
//       return api.request(originalRequest);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   throw error;
// });

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IAuthResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }

    throw error;
  }
);

export default api;
