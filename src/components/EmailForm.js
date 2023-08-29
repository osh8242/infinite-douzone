import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

function EmailForm(props) {
  //props 속성들
  const { label, emEmp, optionList, pkValue, actions } = props;

  // ID와 DOMAIN값
  const emEmpId = useRef(null);
  const emEmpDomain = useRef(null);

  useEffect(() => {
    emEmpId.current.value = emEmp?.split("@")[0] || "";
    emEmpDomain.current.value = emEmp?.split("@")[1] || "";
  });

  //email값 수정
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const newEmEmpById = {
        emEmp: emEmpId.current.value + "@" + emEmpDomain.current.value,
        cdEmp: pkValue.cdEmp,
      };
      actions.setEmEmp(newEmEmpById);
    }
  };

  const handleEmpDomain = () => {
    const newEmEmpByDomain = {
      emEmp: emEmpId.current.value + "@" + emEmpDomain.current.value,
      cdEmp: pkValue.cdEmp,
    };
    actions.setEmEmp(newEmEmpByDomain);
  };

  return (
    <>
      <Row className="py-1 align-items-center">
        {label && (
          <Col
            className="d-flex align-items-center justify-content-center"
            md="4"
          >
            {label}
          </Col>
        )}
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control ref={emEmpId} onKeyDown={handleKeyDown} />
        </Col>
        @
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Select ref={emEmpDomain} onChange={handleEmpDomain}>
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
