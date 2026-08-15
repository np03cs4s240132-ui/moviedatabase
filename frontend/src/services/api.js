import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // sends/receives cookies automatically
});

export const fetchMovies = async (params = {}) => {
  const { data } = await api.get("/movies", { params });
  return data;
};

export const fetchMovieById = async (id) => {
  const { data } = await api.get(`/movies/${id}`);
  return data;
};

export const createMovie = async (movie) => {
  const { data } = await api.post("/movies", movie);
  return data;
};

export const deleteMovie = async (id) => {
  const { data } = await api.delete(`/movies/${id}`);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data.data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data.data;
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data.data;
};

export const askAI = async (message) => {
  const { data } = await api.post("/ai/chat", {
    message,
  });

  return data.data.reply;
};

export default api;