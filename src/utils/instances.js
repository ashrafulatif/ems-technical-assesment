import { CONFIG } from "@/config-global";
import axios, { all } from "axios";

// Axios instance
const Instances = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: CONFIG.serverUrl,
});

export default Instances;

export const endpoints = {
  events: {
    getMockEvents: "api/events/",
  },
};
