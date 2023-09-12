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
import ConfirmComponent from "../../components/ConfirmComponent";
import "../../styles/header.css";
import salaryInformEntry from "../../styles/img/salaryInformEntryLogo.png";

const SalaryInformationEntryHeader = ({ deleteButtonHandler, modalShow }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const faTrashCanClickHandler = (event) => {
  };

  const insertSalaryDataHandler = (event) => {
    //alert("수당 공제 클릭했댱");  
    
  }

  const reCalculationHandler = (event) => {
    //alert("재계산 클릭했댱");  
    
  }

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
        <img id="logo" src={salaryInformEntry} alt="" />
        <button className="backgroundBorderNone">
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="colorWhite backgroundBorderNone"
          />
        </button>
      </div>
      <div id="secondTopHeaderMenuList">
        <Button onClick={(e) => modalShow('insert', '넹')} >
            수당/공제 등록
        </Button>
        <Button onClick={(e) => reCalculationHandler(e)}>
            재계산
        </Button>
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
      <ConfirmComponent
        show={showModal.show}
        message={showModal.message}
        // onlyConfirm={!existSelectedRows}
        onHide={() => setShowModal(false)}
        onConfirm={() => {
          deleteButtonHandler();
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default SalaryInformationEntryHeader;
