import axios from "axios";
import { url } from "./CommonConstant";

export const useLog = () => () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("No token found!");
      return;
    }

    const response = axios.post("/api/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      console.log(response.data);
    }
  } catch (error) {
    // 에러를 처리합니다.
    console.error(
      "Logout failed:",
      error.response ? error.response.data : error.message
    );
  }
};
