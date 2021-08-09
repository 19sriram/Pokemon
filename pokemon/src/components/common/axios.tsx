import axios from "axios";
import { BASE_URL } from "./const";
/**
 * Base url for application
 */
export default axios.create({
  baseURL: BASE_URL
});
