import React from "react";
import { useLogin } from "./LoginContext";
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
  const { values, updateValue } = useLogin();
  const style = height ? { height: `${height}px` } : {};

  return (
    <Row className="justify-content-center mb-4">
      <Col md="8">
        <Form.Control
          type={type}
          size={size}
          value={values[name]}
          onChange={(e) => updateValue(name, e.target.value)}
          placeholder={placeholder ? placeholder : undefined}
          style={style}
        />
      </Col>
    </Row>
  );
};

export default TextComponent;
