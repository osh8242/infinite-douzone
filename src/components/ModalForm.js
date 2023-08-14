import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalForm(props) {
  function onClickHandeler(e) {
    alert("클릭클릭");
  }
  return (
  
    <Modal {...props} 
      size={props.size} 
      backdrop={props.backdrop}
      animation = {props.animation}
      centered
    >
      
      {/* <Modal.Header closeButton> */}
      <Modal.Header>
        <Modal.Title>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Container> 
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>모달창 닫기</Button>
        <Button variant="primary" onClick={onClickHandeler}> 모달창에서 처리 </Button>
      </Modal.Footer>

    </Modal>
  );
}

export default ModalForm;