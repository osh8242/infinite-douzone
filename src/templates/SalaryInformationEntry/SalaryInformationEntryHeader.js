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
import { modal_insertSalaryData, reCalculationList } from "../../model/SalaryInformationEntry/SalConstant";

const SalaryInformationEntryHeader = ({ deleteButtonHandler, modalShow }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const faTrashCanClickHandler = (event) => {
  };

  const insertSalaryDataHandler = (event) => {
    modalShow('insertSalaryData', modal_insertSalaryData);
  }

  const reCalculationHandler = (event) => {
    modalShow('reCalculation', reCalculationList);
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
        <Button id="extraDeductBtn" onClick={(e) => insertSalaryDataHandler(e)} >
            수당/공제 등록
        </Button>
        <Button id="reCalculateBtn" onClick={(e) => reCalculationHandler(e)}>
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
