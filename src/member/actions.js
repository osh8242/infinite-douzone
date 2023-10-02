export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (userData) => {
  if (!userData) return "";
  console.log("2. actions : ");
  console.log("loginSuccess action called :", userData);

  const result = {
    user: userData,
    type: LOGIN_SUCCESS,
    isAuthenticated: true,
  };

  console.log(result);
  console.log("------------------------------------");

  return result;
  // return  {
  //   type: LOGIN_SUCCESS,
  //   user: userData,
  //   isAuthenticated: true,

  //   //    payload: userData,
  // };
};

export const saveToken = (token) => {
  if (!token) return;

  console.log("===================");

  const value = {
    token: token,
  };

  return value;
};
// export default loginSuccess;

// export const logout = () => ({
//   type: LOGOUT,
// });
