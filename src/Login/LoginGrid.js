import React from "react";
import { LoginProvider } from "./LoginContext";
import Login from "./Login";

const LoginGrid = () => {
  return (
    <LoginProvider>
      <Login />
    </LoginProvider>
  );
};

export default LoginGrid;
