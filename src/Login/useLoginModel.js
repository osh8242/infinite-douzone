import axios from "axios";
import { useLogin } from "./LoginProvider";

const useLoginModel = () => {
  const url = "http://localhost:8888";
  const { loginInfo } = useLogin();

  const LoginUser = async () => {
    console.log(loginInfo);
    try {
      const response = await axios.post(url + "/auth/login", loginInfo);
      return response.data;
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

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

  return {
    LoginUser,
  };
};

export default useLoginModel;
