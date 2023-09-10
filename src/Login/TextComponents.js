import React from "react";
import { useLogin } from "./LoginProvider";
import { Col, Form, Row } from "react-bootstrap";

const TextComponent = ({
  type,
  label,
  size,
  md = 4,
  placeholder,
  height,
  name,
}) => {
  const { loginInfo, updateLoginInfo } = useLogin(); // login 정보 저장
  const style = height ? { height: `${height}px` } : {};

  return (
    <Row className="justify-content-center mb-4">
      <Col md="8">
        <Form.Control
          type={type}
          size={size}
          value={loginInfo[name]}
          onChange={(e) => updateLoginInfo(name, e.target.value)}
          placeholder={placeholder ? placeholder : undefined}
          style={style}
        />
      </Col>
    </Row>
  );
};

export default TextComponent;
