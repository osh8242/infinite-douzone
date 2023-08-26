// 작성자: 김진
/*
필수 parameter: optionList1(내외국민 구분), optionList2(성별)
선택 parameter: label(라벨명), value(주민등록번호)
props 속성들(textForm):
    type,
    label,
    size,
    disabled,
    readOnly,
    plaintext,
    value

*/

import React, { useEffect, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';

function NoSocialFormForEmpRegister(props) {
  //props 속성들
  const {
    type,
    label,
    size,
    disabled,
    readOnly,
    plaintext,
    value,
    optionList1,
    optionList2,
  } = props;

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
        <Col
          md="4"
          className="d-flex align-items-center justify-content-center"
        >
          {label}
        </Col>
        {/* 내외국민 구분 */}
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Select>
            {optionList1.map((option, index) => (
              <option value={option.key} key={index}>
                {option.value}
              </option>
            ))}
          </Form.Select>
        </Col>
        {/* 주민등록번호 */}
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
        {/* 성별 구분 */}
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Select>
            {optionList2.map((option, index) => (
              <option value={option.key} key={index}>
                {option.value}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </>
  );
}
export default NoSocialFormForEmpRegister;
