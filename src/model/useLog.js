import axios from "axios";
import { url } from "./CommonConstant";

export const useLog = () => () => {
  const response = axios.get(`${url}/auth/logout`);

  console.log("response:");
  console.log(response);
};
