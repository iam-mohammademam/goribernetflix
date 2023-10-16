import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDZlZTM0ZDk3NWZlZGE5MDQ3NzQ5YzBmYWI1NDJmOSIsInN1YiI6IjY0ZTA5MzFmNWFiODFhMDBhZDIxMGY3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TANXJTY6g4QSBodgnWp3mpSsAdeQGKVn7EEgt3GKnV8";
const headers = {
  Authorization: "bearer " + API_TOKEN,
};
export const imgUrl = {
  url: "https://image.tmdb.org/t/p/original",
};

export const fetchDataFromApi = async (endpoint) => {
  try {
    const data = await axios.get(BASE_URL + endpoint, {
      headers,
    });
    return data;
  } catch (error) {
    return error;
  }
};
