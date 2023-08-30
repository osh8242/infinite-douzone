/* 현소현
const [modalState, setModalState] = useState({ show: false , modalData: null });  //모달창

<ModalComponent title= {'코드도움'} show={modalState.show} onHide={() => setModalState({ ...modalState, show: false })} size="lg" centered>
    <p>안녕하세요우!</p> //children
</ModalComponent> 

 */

import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComponent(props) {
  const { children, title, onHide, onConfirm, size, backdrop, animation,} = props;
  return (
    <Modal
      {...props}
      size={size}
      backdrop={backdrop}
      animation={animation}
      centered
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            확인
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
