// 작성자: 김진
// 용도: 전화번호 형식을 위한 TextBoxComponent
/*
  parameter: 
      label(라벨명)
      type(전화번호(숫자)와 텍스트 구분)
        - callNumber : 전화번호(숫자)
        - null or text : 텍스트
      val1(첫 번째 열의 값)
      val2(두 번째 열의 값)
      val3(세 번째 열의 값)
      pkValue(기본키 값)
      actions(update 등의 로직을 위한 set함수)
*/

import { Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useRef } from "react";
import "../styles/commonComponent.css";

function CallNumberForm(props) {
  //props 속성들
  const { label, type, val1, val2, val3, pkValue, actions } = props;

  const callNumber1 = useRef();
  const callNumber2 = useRef();
  const callNumber3 = useRef();

  const callNumberRefs = [callNumber1, callNumber2, callNumber3];

  useEffect(() => {
    callNumber1.current.value = val1 || "";
    callNumber2.current.value = val2 || "";
    callNumber3.current.value = val3 || "";
  }, [val1, val2, val3]);

  //pkValue값의 변화에 따라 style제거
  useEffect(() => {
    // 모든 ref의 "notValid" 클래스 제거
    callNumberRefs.forEach((ref) => {
      if (ref.current && ref.current.classList.contains("invalid")) {
        ref.current.classList.remove("invalid");
      }
    });
  }, [pkValue]);

  //update
  const handleKeyDown = (event) => {
    // 모든 요소에 'notValid' className이 없다면 True 반환
    const isValid = callNumberRefs.every(
      (ref) => ref && ref.current && !ref.current.classList.contains("invalid")
    );

    if (event.key === "Enter") {
      if (isValid === true) {
        let newEmpData = {};

        switch (label) {
          //전화번호
          case "전화번호":
            newEmpData = {
              telHome1: callNumber1.current.value,
              telHome2: callNumber2.current.value,
              telHome3: callNumber3.current.value,
              cdEmp: pkValue.cdEmp,
            };
            break;

          //모바일번호
          case "모바일번호":
            newEmpData = {
              celEmp1: callNumber1.current.value,
              celEmp2: callNumber2.current.value,
              celEmp3: callNumber3.current.value,
              cdEmp: pkValue.cdEmp,
            };
            break;

          //급여이체은행
          case "급여이체은행":
            newEmpData = {
              cdBank: callNumber1.current.value,
              noBnkacct: callNumber2.current.value,
              nmBnkowner: callNumber3.current.value,
              cdEmp: pkValue.cdEmp,
            };
            break;

          default:
            newEmpData = {
              cdEmp: pkValue.cdEmp,
            };
        }

        let item = {
          item: newEmpData,
        };
        actions.setNewEmp(item);
      } else {
        // 유효한 값이 아니면 Enter 이벤트 발생시 값을 원래값으로 되돌린다.
        alert("유효한 값이 아닙니다.");
        callNumber1.current.value = val1 ? val1 : "";
        callNumber2.current.value = val2 ? val2 : "";
        callNumber3.current.value = val3 ? val3 : "";
        // invalid 클래스 제거
        callNumberRefs.forEach((ref) => {
          if (ref.current && ref.current.classList.contains("invalid")) {
            ref.current.classList.remove("invalid");
          }
        });
        event.target.blur();
      }
    }
  };

  // 전화번호 타입의 유효성 검사 결과에 따른 스타일 변경 함수
  const updateValidationClass = (isValid) => {
    console.log("isValid => ", isValid);
    callNumberRefs.forEach((ref) => {
      ref.current.classList.toggle("invalid", !isValid);
    });
  };

  // 전화번호 타입의 유효성 검사 함수
  const onChangeCallNumber = (event) => {
    updateValidationClass(true);
    if (type === "callNumber") {
      let inputValue = event.target.value;
      // let lastChar = inputValue.slice(-1);
      // console.log("lastChar => ", lastChar);

      //전화번호 형식이 맞다면
      if (/^[0-9]{0,5}$/.test(inputValue) || inputValue === "") {
        console.log(inputValue);
        // console.log("isValid => ", isValid);
      } else {
        updateValidationClass(false);
        console.log("유효성검사 실패!");
        // console.log("isValid => ", isValid);
      }

      //숫자가 아니라면 마지막 글자 제거
      // if (!/^\d+$/.test(lastChar)) {
      //   event.target.value = inputValue.slice(0, -1);
      //   console.log("유효하지 않은 값입니다.");
      // }
    }
  };

  return (
    <>
      <Row>
        <div className="widthFull labelAndContent py-1">
          {label && <div className="label">{label}</div>}
          <div className="widthFull labelAndContent">
            <Form.Control
              ref={callNumber1}
              type={type}
              onKeyDown={handleKeyDown}
              onChange={(event) => onChangeCallNumber(event)}
            ></Form.Control>
            <Form.Control
              ref={callNumber2}
              type={type}
              onKeyDown={handleKeyDown}
              onChange={(event) => onChangeCallNumber(event)}
            ></Form.Control>
            <Form.Control
              ref={callNumber3}
              type={type}
              onKeyDown={handleKeyDown}
              onChange={(event) => onChangeCallNumber(event)}
            ></Form.Control>
          </div>
        </div>
      </Row>
    </>
  );
}

export default CallNumberForm;