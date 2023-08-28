// 작성자: 김진
// 용도: 전화번호 형식을 위한 TextBoxComponent
/*
  parameter: value1(cell1), value2(cell2), value3(cell3)
  props:
  type, label, size, disabled, readOnly, plaintext, value1, value2, value3
*/

import { Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useRef } from "react";

function CallNumberForm(props) {
  //props 속성들
  const { label, num1, num2, num3, pkValue } = props;

  const callNumber1 = useRef();
  const callNumber2 = useRef();
  const callNumber3 = useRef();

  useEffect(() => {
    callNumber1.current.value = num1;
    callNumber2.current.value = num2;
    callNumber3.current.value = num3;
  });

  //num1 update
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //update
      const newCallNumber1 = {};
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
          <Form.Control ref={callNumber1}></Form.Control>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control ref={callNumber2}></Form.Control>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control ref={callNumber3}></Form.Control>
        </Col>
      </Row>
    </>
  );
}

export default CallNumberForm;
