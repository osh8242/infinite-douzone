/* 현소현
const [modalState, setModalState] = useState({ show: false , modalData: null });  //모달창

<ModalComponent title= {'제목'} show={modalState.show} onHide={() => setModalState({ ...modalState, show: false })} size="lg" centered>
    <p>내용</p> //children
</ModalComponent> 

 */

import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import "../styles/commonComponent.css";

function ModalComponent(props) {
  const {
    children,
    show,
    title,
    onHide,
    size, // xs, sm, md, lg, xl, xxl
    backdrop,
    animation,
  } = props;

  // 현재 모달창의 포커스
  const focus = useRef(false);

  // 포커스 전환
  useEffect(() => {
    focus.current = show ? true : false;
  }, [show]);

  //키다운 핸들러
  const tableKeyDownHandler = useCallback(
    (event) => {
      if (focus.current) {
        switch (event.key) {
          case "Escape":
            onHide();
            break;
          default:
            break;
        }
      }
    },
    [onHide]
  );

  // 이벤트 핸들러 등록 (componentDidMount 역할)
  useEffect(() => {
    document.addEventListener("keydown", tableKeyDownHandler);

    return () => {
      document.removeEventListener("keydown", tableKeyDownHandler);
    };
  }, [tableKeyDownHandler]);

  return (
    <Modal
      show={show}
      size={size}
      backdrop={backdrop}
      animation={animation}
      centered
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <FontAwesomeIcon
          className="modal-closeBtn"
          icon={faRectangleXmark}
          onClick={onHide}
        />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer />
    </Modal>
  );
}

export default ModalComponent;
