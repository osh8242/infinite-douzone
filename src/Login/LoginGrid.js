import React from "react";
import { LoginProvider } from "./LoginContext";
import Login from "./Login";

const LoginGrid = () => {
  return (
    // provider 를 통해 context 자원 사용 가능
    <LoginProvider>
      <Login />
    </LoginProvider>
  );
};

export default LoginGrid;
