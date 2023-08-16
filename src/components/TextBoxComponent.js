import React from 'react';
import { Form } from 'react-bootstrap';


function TextBoxComponent(props) {
  
  return (
    <>
      <Form.Group controlId={props.controlId}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          size={props.size}
          disabled={props.disabled}
          readOnly={props.readOnly}
          // plaintext={props.plaintext}
        />
      </Form.Group>
    </>
  );
}

export default TextBoxComponent;