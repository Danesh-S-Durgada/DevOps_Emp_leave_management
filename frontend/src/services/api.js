import axios from "axios";

const API = axios.create({
  baseURL: "http://3.27.201.49:5000",
});

export default API;
