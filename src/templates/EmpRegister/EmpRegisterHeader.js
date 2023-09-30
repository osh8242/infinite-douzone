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

// 각 페이지별 로고 이미지 링크 (배포시 서버에 저장 후 절대경로로 수정)
// const logoUrl = {
//   emp: "../styles/img/empRegisterLogo.png",
//   empAdd: "../styles/img/empAddLogo.png",
// };

function EmpRegisterHeader(props) {
  const { actions, modalShow } = props;
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const clickTrashCanHandler = (e) => {
    // 정말로 삭제하시겠습니까?? => YES => 삭제요청 보내기
    // modalShow();
    actions.deleteSelectedRows();
    // modalShow("undeletedEmp", EmpRegisterUndeletedEmpHeaders);
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
    </div>
  );
}

export default EmpRegisterHeader;
