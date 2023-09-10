// //로그인 상태를 전역적으로 관리하기 위한 컨텍스트와 프로바이더를 제공
// import React, { createContext, useContext, useState } from "react";

// // 로그인 상태를 저장할 컨텍스트 생성, 전역적으로 공유하고 관리
// const LoginContext = createContext();

// // 컴포넌트의 상위 계층에서 자식 컴포넌트들에게 로그인 상태를 제공하는 역할
// export const LoginProvider = ({ children }) => {
//   // id와 pwd의 상태를 관리하는 state
//   const [loginInfo, setLoginInfo] = useState({
//     userId: "",
//     userPwd: "",
//   });

//   const updateLoginInfo = (key, value) => {
//     setLoginInfo((prev) => ({ ...prev, [key]: value }));
//   };

//   return (
//     // useLogin 의 loginInfo, updateValue 함수 반환하여 사용
//     // 자식 영역에서는 모두 사용 가능하게 함
//     <LoginContext.Provider value={{ loginInfo, updateLoginInfo }}>
//       {children}
//     </LoginContext.Provider>
//   );
// };

// // 컨텍스트를 쉽게 사용할 수 있도록
// export const useLogin = () => {
//   return useContext(LoginContext);
// };
