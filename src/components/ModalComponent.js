/* 현소현
const [modalState, setModalState] = useState({ show: false , modalData: null });  //모달창

<ModalComponent title= {'제목'} show={modalState.show} onHide={() => setModalState({ ...modalState, show: false })} size="lg" centered>
    <p>내용</p> //children
</ModalComponent> 

 */

import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
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
    parentRef,
  } = props;
  const modalFocus = useRef(show);
  useEffect(() => {
    modalFocus.current = show;
  }, [modalFocus]);

  const tableKeyDownHandler = useCallback(
    (event) => {
      if (tableFocus.current) {
        event.preventDefault();
          switch (event.key) {
            case "Escape":
  
              break;
            case "Enter":

              break;

            default:
              break;
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [

    ]
  );

    //componentDidMount
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
