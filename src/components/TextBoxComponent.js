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
import "../styles/CustomInput.scss";
import SelectForm from "./SelectForm";

function TextBoxComponent(props) {
  /* props 속성들*/
  const {
    type, // bootstrap type옵션  ex) textbox, regNum, email, password, file, date, color...
    // custom type 옵션          ex) callNumber
    id,
    name,
    label,
    value,

    rows, // textarea 전용 옵션 [선택] (몇행짜리 textbox)
    //codeHelper, // 코드헬퍼 아이콘 생성
    onClickCodeHelper, // 코드헬퍼 전용 옵션 선택시 [필수]

    size,
    thousandSeparator, //세자리 콤마
    suffix, // %, 원화표시
    mask, // '*'

    //이벤트 함수[선택]
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onEnter,

    // [선택] true false 옵션
    disabled,
    readOnly,
    plaintext, //inputbox 말고 평문으로 바꿔주는 옵션

    //유효성 검사
    validationFunction,

    md = 4, // [선택]
    valueMd = 8,
    placeholder, // [선택]
    height, // [선택] 스타일

    isPeriod,
    subLabel = "",
    endLabel = "",
    selectList,
    optionList, //커스텀을 위한 selectList
  } = props;

  // 입력값
  const [inputValue, setInputValue] = useState(value || ""); // 보여줄 값
  const [sendValue, setSendValue] = useState(value || ""); // 보낼 값
  const style = height ? { height: `${height}px` } : {}; // 스타일 값

  // callNumber type인 경우 '-'를 기준으로 값을 분리하여 배열에 할당한다.
  const [inputCallNumber, setInputCallNumber] = useState(
    type === "callNumber" && value ? value.split("-") : ["", "", ""]
  );
  const [isCallValid, setIsCallValid] = useState([true, true, true]); //callNumber 유효값 검사 결과

  useEffect(() => {
    if (type === "callNumber" && value) {
      setInputCallNumber(value.split("-") || ["", "", ""]);
    } else {
      setInputValue(value || "");
    } // value prop이 변경될 때마다 inputValue를 업데이트
  }, [value]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (type === "callNumber") {
        makeProcessedValue();
      }
      onEnter && onEnter(event, sendValue, id);
    }
  };

  const handleInputChange = (event, index) => {
    const newValue = event.target.value;
    if (type === "callNumber") {
      const updatedCallNumber = [...inputCallNumber];
      updatedCallNumber[index] = newValue;
      setInputCallNumber(updatedCallNumber); //보이는 value update
      const updatedCallValid = [...isCallValid];
      updatedCallValid[index] = validation(newValue);
      setIsCallValid(updatedCallValid); //유효성 검사 수행과 그 결과에 따른 클래스 변경
    } else {
      //setInputValue(makeProcessedValue(validation(event.target, newValue)));  //유효성 + data 가공
      setInputValue(makeProcessedValue(newValue)); // data 가공
      onChange && onChange(newValue);
    }
  };

  //값 가공함수
  const makeProcessedValue = (newValue) => {
    let processedValue = newValue;

    if (suffix || thousandSeparator) {
      suffix && (processedValue = processSuffix(processedValue, suffix));
      thousandSeparator &&
        (processedValue = processThousandSeparator(processedValue));
      setSendValue(makePureNumber(processedValue));
      // 주민번호 유효성 검사
    } else if (type === "regNum") {
      processedValue = /^\d{0,6}$/.test(newValue)
        ? newValue.replace(/(\d{6})(\d{0,1})/, "$1-$2")
        : newValue; //하이픈 넣기

      //마스킹처리 진행중...

      setSendValue(processedValue);
    } else if (type === "callNumber") {
      //전화번호를 위한 input 3개의 값을 '-'와 함께 저장
      if (isCallValid) {
        let sendCallNumber = "";
        inputCallNumber.map((value, index) => {
          if (index < inputCallNumber.length - 1) {
            sendCallNumber += value + "-";
          } else {
            sendCallNumber += value;
          }
        });
        setSendValue(sendCallNumber);
        console.log(sendValue);
      }
    } else if (type === "email") {
      //email 다시 합쳐서 보내줘야 함!
      //email id값 가져오기
    } else {
      setSendValue(processedValue);
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
  const validation = (value) => {
    //parameter에 object가 있었음(쓰는 곳이 없어서 임시제거)
    let returnValue = true;

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
    } else if (type === "callNumber") {
      // 전화번호 유효성 검사
      if (/^[0-9]{0,4}$/.test(value) || value === "") {
        returnValue = true;
        setIsCallValid(true);
        console.log("유효성검사 성공한 값 => ", value);
      } else {
        returnValue = false;
        setIsCallValid(false);
        console.log("유효성검사 실패! => ", value);
      }
    }

    //validationFunction && validationFunction(value);
    return returnValue;
  };

  // boolean 타입의 배열의 값 중 하나라도 false 값이 있으면 false를 반환하는 함수 (유효성 검사 후 클래스 변환용 함수)
  const hasFalseValid = (arr) => {
    let result = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === false) {
        result = false;
      }
    }
    return result;
  };

  const handleInputFocus = (e) => {
    const obj = e.target;
    onFocus && onFocus(obj); // onFocus 이벤트 처리
  };

  return (
    <Row className="py-1">
      {label ? (
        <>
          <Col
            md={md}
            className="d-flex align-items-center justify-content-center"
          >
            <div>{label}</div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            {subLabel ? (
              <Col
                md={2}
                className="d-flex align-items-center justify-content-center"
                style={{ marginLeft: 15, marginRight: 15 }}
              >
                {subLabel}
              </Col>
            ) : (
              ""
            )}
            {selectList ? (
              <Col md={4} style={{ marginRight: 12 }}>
                <SelectForm optionList={selectList}></SelectForm>
              </Col>
            ) : (
              ""
            )}
            {onClickCodeHelper ? (
              type === "date" ? (
                //<div className="">
                <div className="svg-container2 svg-wrapper">
                  {renderFormControl()}
                  <FontAwesomeIcon icon={faC} onClick={onClickCodeHelper} />
                </div>
              ) : (
                //</div>
                <div className="svg-wrapper">
                  <div className="svg-container">
                    {renderFormControl()}
                    <FontAwesomeIcon icon={faC} onClick={onClickCodeHelper} />
                  </div>
                </div>
              )
            ) : (
              <>
                {renderFormControl()}
                {selectList ? (
                  <Col style={{ marginLeft: 10 }}>{endLabel}</Col>
                ) : (
                  ""
                )}
              </>
            )}
            {isPeriod ? (
              <>
                {" ~ "}
                <Col
                  md={6}
                  className="d-flex align-items-center justify-content-center"
                >
                  {renderFormControl()}
                </Col>
              </>
            ) : (
              ""
            )}
            {endLabel && !selectList ? (
              <Col md={2} style={{ marginLeft: 15, marginRight: 15 }}>
                {endLabel}
              </Col>
            ) : (
              ""
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
          value={inputValue}
          onChange={handleInputChange}
          onClick={onClick}
        />
      );
    } else if (type === "callNumber") {
      return (
        <div className="d-flex align-items-center justify-content-center gap-4">
          {inputCallNumber.map((value, index) => (
            <Form.Control
              key={index}
              value={value}
              type="text"
              id={`callNumber${index + 1}`}
              disabled={disabled}
              onKeyDown={(event) => handleKeyDown(event, value)}
              onChange={(event) => handleInputChange(event, index)}
              onFocus={handleInputFocus}
              className={hasFalseValid(isCallValid) ? "" : "invalid"}
            />
          ))}
        </div>
      );
    } else if (type === "email") {
      return (
        <div className="widthFull d-flex align-items-center justify-content-center gap-2">
          <Form.Control
            value={value?.split("@")[0]}
            onKeyDown={handleKeyDown}
          />
          @
          <Form.Select
            value={value?.split("@")[1]}
            onChange={handleInputChange}
          >
            {optionList.map((option, index) => (
              <option value={option.key} key={index}>
                {option.value}
              </option>
            ))}
          </Form.Select>
        </div>
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
          placeholder={placeholder ? placeholder : undefined}
          style={style}
        />
      );
    }
  }
}

export default TextBoxComponent;
