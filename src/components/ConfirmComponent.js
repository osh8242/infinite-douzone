import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmComponent(props) {
  
  return (
    <Modal {...props} backdrop="static" centered>
      <Modal.Body className="grid-example"> {props.message} </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>취소</Button>
        <Button variant="primary" onClick={props.onConfirm}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmComponent;