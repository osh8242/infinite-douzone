import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function SelectForm({ label, optionList }) {
  return (
    <Row className="py-1">
      <Col md="4" className="d-flex align-items-center justify-content-center">
        <div>{label}</div>
      </Col>
      <Col md="8" className="d-flex align-items-center justify-content-center">
        <Form.Select>
          {optionList.map((option, index) => (
            <option value={option.key} key={index}>
              {option.value}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
}

export default SelectForm;
