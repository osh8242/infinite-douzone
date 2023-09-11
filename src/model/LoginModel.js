// import React, { useState } from "react";
// import { useContext, useEffect, useCallback } from "react";
// import axios from "../../node_modules/axios/index";
// import Swsm from "../vo/SwsmGrid/Swsm";
// import SwsmOther from "../vo/SwsmGrid/SwsmOther";
// import User from "../vo/User/User";
// import ContextModel from "./ContextModel";

// const LoginModel = (initialValue) => {
//   const url = "http://localhost:8888";
//   const [value, setValue] = useState(initialValue);

//   const updateValue = (newValue) => {
//     setValue(newValue);
//     console.log(newValue);
//   };

//   return {
//     value,
//     updateValue,
//   };
// };

// export default LoginModel;
// //   const [loginUser, setLoginUser] = useState({});

// //   useEffect(() => {
// //     console.log("LoginUser");
// //     console.log(loginUser);

// //     // if (!loginUser.isNew && Object.keys(loginUser).length !== 0)
// //     axios
// //       .post(url + "/user/login", loginUser)
// //       .then((response) => {
// //         console.log("result");
// //         console.log(response);
// //         console.log(response.data);
// //       })
// //       .catch((error) => {
// //         console.log("ERROR LOGIN: " + error);
// //       });
// //   }, [loginUser]);

// //   return {
// //     actions: {
// //       setLoginUser,
// //     },
// //   };
