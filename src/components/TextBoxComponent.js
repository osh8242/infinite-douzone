// 작성자 : 현소현
import { faC } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  isNumber,
  makeCommaNumber,
  makePureNumber,
} from "../utils/NumberUtils";
import "./CustomInput.scss";

function TextBoxComponent(props) {
  /* props 속성들*/
  const {
    type,     // bootstrap type옵션  ex) textbox, regNum, email, password, file, date, color...
    id,
    name,
    label,
    value,

    rows,               // textarea 전용 옵션 [선택] (몇행짜리 textbox)
    codeHelper,         // 코드헬퍼 아이콘 생성
    onClickCodeHelper,  // 코드헬퍼 전용 옵션 선택시 [필수]
    
    size,
    thousandSeparator, //세자리 콤마
    suffix,   // %, 원화표시
    mask,     // '*'

    //이벤트 함수[선택]
    onChange, 
    onClick,
    onFocus,
    onKeyDown,

    // [선택] true false 옵션
    disabled,
    readOnly,
    plaintext,  //inputbox 말고 평문으로 바꿔주는 옵션

    //유효성 검사
    validationFunction,
    
  } = props;

  // console.log("label",label);
  // console.log("value",value);

  // 입력값
  const [inputValue, setInputValue] = useState(value);  // 보여줄 값
  const [sendValue, setSendValue] = useState(value);    // 보낼 값

  useEffect(() => {
    setInputValue(value || ""); // value prop이 변경될 때마다 inputValue를 업데이트
  }, [value]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onChange && onChange(sendValue);
    }
  }

  const handleInputChange = (event) => {
      const newValue = event.target.value;
      //setInputValue(makeProcessedValue(validation(event.target, newValue)));  //유효성 + data 가공  
      setInputValue(makeProcessedValue(newValue));  // data 가공
  }

  const makeProcessedValue = (newValue) => {
    let processedValue = newValue;

    if (suffix || thousandSeparator) {
      suffix && (processedValue = processSuffix(processedValue, suffix));
      thousandSeparator &&
        (processedValue = processThousandSeparator(processedValue));
        setSendValue(makePureNumber(processedValue));
    } else if (type === "regNum") {
      processedValue = /^\d{0,6}$/.test(newValue)
        ? newValue.replace(/(\d{6})(\d{0,1})/, "$1-$2")
        : newValue; //하이픈 넣기

      //마스킹처리 진행중...

      setSendValue(processedValue);
    } else {
      setSendValue(processedValue)
    }
    return processedValue;
  };

  const processSuffix = (value, suffix) => {
    const numValue = value.replaceAll(suffix, "");
    return numValue + suffix;
  };

  const processThousandSeparator = (value) => {
    const numValue = value.replaceAll(/,/g, "");
    return makeCommaNumber(numValue.toString());
  };

  //유효성 검사
  const validation = (object, value) => {
    let returnValue = value;

    if (thousandSeparator || suffix) {
      thousandSeparator && (value = value.replaceAll(/,/g, ""));
      suffix && (value = value.replaceAll(suffix, ""));

      if (!isNumber(value)) {
        alert("숫자만 입력해주세요.");
        returnValue = makePureNumber(value);
      }
    }

    if (type === "regNum") {
      // 주민등록번호 유효성
      if (value.length >= 14) {
        alert("13자리 입력해주세요.");
        returnValue = value.slice(0, 14);
      }
    }

    //validationFunction && validationFunction(value);
    return returnValue;
  };

  const handleInputFocus = (e) => {
    const obj = e.target;
    onFocus && onFocus(obj); // onFocus 이벤트 처리
  };

  return (
    <Row className="py-1">
      {label ? (
        <>
          <Col md="4" className="d-flex align-items-center justify-content-center">
            <div>{label}</div>
          </Col>
          <Col md="8" className="d-flex align-items-center justify-content-center">
            {codeHelper ? (
              <div className="svg-wrapper">
                <div className="svg-container">
                  {renderFormControl()}
                  <FontAwesomeIcon icon={faC} onClick={onClickCodeHelper} />
                </div>
              </div>
            ) : (
              <>{renderFormControl()}</>
            )}
          </Col>
        </>
      ) : (
        <>{renderFormControl()}</>
      )}
    </Row>
  );

  function renderFormControl() {
    if (type === "textarea") {
      return (
        <Form.Control
          as="textarea"
          id={id}
          name={name}
          rows={rows}
          onChange={handleInputChange}
          onClick={onClick}
        />
      );
    } else {
      return (
        <Form.Control
          //defaultValue={value}
          value={inputValue}
          type={type}
          id={id}
          name={name}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          plaintext={plaintext}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onClick={onClick}
          onKeyDown={handleKeyDown}
        />
      );
    }
  }
}

export default TextBoxComponent;
