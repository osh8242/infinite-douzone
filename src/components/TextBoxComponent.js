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
import "../styles/commonComponent.css";
import SelectForm from "./SelectForm";
import { EMAIL_LIST, RADIO_LIST } from "../model/CommonConstant";

function TextBoxComponent(props) {
  /* props 속성들*/
  const {
    type, // bootstrap type옵션  ex) textbox, regNum, email, password, file, date, color...
    // custom type 옵션          ex) callNumber, email, noSocial(내외국민,주민번호,성별 조합)
    id,
    subId,
    name,
    label,
    value,
    subValue,

    rows, // textarea 전용 옵션 [선택] (몇행짜리 textbox)
    //codeHelper, // 코드헬퍼 아이콘 생성
    onClickCodeHelper, // 코드헬퍼 전용 옵션 선택시 [필수]

    size,
    thousandSeparator, //세자리 콤마
    suffix, // %, 원화표시
    mask, // '*'
    amount, // [선택] input의 개수 (기본 type 제공, 모든 input은 공통된 type을 가지게 됩니다.) ex) amount={3}
    // amount 값 입력시 각각의 input에 넣을 id 값을 ',' 로 구분하여 문자열로 제공해야 합니다. ex) id="id1,id2,id3"

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
    // valueMd = 8,
    placeholder, // [선택]
    height, // [선택] 스타일

    isPeriod,
    subLabel = "",
    endLabel = "",
    selectList,
  } = props;

  // 입력값
  const [inputValue, setInputValue] = useState(value || ""); // 보여줄 값
  const [inputSubValue, setInputSubValue] = useState(subValue || ""); // 보여줄 값
  const [sendValue, setSendValue] = useState(value || ""); // 보낼 값
  const [sendSubValue, setSendSubValue] = useState(subValue || ""); // 보낼 값
  const style = height ? { height: `${height}px` } : {}; // 스타일 값

  // callNumber type인 경우 '-'를 기준으로 값을 분리하여 배열에 할당한다.
  const [inputCallNumber, setInputCallNumber] = useState(
    type === "callNumber" && value ? value.split("-") : ["", "", ""]
  );
  const [isValid, setIsValid] = useState([true]); // 기본 유효성 검사 상태 값
  const [isCallValid, setIsCallValid] = useState([true, true, true]); //callNumber 유효값 검사 결과

  useEffect(() => {
    if (type === "callNumber" && value) {
      setInputCallNumber(value.split("-") || ["", "", ""]);
    } else {
      setInputValue(value || "");
      setInputSubValue(subValue || "");
    } // value prop이 변경될 때마다 inputValue를 업데이트
  }, [value, subValue]);

  // useEffect(() => {
  //   console.log("sendValue", sendValue);

  //   // 업데이트된 sendValue 값을 이곳에서 사용할 수 있음
  //   // update 로직은 이 곳에서 사용하기로...
  // }, [sendValue]);

  const alertErrorMessage = () => {
    alert("입력된 값이 유효하지 않습니다");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (type === "callNumber") {
        makeProcessedValue();
      } else if (type === "regNum") {
        if (/^\d{6}-\d{7}$/.test(inputValue) || "") {
          //유효성에 맞다면 update 요청을 보낼 수 있다
        } else {
          // alert("유효하지 않은 주민번호");
          alertErrorMessage();
        }
      }
      onEnter && onEnter(event, sendValue, id);
      if (subValue) onEnter && onEnter(event, sendSubValue, subId);
    }
  };

  const handleInputChange = (event, index) => {
    const newValue = event.target.value;

    if (type === "callNumber") {
      let updatedCallNumber = [...inputCallNumber];
      updatedCallNumber[index] = newValue;
      setInputCallNumber(updatedCallNumber); //보이는 value update
      let updatedCallValid = [...isCallValid];
      updatedCallValid[index] = validation(newValue);
      setIsCallValid(updatedCallValid); //유효성 검사 수행과 그 결과에 따른 클래스 변경
    } else if (type === "email") {
      //이메일 값 변경 로직
      let updatedEmail = "";
      if (event.target.id === `${id}-emailId`) {
        //바뀐 값이 이메일 아이디라면
        updatedEmail = newValue + "@" + value.split("@")[1];
        setInputValue(updatedEmail);
      } else if (event.target.id === `${id}-domain`) {
        //바뀐 값이 도메인이라면
        updatedEmail = value.split("@")[0] + "@" + newValue;
        setInputValue(updatedEmail);
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
      //setInputValue(makeProcessedValue(validation(event.target, newValue)));  //유효성 + data 가공
      if (event.target.id === id)
        setInputValue(makeProcessedValue(newValue)); // data 가공
      else setInputSubValue(makeProcessedValue(newValue));
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
    } else if (type === "regNum") {
      // 주민번호 유효성 검사
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
        // console.log("유효성검사 성공한 값 => ", value);
      } else {
        returnValue = false;
        setIsCallValid(false);
        // console.log("유효성검사 실패! => ", value);
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

  // 입력받은 amount의 수만큼 input을 반복하여주는 함수
  // let idArray = []; // 각 input의 id값
  // let inputElements = []; // 각 input
  // if (amount >= 2) {
  //   idArray = id.split(",");
  //   for (let i = 0; i < amount; i++) {
  //     inputElements.push(
  //       <Form.Control
  //         id={idArray[i]}
  //         value={inputValue}
  //         type={type}
  //         name={name}
  //         size={size}
  //         disabled={disabled}
  //         readOnly={readOnly}
  //         plaintext={plaintext}
  //         onChange={handleInputChange}
  //         onFocus={handleInputFocus}
  //         onClick={onClick}
  //         onKeyDown={handleKeyDown}
  //         placeholder={placeholder ? placeholder : undefined}
  //         style={style}
  //       />
  //     );
  //   }
  // }

  // 화면 render
  return (
    <Row className="py-1">
      {label ? (
        <div className="labelAndContent">
          {/* input labels */}
          <div className="label">{label}</div>
          {/* input contents */}
          <div className="widthFull d-flex align-items-center">
            {subLabel && (
              <div
                // md={2}
                className="d-flex align-items-center justify-content-center"
                style={{ marginLeft: 15, marginRight: 15 }}
              >
                {subLabel}
              </div>
            )}
            {selectList && (
              <div
              // md={4}
              // style={{ marginRight: 12 }}
              >
                <SelectForm optionList={selectList}></SelectForm>
              </div>
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
              // 일반 TextBoxContent
              <div className="widthFull">
                {renderFormControl()}
                {selectList && (
                  <div
                    // className="label"
                    style={{ marginLeft: 10 }}
                  >
                    {endLabel}
                  </div>
                )}
              </div>
            )}
            {isPeriod ? (
              <>
                {" ~ "}
                <div
                  // md={6}
                  className="widthFull d-flex align-items-center justify-content-center"
                >
                  <Form.Control
                    value={inputSubValue}
                    type={type}
                    id={subId}
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
                </div>
              </>
            ) : (
              ""
            )}
            {endLabel && !selectList ? (
              <div
                // md={2}
                // className="label"
                style={{ marginLeft: 15, marginRight: 15 }}
              >
                {endLabel}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        // label 이 없는 경우
        <div>{renderFormControl()}</div>
      )}
    </Row>
  );
  function renderFormControl() {
    if (type === "textarea") {
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
    } else if (type === "callNumber") {
      // 전화번호
      return (
        <div className="widthFull d-flex align-items-center gap-4">
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
      // 이메일
      return (
        <div className="widthFull d-flex align-items-center gap-2">
          <Form.Control
            type="text"
            id={`${id}-emailId`}
            value={inputValue.split("@")[0] || inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            undefined={undefined}
          />
          <span>@</span>
          <Form.Select
            id={`${id}-domain`}
            value={inputValue?.split("@")[1] || EMAIL_LIST[0].key}
            onChange={handleInputChange}
          >
            {EMAIL_LIST.map((option, index) => (
              <option value={option.key} key={index}>
                {option.value}
              </option>
            ))}
          </Form.Select>
        </div>
      );
    } else {
      return (
        // inputs
        <div className="widthFull">
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
            className={isValid ? "" : "invalid"}
          />
        </div>
      );
    }
  }
}

export default TextBoxComponent;
