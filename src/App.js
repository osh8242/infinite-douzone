import { useState } from "react";
import "./App.css";
import ModalForm from "./components/ModalForm";

import { Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import ConfirmForm from "./components/ConfirmForm";

function App() {
  //model창 변수
  const [modalShow, setModalShow] = useState(false);

  //confirm창 변수
  const [confimShow, setConfirmShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        모달창 나와라 뿅
      </Button>

      <Button variant="primary" onClick={() => setConfirmShow(true)}>
        yes or no
      </Button>
      
      <ModalForm show={modalShow} onHide={() => setModalShow(false)} animation="false"/> 
      <ConfirmForm show={confimShow} onHide={() => setConfirmShow(false)} /> 

      {/* 
        size = 안보내면 일반크기 500px
              ,sm 작은창 300px
              lg 큰창 	800px
              ,xl 왕짱큰창 1140px

        backdrop={"static"} 옵션 넣으면 모달창 이외 화면 클릭 안된다.
        title={"모달창 제목"} 제목 넣기
        animation={false} 애니메이션 없애기
        
        centered 위치 가운데
        closeButton header에 close버튼옵션
        form에 autoFocus 넣으면 focusing 효과가 난다

        */}
    </>
  );
}

export default App;
