// 작성자 : 현소현
import React, { useCallback, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import SelectForm from "../../components/SelectForm";
import TableForm from "../../components/TableForm";
import {
  salAllow,
  salAllowSum,
  salDeduct,
  salDeductSum,
  salEmp,
  totalSalaryByPeriodOption,
} from "../../model/SalaryInformationEntry/SalConstant";
import SalaryInformationEntryModel from "../../model/SalaryInformationEntry/SalaryInformationEntryModel";
import { fetchData } from "../../utils/codeHelperUtils";
import ModalComponent from "../../components/ModalComponent";
import CodeHelperModal from "../../components/CodeHelperModal";
import { LABELS } from "../../model/CommonConstant";
import SiSeacrchPanel from "./searchPenel/SiSeacrchPanel";

import "../../styles/SalaryInformationEntry/SalaryInformationEntryLayout.scss";
import SiEmpDetail from "./RightSideTab/SiEmpDetail";

import ReCalculation from "./modalMenu/ReCalculation";
import InsertSalaryData from "./modalMenu/InsertSalaryData";
import SalaryInformationEntryHeader from "./SalaryInformationEntryHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faEyeSlash,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";

const SalaryInformationEntryLayout = () => {
  //Model 관리되는 값
  const { state, actions } = SalaryInformationEntryModel();

  const [isCardVisible, setIsCardVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  // 코드도움 아이콘 클릭이벤트
  const modalShow = useCallback(async (type, data, setRowData) => {
    actions.setModalState({ ...state.modalState, show: true });
    setModalType(type);

    switch (type) {
      case "default":
        let codeDataList = data.tableData;

        if (data.url) {
          codeDataList = await fetchData(data.url, data.params);
        }

        actions.setModalState((prevState) => ({
          ...prevState,
          subject: data.subject,
        }));

        actions.setCodeHelperTableData(() => ({
          // subject: data.subject,
          setRowData: setRowData,
          tableHeaders: data.headers,
          tableData: codeDataList,
          usePk: data.usePk ? data.usePk : "",
          searchField: data.searchField,
        }));
        break;

      case "insertSalaryData": // 수당/공제 등록
        let insertSalaryTableData = []; //default
        if (data.url) {
          insertSalaryTableData = await fetchData(data.url);
        }

        actions.setModalState((prevState) => ({
          ...prevState,
          size: "xl",
          subject: data.subject,
        }));

        actions.setModalContentData(() => ({
          tableData: insertSalaryTableData,
        }));
        break;

      case "reCalculation": // 재계산
        actions.setModalState((prevState) => ({
          ...prevState,
          subject: "재계산",
          onConfirm: alert("안뇽~"),
        }));

        actions.setModalContentData(() => ({
          data: data.list,
        }));

        break;

      default:
        break;
    }
  }, []);

  return (
    <>
      <ModalComponent
        title={state.modalState.subject}
        size={state.modalState.size}
        show={state.modalState.show}
        onHide={() => actions.setModalState({ show: false })}
        onConfirm={state.modalState.onConfirm}
      >
        {modalType === "default" ? (
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
          <InsertSalaryData
            insertSalaryTableData={state.modalContentData.tableData}
            actions={actions}
          />
        ) : modalType === "reCalculation" ? (
          <ReCalculation data={state.modalContentData.data} />
        ) : (
          //default
          <></>
        )}
      </ModalComponent>

      <SalaryInformationEntryHeader
        deleteButtonHandler={actions.deleteSelectedRows}
        modalShow={modalShow}
      />
      <Container fluid>
        <Row>
          <Col>
            {/* 조회영역 */}
            <SiSeacrchPanel
              onSearch={actions.onSearch}
              modalShow={modalShow}
              actions={actions}
              state={state}
            />

            {/* 메인영역 */}
            <Row>
              {/* 사원리스트 영역 */}
              <Col>
                <div className="table-container">
                  <Row>
                    <TableForm
                      tableName="SI_EMPLIST"
                      readOnly
                      showCheckbox
                      showHeaderArrow
                      tableHeaders={salEmp.headers}
                      tableData={state.saInfoListData}
                      actions={{
                        setTableData: actions.setSaInfoListData,
                        setPkValue: actions.setChangeCdEmp,
                      }}
                    />
                  </Row>
                  <Row className="table-footer">
                    <TableForm
                      tableFooter={
                        <>
                          <tr>
                            <th>인원(퇴직)</th>
                            <th>7(0)</th>
                          </tr>
                        </>
                      }
                    />
                  </Row>
                </div>
              </Col>

              {/* 급여항목 table영역 */}
              <Col>
                <div className="table-container">
                  <Row>
                    <TableForm
                      tableName="SI_SALARY_ALLOWPAY_LIST"
                      tableHeaders={salAllow.headers}
                      tableData={state.salAllowData.salData}
                      rowAddable
                      actions={{
                        setTableData: actions.setSalData,
                        setEditedRow: actions.setEditedAllow,
                      }}
                    />
                  </Row>
                  <Row className="table-footer">
                    <TableForm
                      tableFooter={
                        <>
                          <tr>
                            <th>과세</th>
                            <td>{state.salAllowData.sumData.taxYSum}</td>
                          </tr>
                          <tr>
                            <th>비과세</th>
                            <td>{state.salAllowData.sumData.taxNSum}</td>
                          </tr>
                          <tr>
                            <th>총합계</th>
                            <td>{state.salAllowData.sumData.sum}</td>
                          </tr>
                        </>
                      }
                    />
                  </Row>
                </div>
              </Col>

              {/* 공제항목 table영역 */}
              <Col>
                <div className="table-container">
                  <Row>
                    <div className="leftTable">
                      <TableForm
                        tableName="SI_SALARY_DEDUCTPAY_LIST"
                        readOnly
                        tableHeaders={salDeduct.headers}
                        tableData={state.deductData.deductData}
                        actions={{}}
                      />
                    </div>
                  </Row>
                  <Row className="table-footer">
                    <TableForm
                      tableFooter={
                        <>
                          <tr>
                            <th>공제액 계</th>
                            <td>{state.deductData.sumData.sum}</td>
                          </tr>
                          <tr>
                            <th>차인지급액</th>
                            <td>{state.salAllowData.sumData.sum}</td>
                          </tr>
                        </>
                      }
                    />
                  </Row>
                </div>
              </Col>

              {/* 조회구분 영역*/}
              <Col>
                <SelectForm
                  label={LABELS.inquiryYype}
                  optionList={totalSalaryByPeriodOption}
                  onChange={actions.setSelectedOption}
                />
                <Row>
                  <TableForm
                    tableHeaders={salAllowSum.headers}
                    tableData={state.salPaySumData.allowPay}
                    actions={{}}
                    readOnly
                  />
                </Row>
                <Row>
                  <TableForm
                    tableHeaders={salDeductSum.headers}
                    tableData={state.salPaySumData.deductPay}
                    actions={{}}
                    readOnly
                  />
                </Row>
              </Col>
            </Row>
          </Col>

          {isCardVisible ? (
            <Col
              md="3"
              className={`transition ${isCardVisible ? "visible" : "hidden"}`}
            >
              <div style={{ display: "flex" }}>
                <div className="rightside-custom-width">
                  <div
                    onClick={toggleCardVisibility}
                    className="rightside-icon-wrapper"
                  >
                    <FontAwesomeIcon
                      icon={faArrowRight} // 보이지 않을 때 아이콘
                      style={{ cursor: "pointer", fontSize: "20px" }}
                    />
                  </div>
                </div>
                {/* 사원 상세정보 영역 */}
                <SiEmpDetail
                  actions={actions}
                  siEmpDetailData={state.saInfoDetailData}
                />
              </div>
            </Col>
          ) : (
            <Col xs={1} className="rightside-custom-width">
              <div
                onClick={toggleCardVisibility}
                className="rightside-icon-wrapper"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft} // 보이지 않을 때 아이콘
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SalaryInformationEntryLayout;
