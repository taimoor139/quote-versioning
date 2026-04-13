import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Unwrap `data` from success envelope
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.success === true) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error: AxiosError<{ message: string; errors?: Record<string, string[]> }>) => {
    const message =
      error.response?.data?.message ?? error.message ?? "Unknown error occurred";
    const errors = error.response?.data?.errors ?? undefined;
    return Promise.reject({ message, errors });
  }
);

export default api;
