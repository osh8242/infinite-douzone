// 작성자: 김진
// 용도: 전화번호 형식을 위한 TextBoxComponent

// parameter: type, label, size, disabled, readOnly, plaintext, value

import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

function CallNumberForm(props) {
  //props 속성들
  const { type, label, size, disabled, readOnly, plaintext, value } = props;

  //입력값
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(props.value);
  }, [value]);

  //마스킹 함수
  const handleInputValueChange = (event) => {
    const input = event.target.value;

    const maskedNumber = input.replace(
      /^(\d{6})(\d+)/,
      (match, group1, group2) => {
        const maskedGroup2 = group2.replace(/./g, '*');
        console.log('group1내용 : ' + group1);
        return `${group1}-${maskedGroup2}`;
      },
    );

    setInputValue(maskedNumber);
  };

  return (
    <>
      <Row className="py-1">
        {label && <Col md="4">{label}</Col>}
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control
            type={type}
            placeholder={props.placeholder}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            plaintext={plaintext}
            value={inputValue}
            onChange={handleInputValueChange}
          ></Form.Control>
        </Col>
        <Col>
          <Form.Control></Form.Control>
        </Col>
        <Col>
          <Form.Control></Form.Control>
        </Col>
      </Row>
    </>
  );
}

export default CallNumberForm;
