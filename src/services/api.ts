import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7979",
});

export default API;
