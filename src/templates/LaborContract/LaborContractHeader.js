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
import { React, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import ModalComponent from "../../components/ModalComponent";
import "../../styles/header.css";
import empAdd from "../../styles/img/swsmLogo.png";

const LaborContractHeader = ({ deleteButtonHandler }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const faTrashCanClickHandler = (event) => {
    setShowModal(true);
  };

  return (
    <div id="secondTopHeader" className="p-12">
      {/* 사이드바 */}
      <div className={`sidebar SUITE p-12 ${showSidebar ? "right" : "left"}`}>
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
            <FontAwesomeIcon icon={faSackDollar} /> &nbsp;급여자료입력
          </Nav.Link>
        </Nav>
      </div>
      <div id="secondTopHeaderContents">
        <Button
          id="toggleSidebarBtn"
          onClick={toggleSidebar}
          variant="outline-secondary"
        >
          <i className={`fa fa-bars colorWhite`} />
        </Button>
        {/* 로고 */}
        <img id="logo" src={empAdd} alt="" />
        <button className="backgroundBorderNone">
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="colorWhite backgroundBorderNone"
          />
        </button>
      </div>
      <div id="secondTopHeaderMenuList">
        <button className="backgroundBorderNone">
          <FontAwesomeIcon icon={faPrint} className="colorWhite" />
        </button>
        <button
          className="backgroundBorderNone"
          onClick={(e) => faTrashCanClickHandler(e)}
        >
          <FontAwesomeIcon icon={faTrashCan} className="colorWhite" />
        </button>
        <button className="backgroundBorderNone">
          <FontAwesomeIcon icon={faCalculator} className="colorWhite" />
        </button>
        <button className="backgroundBorderNone">
          <FontAwesomeIcon icon={faBorderAll} className="colorWhite" />
        </button>
      </div>
      <ModalComponent
        show={showModal}
        title={"선택된 행들을 삭제하시겠습니까?"}
        onHide={() => setShowModal(false)}
        onConfirm={() => {
          deleteButtonHandler();
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default LaborContractHeader;
