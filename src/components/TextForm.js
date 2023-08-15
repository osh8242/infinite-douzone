import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function TextForm({ label }) {
  return (
    <Row className="py-1">
      <Col md="4" className="d-flex align-items-center justify-content-center">
        <div>{label}</div>
      </Col>
      <Col md="8" className="d-flex align-items-center justify-content-center">
        <Form.Control type="text" />
      </Col>
    </Row>
  );
}

export default TextForm;
