import axios from "axios";
import appconstants from "../../constants/appconstants";

let apiKit = axios.create({
  baseURL: appconstants.baseUrl,
  timeout: 10000,
});

apiKit.interceptors.request.use(async (config) => {
  return config;
});

export { apiKit };
