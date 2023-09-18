import axios from "axios";
import { url } from "./CommonConstant";

// 공통 ㅁpi 모듈

// axios 인스턴스 생성
const api = axios.create({
  baseURL: url,
});

// 인터셉터 요청
api.interceptors.request.use(
  (config) => {
    // 임시 localStorage 저장 -->redis 변경예정
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
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
      window.location.href = `${url}/login`;
    }
    // 오류 하위로 전달
    return Promise.reject(error);
  }
);
export default api;
