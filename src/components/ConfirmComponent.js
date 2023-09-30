/*
  현소현
  const [confirmState, setConfirmState] = useState({
    show: false
  });

  const ConfirmClickHandler =()=>{
    setConfirmState({
      show: true
    });
  }

  const onConfirm = () => {
    확인후 처리할 함수
    setConfirmState({ ...confirmState, show: false });
  } 

  <Button variant="primary" onClick={ConfirmClickHandler}>confirm창 버튼</Button>
  <ConfirmComponent show={confirmState.show} onHide={() => setConfirmState({ ...confirmState, show: false })} message="삭제하시겠습니까?" onConfirm={onConfirm} />

*/
import React, { useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/confirmComponent.css";
import "../styles/fonts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFileCircleCheck,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

function ConfirmComponent(props) {
  const { show, onHide, message, onConfirm, onlyConfirm = false } = props;

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
          case "Enter":
            onConfirm();
            break;
          case "Escape":
            onHide();
            break;
          default:
            break;
        }
      }
    },
    [onConfirm, onHide]
  );

  // 이벤트 핸들러 등록 (componentDidMount 역할)
  useEffect(() => {
    document.addEventListener("keydown", tableKeyDownHandler);

    return () => {
      document.removeEventListener("keydown", tableKeyDownHandler);
    };
  }, [tableKeyDownHandler]);

  return (
    <Modal show={show} backdrop="static" centered>
      <Modal.Body className="grid-example SUITE">
        <FontAwesomeIcon icon={faCircleCheck} className="confirmCheckIcon" />
        <div className="p-16">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <div className="btnGroup">
          {!onlyConfirm && (
            <Button variant="secondary" onClick={onHide} className="cancleBtn">
              <FontAwesomeIcon icon={faXmark} />
              &nbsp;취소
            </Button>
          )}
          <Button
            variant="primary"
            onClick={() => onConfirm()}
            className="confirmBtn"
          >
            <FontAwesomeIcon icon={faCheck} />
            &nbsp;확인
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmComponent;
