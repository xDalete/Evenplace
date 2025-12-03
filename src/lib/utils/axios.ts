import axios from "axios";
import auth from "@/lib/configs/auth";

const getAxios = () => {
  const token = localStorage.getItem(auth.storageTokenKeyName);
  const customAxios = axios.create({
    // The api base url is set in next.config.ts rewrites
    // baseURL: process.env.API_URL,
    baseURL: "/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (token) {
    customAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return customAxios;
};

export { getAxios };
