import axios from "axios";
import { useLogin } from "./LoginProvider";
import { url } from "../model/CommonConstant";

const useLoginModel = () => {
  const { loginInfo, updateToken } = useLogin();

  const LoginUser = async () => {
    try {
      const response = await axios.post(`${url}/auth/login`, loginInfo);
      console.log(response.data);

      // 토큰이 반환된 경우
      if (response.data.token) {
        updateToken(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        console.log("로그인에 성공하였습니다.");
      } else {
        console.log(response.data.message || "로그인에 실패하였습니다.");
      }
    } catch (error) {
      console.error("ERROR:", error);
      console.log("로그인 처리 중 오류가 발생했습니다.");
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
