import axios from "axios";
import { url } from "./CommonConstant";

// 공통 ㅁpi 모듈

// axios 인스턴스 생성
const api = axios.create({
  baseURL: url,
});

// 인터셉터요청
api.interceptors.request.use(
  (config) => {
    console.log("0.");
    const token = localStorage.getItem("authToken");
    // const token = "teststt";
    if (token) {
      config.headers["authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("토큰이 만료되었거나 유효하지 않습니다. ");
      // 로그인 페이지 리다이렉트
      window.location.href = `/login`;
    }
    // 오류 하위로 전달
    return Promise.reject(error);
  }
);
export default api;
