import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComponent(props) {
  return (
    <Modal
      {...props}
      size={props.size}
      backdrop={props.backdrop}
      animation={props.animation}
      centered
    >
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          닫기
        </Button>
        {props.onConfirm && (
          <Button variant="primary" onClick={props.onConfirm}>
            확인
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
