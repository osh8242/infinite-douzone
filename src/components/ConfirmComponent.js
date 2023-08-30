/*
  현소현
  const [confirmState, setConfirmState] = useState({
    show: false,
    props: {},
  });

  const ConfirmClickHandler =()=>{
    setConfirmState({
      show: true,
      props: confirmAddProps,
    });
  }

  const onConfirm = () => {
    확인후 처리할 함수
    setConfirmState({ ...confirmState, show: false });
  } 

  <Button variant="primary" onClick={ConfirmClickHandler}>confirm창 버튼</Button>
  <ConfirmComponent show={confirmState.show} onHide={() => setConfirmState({ ...confirmState, show: false })} message="삭제하시겠습니까?" onConfirm={onConfirm} />

*/
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmComponent(props) {
  const { show, onHide, message, onConfirm} = props;
  
  return (
    <Modal show={show} backdrop="static" centered>
      <Modal.Body className="grid-example"> {message} </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>취소</Button>
        <Button variant="primary" onClick={onConfirm}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmComponent;