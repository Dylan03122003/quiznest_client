import axios from "axios";

const API_URL_DEVELOPMENT = "http://localhost:3000";
const API_URL_PRODUCTION = "http://localhost:3000";

function getBaseURL() {
  if (process.env.NODE_ENV !== "production") {
    return API_URL_DEVELOPMENT;
  } else {
    return API_URL_PRODUCTION;
  }
}

export const apiInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});
