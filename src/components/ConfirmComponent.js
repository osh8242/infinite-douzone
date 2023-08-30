import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmComponent(props) {
  const { message, onHide, onConfirm, show } = props;

  return (
    <Modal show={show} backdrop="static" centered>
      <Modal.Body className="grid-example"> {message} </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmComponent;
