import React from "react";
import { useLogin } from "./LoginContext";

const TextComponent = () => {
  const { value, updateValue } = useLogin();

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => updateValue(e.target.value)}
    />
  );
};

export default TextComponent;
