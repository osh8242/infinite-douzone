import React, { useRef } from "react";
import LoginModel from "../model/LoginModel";

function TextComponent() {
  const inputRef = useRef();

  const handleButtonClick = () => {
    const inputValue = inputRef.current.value;
    LoginModel.updateValue(inputValue);
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Enter value" />
      <button onClick={handleButtonClick}>Send Value</button>
    </div>
  );
}
export default TextComponent;
