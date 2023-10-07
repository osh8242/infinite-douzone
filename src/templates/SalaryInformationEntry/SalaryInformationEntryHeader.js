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
import ConfirmComponent from "../../components/ConfirmComponent";
import "../../styles/SalaryInformationEntry/SalaryInformationEntryLayout.scss";
import "../../styles/fonts.css";
import salaryInformEntry from "../../styles/img/salaryInformEntryLogo.png";
import {
  codeHelperData_paymentDate,
  modal_insertSalaryData,
  modal_reCalculationList,
} from "../../model/SalaryInformationEntry/SalConstant";

const SalaryInformationEntryHeader = ({
  existSelectedRows,
  allowYear,
  modalShow,
  ynComplete,
  dateId,
  cdEmp,
  actions,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 테마 컬러 설정
  const userInfoObject = JSON.parse(localStorage.getItem("userInfo"));
  const themeColor = userInfoObject?.theme || "rgb(48, 150, 255)";

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // 휴지통_사원리스트 삭제
  const faTrashCanClickHandler = (event) => {
    let message = "";

    if (ynComplete === "Y") {
      setShowModal({
        show: true,
        message: "완료 해제 후 삭제가 가능합니다.",
        onlyConfirm: true,
      });
      return true;
    }
    
    if (!existSelectedRows) {
      message = "선택된 사원이 없습니다";
      setShowModal({ show: true, message: message });
      return true;
    }

    setShowModal({
      show: true,
      message: "선택된 사원목록의 지급항목을 모두 삭제하시겠습니까? ",
      action: () => {
        actions.deleteSelectedRows();
      },
      onlyConfirm: !existSelectedRows,
    });
  };

  // 수당/공제 등록
  const insertSalaryDataHandler = (event) => {
    modalShow("insertSalaryData", modal_insertSalaryData);
  };

  // 재계산 모달
  const reCalculationHandler = (event) => {
    if (ynComplete === "Y") {
      setShowModal({
        show: true,
        message: "완료 해제 후 재계산이 가능합니다.",
        onlyConfirm: true,
      });
    } else if (dateId === "") {
      setShowModal({
        show: true,
        message: "선택된 날짜에 등록된 급여항목이 없습니다.",
        onlyConfirm: true,
      });
    } else if (cdEmp === "") {
      setShowModal({
        show: true,
        message: "사원을 선택해주세요",
        onlyConfirm: true,
      });
    } else {
      modalShow("reCalculation", modal_reCalculationList);
    }
  };

  // 지급일자 모달
  const getDateListHandler = (event) => {
    modalShow("codeHelper", codeHelperData_paymentDate, setSearchDate, {
      allowYear: allowYear,
    });
  };

  // 지급일자 모달_지급일자 선택시 함수
  const setSearchDate = (e, row) => {
    setShowModal({
      show: true,
      message: "해당 지급일자로 조회하시겠습니까?",
      action: () => {
        actions.setPaymentDate(row.paymentDate);
        actions.setSalDivision(row.salDivision);
        actions.setAllowMonth(row.allowMonth);
        actions.setDateId(row.dateId);
        actions.onSearch();
      },
      onlyConfirm: false,
    });
  };

  // 완료
  const ynCompleteButtonHandler = (event) => {
    let message = "";
    if (dateId === "") {
      message = "선택된 날짜에 등록된 급여항목이 없습니다.";
      setShowModal({ show: true, message: message, onlyConfirm: true });
    } else {
      if (ynComplete === "Y")
        message = "현재 입력하는 급여등을 완료 해제하시겠습니까? ";
      else message = "현재 입력하는 급여등을 완료하시겠습니까?";
      setShowModal({
        show: true,
        message: message,
        action: () => actions.updateDate(),
        onlyConfirm: false,
      });
    }
  };

  return (
    <div id="secondTopHeader" style={{ background: themeColor }}>
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
        <img id="logo" src={salaryInformEntry} alt="" />
        <button className="backgroundBorderNone">
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="colorWhite backgroundBorderNone"
          />
        </button>
      </div>
      <div id="secondTopHeaderMenuList" className="SUITE p-10">
        <Button
          className="extraDeductBtn"
          onClick={(e) => getDateListHandler(e)}
        >
          지급일자
        </Button>
        <Button
          className="extraDeductBtn"
          onClick={(e) => insertSalaryDataHandler(e)}
        >
          수당/공제 등록
        </Button>
        <Button
          id="reCalculateBtn"
          className="extraDeductBtn"
          onClick={(e) => reCalculationHandler(e)}
        >
          재계산
        </Button>

        <Button
          id="extraDeductBtn"
          className="extraDeductBtn"
          onClick={(e) => ynCompleteButtonHandler(e)}
        >
          {ynComplete === "Y" ? "해제" : "완료"}
        </Button>

        <button className="backgroundBorderNone">
          <FontAwesomeIcon icon={faPrint} className="colorWhite p-12" />
        </button>
        <button
          className="backgroundBorderNone"
          onClick={(e) => faTrashCanClickHandler(e)}
        >
          <FontAwesomeIcon icon={faTrashCan} className="colorWhite p-12" />
        </button>
        <button className="backgroundBorderNone">
          <FontAwesomeIcon icon={faCalculator} className="colorWhite p-12" />
        </button>
        <button className="backgroundBorderNone">
          <FontAwesomeIcon icon={faBorderAll} className="colorWhite p-12" />
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
