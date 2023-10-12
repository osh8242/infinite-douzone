import axios from "axios";
import { url } from "../model/CommonConstant";
import useLogin from "./useLogin";

export const loginUser = async (userId, userPwd) => {
  try {
    const response = await axios.post(
      `${url}/auth/login?clientIp=${sessionStorage.getItem("clientIp")}`,
      {
        userId,
        userPwd,
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response };
  }
};
