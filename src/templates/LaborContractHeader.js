import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowUpRightFromSquare,
  faBorderAll,
  faCalculator,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import { Button } from "react-bootstrap";
import ModalComponent from "../components/ModalComponent";
import "../styles/header.css";
import empAdd from "../styles/img/empAddLogo.png";

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
        <img id="logo" src={empAdd} alt="" />
        <button className="backgroundBorderNone">
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            size={"xl"}
            className="colorWhite backgroundBorderNone"
          />
        </button>
      </div>
      <div id="secondTopHeaderMenuList">
        <button className="backgroundBorderNone">
          <FontAwesomeIcon icon={faPrint} size={"xl"} className="colorWhite" />
        </button>
        <button
          className="backgroundBorderNone"
          onClick={(e) => faTrashCanClickHandler(e)}
        >
          <FontAwesomeIcon
            icon={faTrashCan}
            size={"xl"}
            className="colorWhite"
          />
        </button>
        <button className="backgroundBorderNone">
          <FontAwesomeIcon
            icon={faCalculator}
            size={"xl"}
            className="colorWhite"
          />
        </button>
        <button className="backgroundBorderNone">
          <FontAwesomeIcon
            icon={faBorderAll}
            size={"xl"}
            className="colorWhite"
          />
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
