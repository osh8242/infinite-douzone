// 작성자: 김진
// 용도: 전화번호 형식을 위한 TextBoxComponent
/*
  parameter: 
      label(라벨명)
      val1(첫 번째 열의 값)
      val2(두 번째 열의 값)
      val3(세 번째 열의 값)
      pkValue(기본키 값)
      actions(update 등의 로직을 위한 set함수)
*/

import { Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useRef } from "react";

function CallNumberForm(props) {
  //props 속성들
  const { label, val1, val2, val3, pkValue, actions } = props;

  const callNumber1 = useRef();
  const callNumber2 = useRef();
  const callNumber3 = useRef();

  useEffect(() => {
    callNumber1.current.value = val1 || "";
    callNumber2.current.value = val2 || "";
    callNumber3.current.value = val3 || "";
  });

  //update
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

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

      actions.setNewEmp(newEmpData);
    }
  };

  return (
    <>
      <Row className="py-1">
        {label && (
          <Col
            md="4"
            className="d-flex align-items-center justify-content-center"
          >
            {label}
          </Col>
        )}
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control
            ref={callNumber1}
            onKeyDown={handleKeyDown}
          ></Form.Control>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control
            ref={callNumber2}
            onKeyDown={handleKeyDown}
          ></Form.Control>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control
            ref={callNumber3}
            onKeyDown={handleKeyDown}
          ></Form.Control>
        </Col>
      </Row>
    </>
  );
}

export default CallNumberForm;
