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
import { emailList, ynForList, genderRadioList } from "../model/CommonConstant";

function TextBoxComponent(props) {
  /* props 속성들*/
  const {
    type, // bootstrap type옵션  ex) textbox, regNum, email, password, file, date, color...
    // custom type 옵션          ex) callNumber, email, noSocial(내외국민,주민번호,성별 조합)
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

  useEffect(() => {
    console.log("sendValue", sendValue);
    // 업데이트된 sendValue 값을 이곳에서 사용할 수 있음
    // update 로직은 이 곳에서 사용하기로...
  }, [sendValue]);

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
      let updatedCallNumber = [...inputCallNumber];
      updatedCallNumber[index] = newValue;
      setInputCallNumber(updatedCallNumber); //보이는 value update
      let updatedCallValid = [...isCallValid];
      updatedCallValid[index] = validation(newValue);
      setIsCallValid(updatedCallValid); //유효성 검사 수행과 그 결과에 따른 클래스 변경
    } else if (type === "email") {
      //이메일 값 변경 로직 추가
      //이메일 아이디와 도메인 값을 각각 가져와서 합치기 -> setInputValue에 넣기
      //Enter 이벤트에 추가로 setSendValue에 값 넣기~
      let updatedEmail = "";
      if (event.target.id === `${id}-emailId`) {
        //바뀐 값이 이메일 아이디라면~
        // event.target.value = newValue;
        updatedEmail = newValue + "@" + value.split("@")[1];
        setInputValue(updatedEmail);
        console.log("updatedEmail", updatedEmail);
      } else if (event.target.id === `${id}-domain`) {
        //바뀐 값이 도메인이라면
        // event.target.value = newValue;
        updatedEmail = value.split("@")[0] + "@" + newValue;
        setInputValue(updatedEmail);
        console.log("updatedEmail", updatedEmail);
      }
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

  // 입력받은 amount의 수만큼 input을 반복하여주는 함수
  let idArray = []; // 각 input의 id값
  let inputElements = []; // 각 input
  if (amount >= 2) {
    idArray = id.split(",");
    for (let i = 0; i < amount; i++) {
      inputElements.push(
        <Form.Control
          id={idArray[i]}
          value={inputValue}
          type={type}
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

  // 화면 render
  return (
    <Row className="py-1">
      {label ? (
        <div className="labelAndContent">
          {/* input labels */}
          <div className="label">{label}</div>
          {/* input contents */}
          <div className="widthFull d-flex align-items-center">
            {subLabel ? (
              <Col
                // md={2}
                className="d-flex align-items-center justify-content-center"
                style={{ marginLeft: 15, marginRight: 15 }}
              >
                {subLabel}
              </Col>
            ) : (
              ""
            )}
            {selectList ? (
              <Col
                // md={4}
                style={{ marginRight: 12 }}
              >
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
              // 일반 TextBoxContent
              <div className="widthFull">
                {renderFormControl()}
                {selectList ? (
                  <div
                    // className="label"
                    style={{ marginLeft: 10 }}
                  >
                    {endLabel}
                  </div>
                ) : (
                  ""
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
                  {renderFormControl()}
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
            value={inputValue?.split("@")[1] || emailList[0].key}
            onChange={handleInputChange}
          >
            {emailList.map((option, index) => (
              <option value={option.key} key={index}>
                {option.value}
              </option>
            ))}
          </Form.Select>
        </div>
      );
    } else if (type === "noSocial") {
      //내외국민, 주민번호, 성별 조합 case
      {
        /* 내외국민 구분 */
      }
      // <div className="widthFull d-flex align-items-center justify-content-center">
      //   <Form.Select onChange={handleInputChange}>
      //     {ynForList?.map((option, index) => (
      //       <option value={option.value} key={option.key}>
      //         {option.value}
      //       </option>
      //     ))}
      //   </Form.Select>
      //   {/* 주민등록번호 */}
      //   <Form.Control
      //     onChange={handleInputChange}
      //     onKeyDown={handleKeyDown}
      //   ></Form.Control>
      //   {/* 성별 구분 */}
      //   <Form.Select onChange={handleInputChange}>
      //     {genderRadioList?.map((option, index) => (
      //       <option key={option.key} value={option.value}>
      //         {option.value}
      //       </option>
      //     ))}
      //   </Form.Select>
      // </div>;
    } else if (amount) {
      // amount 가 있다면 amount만큼의 input을 만들어준다.
      <div className="widthFull">{inputElements}</div>;
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
          />
        </div>
      );
    }
  }
}

export default TextBoxComponent;
