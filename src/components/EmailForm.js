import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

function EmailForm(props) {
  //props 속성들
  const {
    type,
    label,
    size,
    disabled,
    readOnly,
    plaintext,
    value,
    optionList,
  } = props;

  // domain과 아이디 값
  const email = value?.split("@");
  const userEmailId = email?.[0];
  const domain = email?.[1];

  //////////////////////////////////////////
  //수정하는 로직은 추후 수정예정
  //////////////////////////////////////////

  return (
    <>
      <Row className="py-1">
        {label && (
          <Col
            className="d-flex align-items-center justify-content-center"
            md="4"
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
            value={userEmailId}
          ></Form.Control>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Select default={"domain"}>
            {optionList.map((option, index) => (
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

export default EmailForm;
