import React from "react";
import { useLogin } from "./LoginContext";
import TextComponent from "./TextComponents";

const Login = () => {
  const { value, updateValue } = useLogin();

  const handleClick = () => {
    console.log(value);
  };

  return (
    <>
      <TextComponent />
      <button onClick={handleClick}>Submit</button>
    </>
  );
};

export default Login;
