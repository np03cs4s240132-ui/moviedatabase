import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
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

export default api;
