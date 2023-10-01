import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faAddressCard,
  faArrowUpRightFromSquare,
  faBorderAll,
  faCalculator,
  faFileInvoice,
  faHome,
  faPrint,
  faSackDollar,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Nav } from "react-bootstrap";
import emp from "../..//styles/img/empRegisterLogo.png";
import { useState } from "react";
import { EmpRegisterUndeletedEmpHeaders } from "../../model/EmpRegister/EmpConstant";
import ModalComponent from "../../components/ModalComponent";
import ConfirmComponent from "../../components/ConfirmComponent";
import "../../styles/header.css";
import "../../styles/fonts.css";

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
      {showSidebar && (
        <div className="sidebar SUITE p-12">
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faHome} /> &nbsp;Home
            </Nav.Link>
            <Nav.Link href="/er">
              <FontAwesomeIcon icon={faUserPlus} /> &nbsp;사원등록
            </Nav.Link>
            <Nav.Link href="/hr">
              <FontAwesomeIcon icon={faAddressCard} /> &nbsp;인사관리등록
            </Nav.Link>
            <Nav.Link href="/lc">
              <FontAwesomeIcon icon={faFileInvoice} />
              &nbsp;&nbsp;&nbsp;표준근로계약서
            </Nav.Link>
            <Nav.Link href="/si">
              <FontAwesomeIcon icon={faSackDollar} /> &nbsp;급여관리
            </Nav.Link>
          </Nav>
        </div>
      )}
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
