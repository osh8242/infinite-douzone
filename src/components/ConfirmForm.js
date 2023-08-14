import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmForm(props) {

  return (
  
    <Modal {...props} backdrop="static" aria-labelledby="" centered>
      <Modal.Body className="grid-example">
        유 갓잇?
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>취소</Button>
        <Button variant="primary" onClick={props.onHide}>확인</Button>
      </Modal.Footer>

    </Modal>
  );
}

export default ConfirmForm;