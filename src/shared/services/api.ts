import axios from "axios";

// Using Vite's environment variable loading with a safe local fallback for presentation.
const baseURL = ((import.meta as any).env?.VITE_API_BASE_URL as string) || "https://api.exemplo.com.br";

export const api = axios.create({
  baseURL,
  timeout: 10000,
});
