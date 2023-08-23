// 작성자: 김진
// 용도: 전화번호 형식을 위한 TextBoxComponent
/*
  parameter: value1(cell1), value2(cell2), value3(cell3)
  props:
  type, label, size, disabled, readOnly, plaintext, value1, value2, value3
*/

import { Col, Form, Row } from 'react-bootstrap';
import React from 'react';

function CallNumberForm(props) {
  //props 속성들
  const {
    type,
    label,
    size,
    disabled,
    readOnly,
    plaintext,
    value1,
    value2,
    value3,
  } = props;

  //////////////////////////////////////////////////////////
  // 값을 수정하는 로직은 추후 수정예정
  const handleValue1 = (e) => {
    value1 = e.target.value;
  };
  const handleValue2 = (e) => {
    value2 = e.target.value;
  };
  const handleValue3 = (e) => {
    value3 = e.target.value;
  };
  //////////////////////////////////////////////////////////

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
            type={type}
            placeholder={props.placeholder}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            plaintext={plaintext}
            value={value1}
            onChange={handleValue1}
          ></Form.Control>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control
            type={type}
            placeholder={props.placeholder}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            plaintext={plaintext}
            value={value2}
            onChange={handleValue2}
          ></Form.Control>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control
            type={type}
            placeholder={props.placeholder}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            plaintext={plaintext}
            value={value3}
            onChange={handleValue3}
          ></Form.Control>
        </Col>
      </Row>
    </>
  );
}

export default CallNumberForm;
