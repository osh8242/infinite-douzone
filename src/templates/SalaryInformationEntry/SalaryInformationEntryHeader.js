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
import { codeHelperData_paymentDate, modal_insertSalaryData, modal_reCalculationList } from "../../model/SalaryInformationEntry/SalConstant";

const SalaryInformationEntryHeader = ({ existSelectedRows, allowYear, modalShow, ynComplete, dateId, cdEmp, actions}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // 휴지통_사원리스트 삭제
  const faTrashCanClickHandler = (event) => {
    let message = "";
    if (!existSelectedRows) {
      message = "선택된 사원이 없습니다";
      setShowModal({ show: true, message: message});
    }else {message = "선택된 사원목록의 지급항목을 모두 삭제하시겠습니까? ";}
    setShowModal({ show: true, message: message, action : ()=> actions.deleteSelectedRows(), onlyConfirm : !existSelectedRows});
  };
  
  // 수당/공제 등록 
  const insertSalaryDataHandler = (event) => {
    // if (dateId !== "") {
      modalShow('insertSalaryData', modal_insertSalaryData);
      
    // }else{
    //   setShowModal({ show: true, message: "작성일자를 비우고 진행해주세요", onlyConfirm : true});
    // }
  }

  // 재계산
  const reCalculationHandler = (event) => {
    if (dateId === "") setShowModal({ show: true, message: "작성일을 선택해주세요", onlyConfirm: true});
    if (cdEmp === "") setShowModal({ show: true, message: "사원을 선택해주세요", onlyConfirm: true});
    else modalShow('reCalculation', modal_reCalculationList);
  }

  // 지급일자
  const getDateListHandler = (event) => {
    modalShow('codeHelper', codeHelperData_paymentDate, setSearchDate, {allowYear : allowYear});
  }

  const setSearchDate = (e,row) => {
    // console.log(row);
    actions.setPaymentDate(row.paymentDate);
    actions.setAllowMonth(row.allowMonth);
    // actions.setDateId(row.dateId);
    actions.onSearch();
  }
  // 완료
  const ynCompleteButtonHandler = (event) => {
    let message = "";
    if (dateId === "") {
      message = "선택된 날짜에 등록된 급여항목이 없습니다.";
      setShowModal({ show: true, message: message, onlyConfirm: true});
    }
    else {
      if (ynComplete === "Y")
        message = "현재 입력하는 급여등을 완료해제하시겠습니까? ";
      else message = "현재 입력하는 급여등을 완료하시겠습니까?";
      setShowModal({ show: true, message: message, action: () => actions.updateDate(), onlyConfirm: false});
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
        <img id="logo" src={salaryInformEntry} alt="" />
        <button className="backgroundBorderNone">
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="colorWhite backgroundBorderNone"
          />
        </button>
      </div>
      <div id="secondTopHeaderMenuList">
        <Button id="extraDeductBtn" onClick={(e) => getDateListHandler(e)} >
            지급일자
        </Button> 
        <Button id="extraDeductBtn" onClick={(e) => insertSalaryDataHandler(e)} >
            수당/공제 등록
        </Button>
        <Button id="reCalculateBtn" onClick={(e) => reCalculationHandler(e)}>
            재계산
        </Button>

        <Button id="extraDeductBtn" onClick={(e) => ynCompleteButtonHandler(e)} >
          {ynComplete === 'N'? '완료 ': '해제'}
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
        onlyConfirm={showModal.onlyConfirm}
        onHide={() => setShowModal(false)}
        onConfirm={() => {
          showModal.action && showModal.action();
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default SalaryInformationEntryHeader;
