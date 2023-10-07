// 작성자 : 현소현
import React, { useCallback, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import "../../styles/SalaryInformationEntry/SalaryInformationEntryLayout.scss";
import "../../styles/commonComponent.css";
import "../../styles/fonts.css";
import SalaryInformationEntryModel from "../../model/SalaryInformationEntry/SalaryInformationEntryModel";
import ModalComponent from "../../components/ModalComponent";
import CodeHelperModal from "../../components/CodeHelperModal";

import SalaryInformationEntryHeader from "./SalaryInformationEntryHeader";
import SiSeacrchPanel from "./searchPenel/SiSeacrchPanel";

import EmpList from "./mainTab/EmpList";
import SalaryAllowPayList from "./mainTab/SalaryAllowPayList";
import SalaryDeductPayList from "./mainTab/SalaryDeductPayList";
import SelctDivisionList from "./mainTab/SelctDivisionList";

import CalculationInsert from "./modalMenu/CalculationInsert";
import ReCalculation from "./modalMenu/ReCalculation";
import InsertSalaryDataLayout from "./modalMenu/InsertSalaryDataLayout";

import RigtSideLayout from "./RightSideTab/RigtSideLayout";

import fetchData from "../../utils/codeHelperUtils";
import useApi from "../../model/Api";
import ConfirmComponent from "../../components/ConfirmComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import increaseBrightness from "../../model/increaseBrightness";

const SalaryInformationEntryLayout = () => {
  const api = useApi();
  //Model 관리되는 값
  const { state, actions } = SalaryInformationEntryModel();
  const [isRightTabVisible, setIsRightTabVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  const toggleRightTabVisibility = () => {
    setIsRightTabVisible(!isRightTabVisible);
  };

  // 테마 컬러 설정
  const userInfoObject = JSON.parse(localStorage.getItem("userInfo"));
  const themeColor = userInfoObject?.theme || "rgb(48, 150, 255)";
  const themeLabel = increaseBrightness(themeColor, 85);
  const labels = document.querySelectorAll(
    ".label:not(.deleteLabelBackground)"
  );
  labels.forEach((label) => {
    label.style.backgroundColor = themeLabel;
  });

  // 코드도움 아이콘 클릭이벤트
  const modalShow = useCallback(
    async (type, data, setRowData, setParams) => {
      actions.setModalState({ ...state.modalState, show: true });
      setModalType(type);

      switch (type) {
        case "codeHelper":
          let codeDataList = data.tableData;
          let url = data.url ? data.url : "";
          let params = data.params ? data.params : setParams;

          if (url !== "") codeDataList = await fetchData(api, url, params);

          actions.setModalState((prevState) => ({
            ...prevState,
            subject: data.subject,
          }));
          actions.setModalState((prevState) => ({
            ...prevState,
            subject: data.subject,
          }));

          actions.setCodeHelperTableData(() => ({
            setRowData: setRowData,
            tableHeaders: data.headers,
            tableData: codeDataList,
            usePk: data.usePk ? data.usePk : "",
            searchField: data.searchField,
          }));
          break;

        default:
          actions.setModalState((prevState) => ({
            ...prevState,
            size: data.size,
            subject: data.subject,
          }));
          break;
      }
    },
    [state.allowMonth]
  );

  return (
    <>
      <ModalComponent
        title={state.modalState.subject}
        size={state.modalState.size}
        show={state.modalState.show}
        onHide={() => actions.setModalState({ show: false })}
        onConfirm={state.modalState.onConfirm}
      >
        {modalType === "codeHelper" ? (
          <CodeHelperModal
            setRowData={state.codeHelperTableData.setRowData}
            usePk={state.codeHelperTableData.usePk}
            tableHeaders={state.codeHelperTableData.tableHeaders}
            tableData={state.codeHelperTableData.tableData}
            subject={state.codeHelperTableData.subject}
            searchField={state.codeHelperTableData.searchField}
            onHide={() => actions.setModalState({ show: false })}
          />
        ) : modalType === "insertSalaryData" ? (
          <InsertSalaryDataLayout actions={actions} />
        ) : modalType === "reCalculation" ? (
          <ReCalculation actions={actions} state={state} />
        ) : modalType === "calculationInsert" ? (
          <CalculationInsert
            insertSalaryTableData={state.modalContentData.tableData}
            actions={actions}
          />
        ) : (
          //default
          <></>
        )}
      </ModalComponent>
      <ConfirmComponent
        show={state.showConfirm.show}
        message={state.showConfirm.message}
        onlyConfirm={state.showConfirm.onlyConfirm}
        onHide={() => actions.setShowConfirm(false)}
        onConfirm={() => {
          state.showConfirm.action && state.showConfirm.action();
          actions.setShowConfirm(false);
        }}
      />

      <SalaryInformationEntryHeader
        deleteButtonHandler={actions.deleteSelectedRows}
        existSelectedRows={state.selectedRows.length !== 0}
        ynComplete={state.ynComplete}
        actions={actions}
        modalShow={modalShow}
        dateId={state.dateId}
        cdEmp={state.cdEmp}
        allowYear={state.allowYear}
        paymentDate={state.searchVo.paymentDate}
      />

      {/* <Container fluid> */}
      <>
        <div id="si-container">
          <Row id="salaryInformationEntryLayout" className="SUITE p-10">
            <Col>
              {/* 조회영역 */}
              <SiSeacrchPanel
                onSearch={actions.onSearch}
                modalShow={modalShow}
                actions={actions}
                state={state}
                setCopyLastMonthData={actions.setCopyLastMonthData}
              />
              {/* 메인영역 */}
              <Row>
                <Col md={3} className="hr-left-col">
                  <EmpList
                    actions={actions}
                    saInfoListData={state.saInfoListData}
                  />
                </Col>
                <Col md={3} className="hr-left-col">
                  <SalaryAllowPayList
                    actions={actions}
                    salAllowData={state.salAllowData}
                    ynComplete={state.ynComplete}
                  />
                </Col>
                <Col md={3} className="hr-left-col">
                  <SalaryDeductPayList
                    actions={actions}
                    salDeductData={state.deductData}
                    ynComplete={state.ynComplete}
                  />
                </Col>
                <Col className="hr-left-col">
                  <SelctDivisionList actions={actions} state={state} />
                </Col>
              </Row>
            </Col>

            {/* 우측 상세정보 버튼 */}
            <FontAwesomeIcon
              icon={faChevronRight}
              id="rightsideIcon"
              className={`${isRightTabVisible ? "left" : "right"}`}
              onClick={toggleRightTabVisibility}
            />
            {/* 우측 상세정보 */}
            <div
              id="salaryInformationEntryRightSide"
              className={`${
                isRightTabVisible
                  ? "visible deleteLabelBackground"
                  : "hidden deleteLabelBackground"
              }`}
            >
              <RigtSideLayout actions={actions} state={state} />
            </div>
          </Row>
        </div>
      </>
    </>
  );
};

export default SalaryInformationEntryLayout;
