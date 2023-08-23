// 작성자: 김진
// 용도: TextBoxComponent를 여러 개 만들 때 사용합니다.

// parameter:
// count
// type, label, rows, size, disabled, readOnly, plaintext, value

import React, { useEffect, useState } from 'react';

function MultiTextBox(props) {
  //props 속성들
  const {
    type,
    label,
    rows,
    size,
    disabled,
    readOnly,
    plaintext,
    value,
    count,
  } = props;

  //입력값
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(props.value);
  }, [value]);

  return (
    <>
      <div>ddd</div>
    </>
  );
}

export default MultiTextBox;
