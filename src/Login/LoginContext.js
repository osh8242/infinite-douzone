//로그인 상태를 전역적으로 관리하기 위한 컨텍스트와 프로바이더를 제공
import React, { createContext, useContext, useState } from "react";

// 로그인 상태를 저장할 컨텍스트 생성
const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  // id와 pwd의 상태를 관리하는 state
  const [values, setValues] = useState({
    userId: "",
    userPwd: "",
  });

  // 상태 업데이트 함수
  const updateValue = (name, newValue) => {
    setValues((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <LoginContext.Provider value={{ values, updateValue }}>
      {children}
    </LoginContext.Provider>
  );
};

// 컨텍스트를 쉽게 사용할 수 있도록 하는 커스텀 훅
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("No LoginProvider");
  }
  return context;
};
