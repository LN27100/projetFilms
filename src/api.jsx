// src/api.js
import axios from 'axios';

const API_KEY = '9afb004ff899e32aaaa7cffea500b06d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchNowPlayingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchTopRatedMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchUpcomingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  return response.data;
};

export const fetchSimilarMovies = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  return response.data.results;
};
