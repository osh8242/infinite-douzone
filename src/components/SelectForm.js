import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function SelectForm({ label, optionsList }) {
  return (
    <Row className="py-1">
      <Col md="4" className="d-flex align-items-center justify-content-center">
        <div>{label}</div>
      </Col>
      <Col md="8" className="d-flex align-items-center justify-content-center">
        <Form.Select>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

export default SelectForm;
