import { useState } from "react";
import "./App.css";
import ModalComponent from "./components/ModalComponent";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import ConfirmComponent from "./components/ConfirmComponent";
import TestFormComponent from "./components/TestFormComponent";
import { saveConfirm } from "./util";

function App() {
  const [modalState, setModalState] = useState({
    show: false,
    props: {},
  });

  const [confirmState, setConfirmState] = useState({
    show: false,
    props: {},
  });

  /* confirm창 영역=========================================== */
  const ConfirmClickHandler =()=>{
    //confirm컴포넌트Props 추가 
    const confirmAddProps = {
      message: '삭제하시겠습니까?',      //메세지
      onConfirm: onConfirm,            //확인 클릭 함수
    };

    setConfirmState({
      show: true,
      props: confirmAddProps,
    });
  }

  //confirm창 확인버튼 함수 예시 코드
  const onConfirm = () => {
    alert('confirm창 확인을 누르셨습니다.');
    setConfirmState({ ...confirmState, show: false });
  } 

  /* modal창 영역============================================== */
  const ModalClickHandler =()=>{
       const modalAddProps = {
      title: '모달창제목',
      size: 'lg',
      backdrop: 'static',
      animation: 'false',
      onConfirm: () => {
        alert('모달창 확인을 누르셨습니다.');
        setModalState({ ...modalState, show: false });
      },
    };

    setModalState({
      show: true,
      props: modalAddProps,
    });
  }
  
  return (
    <>
      <Button variant="primary" onClick={ModalClickHandler}>모달창 버튼</Button>
      <Button variant="primary" onClick={ConfirmClickHandler}>confirm창 버튼</Button>
      
      <ModalComponent show={modalState.show} onHide={() => setModalState({ ...modalState, show: false })} {...modalState.props}>
        <TestFormComponent />
      </ModalComponent>

      <ConfirmComponent show={confirmState.show} onHide={() => setConfirmState({ ...confirmState, show: false })} {...confirmState.props} />
    </>
  );
}

export default App;
