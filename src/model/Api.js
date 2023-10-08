import axios from "axios";
import { url } from "./CommonConstant";
import { useContext } from "react";
import { TimeContext } from "../Login/TimeProvider";
import { LoadingContext } from "../Loading/LoadingProvider";

export const useApi = () => {
  const { setCurrentTime } = useContext(TimeContext);
  const { setLoading } = useContext(LoadingContext);

  const api = axios.create({
    baseURL: url,
  });

  // 인터셉터 요청
  api.interceptors.request.use(
    (config) => {
      setLoading(true); // 요청 시작 시 loading 상태를 true로 설정
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["authorization"] = "Bearer " + token;
      }
      const clientIp = sessionStorage.getItem("clientIp");
      config.headers["Client-IP"] = clientIp;
      return config;
    },
    (error) => {
      setLoading(false); // 요청 실패 시 loading 상태를 false로 설정
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  api.interceptors.response.use(
    (response) => {
      setCurrentTime(new Date());
      setLoading(false); // 응답 시 loading 상태를 false로 설정
      return response;
    },
    (error) => {
      setLoading(false); // 응답 실패 시 loading 상태를 false로 설정
      if (error.response && error.response.status === 401) {
        console.log("토큰이 만료되었거나 유효하지 않습니다. ");
        window.location.href = `${url}/login`;
      } else if (error.response && error.response.status === 403) {
        console.log("로그인 시간 만료로 인한 토큰 만료");
        window.location.href = `${url}/login`;
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default useApi;
