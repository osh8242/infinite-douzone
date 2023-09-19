import axios from "axios";

import { url } from "../../src/model/CommonConstant";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${url}/auth/login`, {
      userId: username,
      userPwd: password,
    });
    console.log("0. api run----------");
    console.log("api reutrn data :");
    console.log(response.data);
    return response.data;

    // 서버에서 반환한 데이터를 반환합니다.
  } catch (error) {
    throw error; // 에러 발생 시 해당 에러를 throw 합니다.
  }
};
