import React from "react";

import { Col, Form, Row } from "react-bootstrap";

function TextBoxComponent({ label }) {
  return (
    <Row className="py-1">
      <Col md="4" className="d-flex align-items-center justify-content-center">
        {label}
      </Col>
      <Col
        md="8"
        className="d-flex align-items-center justify-content-start align-self-center"
      >
        <label className="form-check-label">
          <Form.Control type="date" dateFormat="YYYY. MM. DD." />
        </label>
      </Col>
    </Row>
  );
}

export default TextBoxComponent;
