import axios from "axios";
import { API_URL } from "../constants";

export const getAxios = token => Axios(token);

function Axios (token) {
  if (!Axios.instance) {
    Axios.instance = {};
  }
  if (!Axios.instance[token]) {
    Axios.instance[token] = axios.create({
      baseURL: API_URL,
      timeout: 3000,
      headers: token
        ? {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        : {
          'Content-Type': 'application/json',
        }
    });
  }
  return Axios.instance[token];
}