import axios from "axios";

const instace = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

export default instace;
