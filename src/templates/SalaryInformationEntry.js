// 작성자 : 현소현
import React, { useCallback, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import CodeHelperModal from "../components/CodeHelperModal";
import DateTest from "../components/DateTest";
import SearchPanel from "../components/SearchPanel";
import SelectForm from "../components/SelectForm";
import TableForm from "../components/TableForm";
import TextBoxComponent from "../components/TextBoxComponent";
import CommonConstant from "../model/CommonConstant";
import SalConstant from "../model/SalConstant";
import SalaryInformationEntryModel from "../model/SalaryInformationEntryModel";
import HrManagementHeader from "./HrManageMent/HrManagementHeader";

const SalaryInformationEntry = ({ grid, mainTab, subTab }) => {
  //상수
  const { labels } = CommonConstant();
  const { selectOption, tableHeader, codeHelperparams } = SalConstant();

  //Model 관리되는 값
  const { state, actions } = SalaryInformationEntryModel();
  const [apiFlag, setApiFlag] = useState(false);

  // 코드도움 아이콘 클릭이벤트
  const codeHelperShow = useCallback(
    (flag, codeHelperTableData, codeHelperCode, setFn, usePk) => {
      actions.setModalState({ show: true });
      setApiFlag(flag);
      if (flag) {
        actions.setCodeHelperTableData((prevState) => ({
          ...prevState,
          code: codeHelperCode,
          setData: setFn,
          usePk: usePk,
        }));
      } else {
        actions.setCodeHelperTableData((prevState) => ({
          ...prevState,
          data: codeHelperTableData,
          setData: setFn,
          usePk: usePk,
        }));
      }
    },
    []
  );

  //조회버튼
  const onSearch = () => {
    alert("검색");
  };

  return (
    <>
      <HrManagementHeader deleteButtonHandler={actions.deleteSelectedRows} />
      <Container>
        {/* 코드 도움 모달 영역 */}
        <CodeHelperModal
          show={state.modalState.show}
          onHide={() =>
            actions.setModalState({ ...state.modalState, show: false })
          }
          //onConfirm={() => alert('확인')}
          setRowData={state.codeHelperTableData.setData}
          usePk={state.codeHelperTableData.usePk}
          apiFlag={apiFlag}
          table={state.codeHelperTableData.data}
          codeHelperCode={state.codeHelperTableData.code}
        />

        {/* 기본 검색조건 */}
        <SearchPanel onSearch={onSearch} showAccordion>
          <Row>
            <Col>
              <DateTest
                type="month"
                label={"귀속연월"}
                value={state.searchVO.allowMonth}
                onChange={(e, value) => actions.setAllowMonth(value)}
              />
            </Col>
            <Col>
              <SelectForm
                label={"구분"}
                optionList={selectOption.salOptionList}
                onChange={actions.setSalDivision}
              />
            </Col>
            <Col>
              <DateTest
                label={"지급일"}
                type={"date"}
                value={state.searchVO.paymentDate}
                onChange={(e, value) => actions.setPaymentDate(value)}
                //codeHelper
              />
            </Col>
          </Row>

          {/* 상세 검색조건 */}
          <div>
            <Row>
              <Col>
                <TextBoxComponent
                  name="searchEmpCd"
                  label={"사원코드"}
                  value={state.searchVO.searchCdEmp}
                  onEnter={actions.setSearchCdEmp}
                  codeHelper
                  onClickCodeHelper={() =>
                    codeHelperShow(
                      true,
                      "",
                      codeHelperparams.emplist,
                      actions.setSearchCdEmp,
                      "cdEmp"
                    )
                  }
                  //onChange={(e,value)=>actions.setSearchCdEmp(value)}
                />
              </Col>
              <Col>
                <TextBoxComponent
                  name="searchCdDept"
                  label={"부서코드"}
                  value={state.searchVO.searchCdDept}
                  onEnter={actions.setSearchCdDept}
                  codeHelper
                  onClickCodeHelper={() =>
                    codeHelperShow(
                      false,
                      codeHelperparams.cdDept,
                      "",
                      actions.setSearchCdDept,
                      "cdDept"
                    )
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextBoxComponent
                  name="searchRankNo"
                  label={"직급코드"}
                  value={state.searchVO.searchRankNo}
                  onEnter={actions.setSearchRankNo}
                  codeHelper
                  onClickCodeHelper={() =>
                    codeHelperShow(
                      true,
                      "",
                      codeHelperparams.rankNo,
                      actions.setSearchRankNo,
                      "codeId"
                    )
                  }
                />
              </Col>
              <Col>
                <TextBoxComponent
                  name="searchCdOccup"
                  label={"직책코드"}
                  value={state.searchVO.searchCdOccup}
                  onEnter={actions.setSearchCdOccup}
                  codeHelper
                  onClickCodeHelper={() =>
                    codeHelperShow(
                      true,
                      "",
                      codeHelperparams.occup,
                      actions.setSearchCdOccup,
                      "codeId"
                    )
                  }
                />
              </Col>
            </Row>

            {/* <Row>
              <Col>
                <TextBoxComponent 
                  name="searchCdField"  
                  label={"현장코드"}  
                  value={state.searchVO.searchCdField}
                  onChange={actions.setSearchCdField}
                  codeHelper/>
              </Col>
              <Col>
                <TextBoxComponent 
                  name="searchCdProject"  
                  label={"프로젝트코드"}  
                  value={state.searchVO.searchCdField}
                  onChange={actions.setSearchCdProject}
                  codeHelper/>
              </Col>
            </Row> */}

            <Row>
              <Col>
                <SelectForm
                  label={"생산직여부"}
                  optionList={selectOption.unitOption}
                />
              </Col>
              <Col>
                <SelectForm
                  label={"국외근로여부"}
                  optionList={selectOption.forLaborOption}
                />
              </Col>
            </Row>
          </div>
        </SearchPanel>

        <Row>
          <Col md="3">
            {/* 사원정보 table영역 */}
            <TableForm
              readOnly
              tableName={"사원정보 테이블"}
              showCheckbox={true}
              showHeaderArrow={true}
              tableHeaders={tableHeader.salEmp}
              tableData={state.saInfoListData}
              actions={{
                setTableData: actions.setSaInfoListData,
                setPkValue: actions.setChangeCdEmp,
              }}
            />
            <Button
              variant="secondary"
              onClick={() =>
                codeHelperShow(
                  true,
                  "",
                  codeHelperparams.emplist,
                  actions.setAddRow
                )
              }
            >
              +
            </Button>
          </Col>
          <Col md="3">
            <>
              {/* 급여항목 table영역 */}
              <TableForm
                tableName={"급여항목 테이블"}
                tableHeaders={tableHeader.salAllow}
                tableData={state.salAllowData.salData}
                rowAddable
                tableFooter={
                  <>
                    <tr>
                      <td>과세</td>
                      <td>{state.salAllowData.sumData.taxYSum}</td>
                    </tr>
                    <tr>
                      <td>비과세</td>
                      <td>{state.salAllowData.sumData.taxNSum}</td>
                    </tr>
                    <tr>
                      <td>총합계</td>
                      <td>{state.salAllowData.sumData.sum}</td>
                    </tr>
                  </>
                }
                actions={{
                  setTableData: actions.setSalData,
                  setEditedRow: actions.setEditedAllow,
                }}
              />
            </>
          </Col>
          <Col md="3">
            {/* 공제항목 table영역 */}
            <>
              <TableForm
                tableName={"공제항목 테이블"}
                readOnly
                tableHeaders={tableHeader.salDeduct}
                tableData={state.deductData.deductData}
                actions={{}}
                tableFooter={
                  <>
                    <tr>
                      <td>공제액 계</td>
                      <td>{state.deductData.sumData.sum}</td>
                    </tr>
                    <tr>
                      <td>차인지급액</td>
                      <td>
                        {state.salAllowData.sumData.sum -
                          state.deductData.sumData.sum}
                      </td>
                    </tr>
                  </>
                }
              />
            </>
          </Col>
          <Col md="3">
            {/* 조회구분 영역*/}
            <SelectForm
              label={labels.inquiryYype}
              optionList={selectOption.salOptionByPeriodList}
              onChange={actions.setSelectedOption}
            />
            <Row>
              <TableForm
                showCheckbox={false}
                showHeaderArrow={false}
                tableHeaders={tableHeader.salAllowSum}
                tableData={state.sumTableData.salAllowPaySumData}
                actions={{}}
                readOnly
              />
            </Row>
            <Row>
              <TableForm
                tableHeaders={tableHeader.salDeductSum}
                tableData={state.sumTableData.salDeductPaySumData}
                actions={{}}
                readOnly
              />
            </Row>
          </Col>
          <Col md="3">
            {/* 사원 상세정보 영역 */}
            <div>
              <Card>
                <Card.Header as="h5">사원정보</Card.Header>
                <Card.Body>
                  {state.saInfoDetailData ? (
                    <>
                      <TextBoxComponent
                        label={labels.daEnter}
                        value={state.saInfoDetailData.daEnter}
                      />
                      <TextBoxComponent
                        label="배우자공제"
                        value={state.saInfoDetailData.ynMateDed}
                      />
                      <TextBoxComponent
                        label="20세/60세/다자녀"
                        value={
                          state.saInfoDetailData.num20Family +
                          "/" +
                          state.saInfoDetailData.num60Family +
                          "/" +
                          state.saInfoDetailData.numManyFamily
                        }
                      />
                      <TextBoxComponent label="조정율" value="구현중" />
                      <TextBoxComponent
                        label="거주구분"
                        value={state.saInfoDetailData.ynResident}
                      />
                      <TextBoxComponent
                        label="생산/국외"
                        value={
                          state.saInfoDetailData.ynUnit +
                          "/" +
                          state.saInfoDetailData.ynForLabor
                        }
                      />
                      <TextBoxComponent
                        label="연장근로비과세"
                        value={state.saInfoDetailData.ynOverwork}
                      />
                      <TextBoxComponent
                        label="퇴사일"
                        value={state.saInfoDetailData.daRetire}
                      />
                      <TextBoxComponent
                        label={labels.cdOccup}
                        value={state.saInfoDetailData.cdOccup}
                      />
                      <TextBoxComponent
                        label={labels.cdDept}
                        value={state.saInfoDetailData.cdDept}
                      />
                      <TextBoxComponent
                        label={labels.cdField}
                        value={state.saInfoDetailData.cdField}
                      />
                      <TextBoxComponent
                        label={labels.cdProject}
                        value={state.saInfoDetailData.cdProject}
                      />
                      <TextBoxComponent
                        label="주민(외국인)번호"
                        value={state.saInfoDetailData.noSocial}
                      />
                    </>
                  ) : (
                    <Spinner animation="border" variant="primary" />
                  )}
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SalaryInformationEntry;
