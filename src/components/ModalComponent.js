/* 현소현
const [modalState, setModalState] = useState({ show: false , modalData: null });  //모달창

<ModalComponent title= {'제목'} show={modalState.show} onHide={() => setModalState({ ...modalState, show: false })} size="lg" centered>
    <p>내용</p> //children
</ModalComponent> 

 */

import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComponent(props) {
 
  const { 
    show,
    onHide,
    children, 
    title, 
    onConfirm, 
    size,   
    backdrop, 
    animation,
  } = props;

  return (
    <Modal
      show = {show}
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
