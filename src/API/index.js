import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-52-57-213-159.eu-central-1.compute.amazonaws.com",
});

export default api;
