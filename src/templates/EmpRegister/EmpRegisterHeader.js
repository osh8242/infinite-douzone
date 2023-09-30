import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowUpRightFromSquare,
  faBorderAll,
  faCalculator,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import "../../styles/header.css";
import emp from "../..//styles/img/empRegisterLogo.png";
import { useState } from "react";
import { EmpRegisterUndeletedEmpHeaders } from "../../model/EmpRegister/EmpConstant";
import ModalComponent from "../../components/ModalComponent";
import ConfirmComponent from "../../components/ConfirmComponent";

// 각 페이지별 로고 이미지 링크 (배포시 서버에 저장 후 절대경로로 수정)
// const logoUrl = {
//   emp: "../styles/img/empRegisterLogo.png",
//   empAdd: "../styles/img/empAddLogo.png",
// };

function EmpRegisterHeader({ deleteButtonHandler, existSelectedRows }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const clickTrashCanHandler = (event) => {
    if (existSelectedRows) {
      setShowModal({ show: true, message: "선택된 행들을 삭제하시겠습니까?" });
    } else {
      setShowModal({ show: true, message: "삭제할 행이 없습니다" });
    }
  };

  return (
    <div id="secondTopHeader">
      <div id="secondTopHeaderContents">
        <Button
          id="toggleSidebarBtn"
          onClick={toggleSidebar}
          variant="outline-secondary"
        >
          <i className={`fa fa-bars colorWhite`} />
        </Button>
        {/* 로고 */}
        <img id="logo" src={emp} alt="" />
        <button className="backgroundBorderNone">
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="colorWhite backgroundBorderNone forbid"
          />
        </button>
      </div>
      <div id="secondTopHeaderMenuList">
        <button className="backgroundBorderNone">
          <FontAwesomeIcon icon={faPrint} className="colorWhite forbid" />
        </button>
        <button
          className="backgroundBorderNone"
          onClick={(e) => clickTrashCanHandler(e)}
        >
          <FontAwesomeIcon icon={faTrashCan} className="colorWhite" />
        </button>
        <button className="backgroundBorderNone">
          <FontAwesomeIcon icon={faCalculator} className="colorWhite forbid" />
        </button>
        <button className="backgroundBorderNone">
          <FontAwesomeIcon icon={faBorderAll} className="colorWhite forbid" />
        </button>
      </div>
      <ConfirmComponent
        show={showModal.show}
        message={showModal.message}
        onlyConfirm={!existSelectedRows}
        onHide={() => setShowModal(false)}
        onConfirm={() => {
          deleteButtonHandler();
          setShowModal(false);
        }}
      />
    </div>
  );
}

export default EmpRegisterHeader;
