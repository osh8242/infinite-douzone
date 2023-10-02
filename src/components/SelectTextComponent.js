// 작성자 : 현소현
import { faC, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { EMAIL_LIST } from "../model/CommonConstant";
import "../styles/CustomInput.scss";
import "../styles/commonComponent.css";
import {
  isNumber,
  makeCommaNumber,
  makePureNumber,
} from "../utils/NumberUtils";
import SelectForm from "./SelectForm";

function SelectTextComponent(props) {
  /* props 속성들*/
  const {
    type, // bootstrap type옵션  ex) textbox, regNum, email, password, file, date, color...
    // custom type 옵션          ex) callNumber, email( text & select )
    id,
    // subId,
    name,
    label,
    value,
    // subValue,

    rows, // textarea 전용 옵션 [선택] (몇행짜리 textbox)
    //codeHelper, // 코드헬퍼 아이콘 생성
    onClickCodeHelper, // 코드헬퍼 전용 옵션 선택시 [필수]

    size,
    thousandSeparator, //세자리 콤마
    suffix, // %, 원화표시
    mask, // '*'
    // amount, // [선택] input의 개수 (기본 type 제공, 모든 input은 공통된 type을 가지게 됩니다.) ex) amount={3}
    // amount 값 입력시 각각의 input에 넣을 id 값을 ',' 로 구분하여 문자열로 제공해야 합니다. ex) id="id1,id2,id3"

    //이벤트 함수[선택]
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onEnter,
    className,

    // [선택] true false 옵션
    disabled,
    readOnly,
    plaintext, //inputbox 말고 평문으로 바꿔주는 옵션

    //유효성 검사
    validationFunction,

    // md = 4, // [선택]
    // valueMd = 8,
    placeholder, // [선택]
    height, // [선택] 스타일

    isPeriod,
    subLabel = "",
    endLabel = "",

    // select
    onChangeSelect,
    selectId,
    selectList,
    selectedOption,
    selectRef,
    subField,
  } = props;

  // 입력값
  const [inputValue, setInputValue] = useState(value || ""); // 보여줄 값
  const [inputCallValue, setInputCallValue] = useState(["", "", ""]); // 보여줄 값 (전화번호)
  // const [inputSubValue, setInputSubValue] = useState(subValue || ""); // 보여줄 값
  const [sendValue, setSendValue] = useState(value || ""); // 보낼 값
  // const [sendSubValue, setSendSubValue] = useState(subValue || ""); // 보낼 값
  const style = height ? { height: `${height}px` } : {}; // 스타일 값

  const [isValid, setIsValid] = useState(true); // 기본 유효성 검사 상태 값
  const [isCallValid, setIsCallValid] = useState([true, true, true]); //callNumber 유효값 검사 결과

  const [selectedValue, setSelectedValue] = useState(selectedOption);

  useEffect(() => {
    setSelectedValue(selectedOption);
    console.log(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    setInputValue(value || "");
    // setInputSubValue(subValue || "");
    if (type === "callNumber") {
      let callNumber = value.split("-");
      setInputCallValue(callNumber);
    }
  }, [value]);

  // 유효하지 않은 값이 있을 때 alert 창을 띄우는 함수
  const alertErrorMessage = () => {
    alert("입력된 값이 유효하지 않습니다");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (type === "callNumber") {
        if (isValid) {
          // 해당하는 전화번호 input의 값만 update
          onEnter && onEnter(event, event.target.value);
        } else {
          alertErrorMessage();
        }
      } else if (type === "regNum") {
        if (/^\d{6}-\d{7}$/.test(inputValue) || "") {
          //유효성에 맞다면 update 요청을 보낼 수 있다
          setSendValue(inputValue);
          onEnter && onEnter(event, inputValue, id);
        } else {
          alertErrorMessage();
        }
      } else if (type === "email") {
        setSendValue(inputValue);
        onEnter && onEnter(event, inputValue, id);
      } else {
        onEnter && onEnter(event, sendValue, id);
        // if (subValue) onEnter && onEnter(event, sendSubValue, subId);
      }
    }
  };

  const handleInputChange = (event, index) => {
    const newValue = event.target.value;

    if (type === "callNumber") {
      //전화번호
      setIsValid(true); // 스타일 초기화

      // 입력 값 update
      let updatedCallNumber = [...inputCallValue];
      updatedCallNumber[index] = newValue;
      setInputCallValue(updatedCallNumber);

      // 유효성 검사 후 유효상태 update
      let updatedCallNumberValid = [...isCallValid];
      updatedCallNumberValid[index] = validation(newValue);
      setIsCallValid(updatedCallNumberValid);

      // 전체 배열의 유효값 검사 후 스타일 변경
      hasFalseValid(updatedCallNumberValid);
    } else if (type === "email") {
      //이메일 값 변경 로직
      let updatedEmail = "";
      if (event.target.id === `${id}Id`) {
        //바뀐 값이 이메일 아이디라면
        updatedEmail = newValue + "@" + (inputValue.split("@")[1] || "");
        setInputValue(updatedEmail);
      } else if (event.target.id === `${id}Domain`) {
        //바뀐 값이 도메인이라면
        updatedEmail = (inputValue.split("@")[0] || "") + "@" + newValue;
        setInputValue(updatedEmail);

        onChange && onChange("", updatedEmail, id);
      }
    } else if (type === "regNum") {
      //주민등록번호 유효값 검사
      setInputValue(newValue);
      makeProcessedValue(newValue);
      if (!/^\d{6}-\d{1,7}$/.test(newValue)) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      // setSendValue(inputValue);
      //setInputValue(makeProcessedValue(validation(event.target, newValue)));  //유효성 + data 가공
      //if (event.target.id === id)
      setInputValue(makeProcessedValue(newValue)); // data 가공
      // else setInputSubValue(makeProcessedValue(newValue));
      onChange && onChange(event, newValue, id);
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
    } else if (type === "regNum") {
      processedValue = /^\d{0,6}$/.test(newValue)
        ? newValue.replace(/(\d{6})(\d{0,1})/, "$1-$2")
        : newValue; //하이픈 넣기
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

        setSendValue(value);
      }
    } else if (type === "callNumber") {
      // 전화번호 유효성 검사
      if (/^[0-9]{0,4}$/.test(value) || value === "") {
        returnValue = true;
      } else {
        returnValue = false;
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
        setIsValid(false);
        return false;
      }
    }
    return result;
  };

  const handleInputFocus = (e) => {
    const obj = e.target;
    onFocus && onFocus(obj); // onFocus 이벤트 처리
  };

  // callNumber 타입 컴포넌트 배열
  const callNumberComponents = [];
  for (let i = 1; i <= 3; i++) {
    callNumberComponents.push(
      <Form.Control
        id={`${id}${i}`}
        key={i}
        type="callNumber"
        value={inputCallValue[i - 1] || ""}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onChange={(event) => handleInputChange(event, i - 1)}
        onFocus={handleInputFocus}
        className={isValid ? "" : "invalid"}
      />
    );
  }

  // regNum type onClick 이벤트 함수
  const handleOnClick = () => {
    switch (type) {
      case "regNum":
        break;
      default:
    }
  };

  const handleSelectChange = (event) => {
    console.log("subField");
    console.log(subField);
    // if (event.target.value === "F")
    // disable true 변경
    console.log("value" + event.target.value);
    event.target.id = subField;
    console.log("id" + event.target.id);
    const newValue = selectRef ? selectRef.current.value : event.target.value;
    if (onChangeSelect) onChangeSelect(event, newValue);
    // console.log(newValue);
    setSelectedValue(newValue);
  };

  // 화면 render
  return (
    <Row className="py-1">
      <div className="labelAndContent">
        {label && <div className="label">{label}</div>}

        <div className="widthFull d-flex align-items-center">
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
              {selectList ? (
                <div className="widthFull d-flex align-items-center gap-2">
                  <div style={{ width: "40%" }}>
                    <SelectForm
                      optionList={selectList}
                      onChange={handleSelectChange}
                    ></SelectForm>
                  </div>
                  <div>{renderFormControl()} </div>
                  <div> {endLabel}</div>
                </div>
              ) : (
                <>
                  {subLabel ? (
                    <div className="widthFull d-flex align-items-center justify-content-between">
                      <div className="widthFull d-flex align-items-center">
                        <div
                          style={{ width: "28%" }}
                          className="d-flex justify-content-end"
                        >
                          {subLabel}
                        </div>
                        <div
                          style={{
                            width: "38%",
                            paddingLeft: 20,
                          }}
                        >
                          {renderFormControl()}
                        </div>
                        <div
                          className="d-flex justify-content-start"
                          style={{
                            width: "30%",
                            paddingLeft: 10,
                          }}
                        >
                          {endLabel}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // 일반 TextBoxContent
                    <>{renderFormControl()}</>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Row>
  );
  function renderFormControl() {
    switch (type) {
      case "textarea":
        return (
          <div className="widthFull">
            <Form.Control
              as="textarea"
              id={id}
              name={name}
              rows={rows}
              value={inputValue}
              onChange={handleInputChange}
              onClick={onClick}
            />
          </div>
        );
      case "callNumber":
        // 전화번호
        return (
          <div className="widthFull d-flex align-items-center gap-2">
            {callNumberComponents}
          </div>
        );
      case "email":
        // 이메일
        return (
          <div className="widthFull d-flex align-items-center gap-2">
            <Form.Control
              type="text"
              id={`${id}Id`}
              value={inputValue.split("@")[0] || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              // undefined={undefined}
            />
            <span>@</span>
            <Form.Select
              id={`${id}Domain`}
              value={inputValue.split("@")[1] || EMAIL_LIST[0].value}
              onChange={handleInputChange}
            >
              {EMAIL_LIST.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.value}
                </option>
              ))}
            </Form.Select>
          </div>
        );
      default:
        return (
          // inputs
          <div className="widthFull">
            <Form.Control
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
              className={isValid ? "" : "invalid"}
            />
            {/* {type === "regNum" && (
              <FontAwesomeIcon
                className="hide"
                style={{ colod: "gray" }}
                icon={faEyeSlash}
                onClick={handleOnClick}
              />
            )} */}
            {/* {type === "regNum" && <FontAwesomeIcon icon={faEye} />} */}
          </div>
        );
    }
  }
}

export default SelectTextComponent;
