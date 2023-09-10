import React, { createContext, useContext, useState } from "react";

// 컨텍스트 생성
const LoginContext = createContext();

// LoginProvider 컴포넌트 정의
export const LoginProvider = ({ children }) => {
  const [value, setValue] = useState("");

  const updateValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <LoginContext.Provider value={{ value, updateValue }}>
      {children}
    </LoginContext.Provider>
  );
};

// 커스텀 훅을 사용하여 컨텍스트 사용을 간소화
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

// 로그인 상태를 위한 컨텍스트 생성
// const LoginContext = createContext();

// export const LoginProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // 로그인, 로그아웃 함수
//   const login = () => setIsLoggedIn(true);
//   const logout = () => setIsLoggedIn(false);

//   return (
//     <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </LoginContext.Provider>
//   );
// };

// export const useLogin = () => {
//   const context = useContext(LoginContext);
//   if (!context) {
//     throw new Error("useLogin must be used within a LoginProvider");
//   }
//   return context;
// };
