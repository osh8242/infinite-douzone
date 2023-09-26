import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../model/CommonConstant";
import { useLogin } from "./LoginProvider";

const useLoginModel = () => {
  const { loginInfo = "", updateToken } = useLogin();
  const navigate = useNavigate();

  const LoginUser = async () => {
    console.log("loginInfo", loginInfo);
    try {
      const response = await axios.post(`${url}/auth/login`, loginInfo);
      console.log(response.data);
      // const token = response.headers["authorization"];
      // header 임시 일반 값 대체중
      const token = response.token;
      console.log("token");
      console.log(token);
      // 토큰이 반환된 경우
      // if (token) {
      updateToken(response.data.token);
      localStorage.setItem("authToken", response.data.token);
      // localStorage.setItem("userInfo", loginInfo);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));

      console.log("로그인에 성공하였습니다.");
      console.log("response.data", response.data);
      console.log("response.headers", response.headers);
      // console.log("response.headerss", response.headers["authorization"]);
      navigate("/");
      // } else {
      //   console.log(response.data.message || "로그인에 실패하였습니다.");
      // }
    } catch (error) {
      console.error("ERROR: " + error);
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "CHECK_ID"
        ) {
          console.log("아이디를 찾을 수 없습니다.");
        } else if (
          error.response.status === 401 &&
          error.response.data.message === "CHECK_PWD"
        ) {
          console.log("비밀번호가 틀렸습니다.");
        } else {
          console.log("로그인 처리 중 오류가 발생했습니다.");
        }
      }
    }
  };

  // function fetchData() {
  //   return axios
  //     .post(`${url}/auth/login`)
  //／／／／ const response = await axios.post(`${url}/login?userId=${loginInfo.userId}&userPwd=${loginInfo.userPwd}` );
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       console.error("ERROR:", error);
  //     });
  // }
  return {
    LoginUser,
  };
};

export default useLoginModel;

// jwt
//   const fetchUserData = async () => {
//     const token = localStorage.getItem("jwt");

//     try {
//       const response = await axios.get("/api/user", {
//         headers: {
//           Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
//         },
//       });

//       return response.data;
//     } catch (error) {
//       console.error("Error fetching user data", error);
//     }
//   };

//   const jwt = require("jsonwebtoken");

// app.get('/api/user', (req, res) => {
//   const token = req.headers.authorization.split(' ')[1]; // "Bearer 토큰값" 형태이므로 분리

//   jwt.verify(token, YOUR_SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     // 토큰이 유효하면 사용자 데이터를 반환
//     const userId = decoded.userId;
//     const userData = ...; // 데이터베이스에서 userId로 사용자 데이터 조회

//     res.json(userData);
//   });
// });
