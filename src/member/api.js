import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./actions";
import { url } from "../../src/model/CommonConstant";

//redux loginUser.
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${url}/auth/login`, {
      userId: username,
      userPwd: password,
    });

    console.log("0. api run----------");
    console.log("api reutrn data :");
    console.log(response.data);

    if (response.message === "SUCCESS") {
      console.log("(1-1) ---- Message : SUCCESS");
      const token = response.headers["authorization"];
      //받을 때는 bearer 생략 가능하다고 하니 확인해보기..
      // localStorage.setItem(
      //   "token",
      //   "Bearer " + response.headers["authorization"]
      // );

      //      localStorage.setItem(`Bearer token`, response.headers["authorization"]);
      // localStorage.setItem("token",JSON.stringify(response.token));

      //JSON.stringify(response.token));
      localStorage.setItem("userInfo", JSON.stringify(response.user));

      // cookie.save("userid", "react200", {
      //   path: "/",
      //   expires,
      //   // secure : true,
      //   // httpOnly : true
      // });

      let userInfoString = localStorage.getItem("userInfo");

      if (userInfoString) {
        let userInfoObject = JSON.parse(userInfoString);
        console.log("     ----- localStorage Value: ");
        console.log(userInfoObject.userName);
        // dispatch(loginSuccess(userInfoObject));
        window.location.href = "/main"; // 임시 리다이렉트
      }
    } else {
      console.error(response.message);
      window.location.href = "/login"; // 임시 리다이렉트
    }
    return response.data;
  } catch (error) {
    throw error; // 에러 발생 시 해당 에러를 throw 합니다.
  }
};
