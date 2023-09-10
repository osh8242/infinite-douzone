import { useState } from "react";

//로그인 상태와 해당 상태를 변경하는 함수  관리  커스텀 훅
const useLoginModel = () => {
  const [value, setValue] = useState("");

  const updateValue = (newValue) => {
    setValue(newValue);
    console.log("Update Value");
    console.log(newValue);
  };

  return {
    value,
    updateValue,
  };
};

export default useLoginModel;
