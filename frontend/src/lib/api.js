import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const submitContact = (data) => api.post("/contact", data).then((r) => r.data);
export const createAppointment = (data) => api.post("/appointments", data).then((r) => r.data);
