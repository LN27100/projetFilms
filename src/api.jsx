import axios from 'axios';

const API_KEY = '9afb004ff899e32aaaa7cffea500b06d';
const BASE_URL = 'https://api.themoviedb.org/3';

const createApiUrl = (endpoint, params = {}) => {
  const queryParams = new URLSearchParams({ api_key: API_KEY, language: 'fr-FR', ...params });
  return `${BASE_URL}/${endpoint}?${queryParams.toString()}`;
};

// Fonction pour récupérer les films populaires
export const fetchPopularMovies = async (page = 1) => {
  const url = createApiUrl('movie/popular', { page });
  const response = await axios.get(url);
  return response.data;
};

// Fonction pour récupérer les films en cours de diffusion
export const fetchNowPlayingMovies = async (page = 1) => {
  const url = createApiUrl('movie/now_playing', { page });
  const response = await axios.get(url);
  return response.data;
};

// Fonction pour récupérer les films les mieux notés
export const fetchTopRatedMovies = async (page = 1) => {
  const url = createApiUrl('movie/top_rated', { page });
  const response = await axios.get(url);
  return response.data;
};

// Fonction pour récupérer les films à venir
export const fetchUpcomingMovies = async (page = 1) => {
  const url = createApiUrl('movie/upcoming', { page });
  const response = await axios.get(url);
  return response.data;
};

// Fonction pour récupérer les détails d'un film
export const fetchMovieDetails = async (movieId) => {
  const url = createApiUrl(`movie/${movieId}`);
  const response = await axios.get(url);
  return response.data;
};

// Fonction pour récupérer les crédits d'un film
export const fetchMovieCredits = async (movieId) => {
  const url = createApiUrl(`movie/${movieId}/credits`);
  const response = await axios.get(url);
  return response.data;
};

// Fonction pour récupérer les films similaires
export const fetchSimilarMovies = async (movieId) => {
  const url = createApiUrl(`movie/${movieId}/similar`);
  const response = await axios.get(url);
  return response.data.results;
};

// Fonction pour rechercher des films
export const searchMovies = async (query, page = 1) => {
  const url = createApiUrl('search/movie', { query, page });
  const response = await axios.get(url);
  return response.data;
};
