import axios from "axios";

const API_KEY = "b360d620f9d4da07b9a4ad5332009e67";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  params: {
    api_key: API_KEY,
  },
};

export const fetchMovies = async (query) => {
  const url = `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  try {
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchTrendingMovies = async () => {
  const url = `/trending/movie/day?language=en-US`;
  try {
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchMovieById = async (movieId) => {
  const url = `/movie/${movieId}?language=en-US`;
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchCast = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchReview = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};