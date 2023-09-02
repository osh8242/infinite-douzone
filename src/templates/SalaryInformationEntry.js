// 작성자 : 현소현
import React, { useCallback } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import SearchPanel from "../components/SearchPanel";
import SelectForm from "../components/SelectForm";
import TextBoxComponent from "../components/TextBoxComponent";
import SalaryInformationEntryModel from "../model/SalaryInformationEntryModel";
import DateTest from "../components/DateTest";
import SalConstant from "../model/SalConstant";
import CommonConstant from "../model/CommonConstant";
import TableTemp from "../components/TableTemp";
import HrManagementHeader from "./HrManagementHeader";
import CodeHelperModal from "../components/CodeHelperModal";

const SalaryInformationEntry = ({ grid, mainTab, subTab }) => {
  //상수
  const { labels } = CommonConstant();
  const { selectOption, tableHeader, codeHelperparams } = SalConstant();

  //Model 관리되는 값
  const { state, actions } =  SalaryInformationEntryModel();
  //const {editedEmp, actionssetEditedEmp} = EmpRegisterationModel();
  
  // 코드도움 아이콘 클릭이벤트
  const codeHelperShow = useCallback((codeHelperTableData, setDataAction) => {
    actions.setModalState({ show: true });
    actions.setCodeHelperTableData(codeHelperTableData);
  }, []);

  //조회버튼
  const onSearch =()=> {
    alert("검색");
  }

  // const setTableData = () => {
  //   let tabledata;

  //   getEmpListForCodeHelper(
  //       { ynFor : 'n', daRetire : ''}, 
  //       [
  //         { field: "pk", text: "Code"},
  //         { field: "nmKrname", text: "사원명"},
  //         { field: "noSocial", text: "주민(외국인)번호"},
  //         { field: "daRetire", text: "퇴사일자"}],
  //         ['nmKrname', 'noSocial']
  //     ).then((result) => {
  //       console.log("result", result);
  //       tabledata= result.data; 
  //     })
  //     .catch((error) => {
  //       console.error('에러 발생:', error);
  //     });
    
  //     return tabledata;
  // }

  return (
    <>
    <HrManagementHeader deleteButtonHandler={actions.deleteSelectedRows} />
      <Container>
        {/* 코드 도움 모달 영역 */}
        <CodeHelperModal
          show={state.modalState.show}
          onHide={() => actions.setModalState({ ...state.modalState, show: false })}
          onConfirm={() => alert('확인')}
          setLowData={actions.setAddRow}
          params={{ ynFor: 'n', daRetire: '' }}
          headers={[
            { field: "pk", text: "Code" },
            { field: "nmKrname", text: "사원명" },
            { field: "noSocial", text: "주민(외국인)번호" },
            { field: "daRetire", text: "퇴사일자" }
          ]}
          emplist// emplist 변수의 값을 전달해야 합니다.
        />

        {/* 기본 검색조건 */}
        <SearchPanel onSearch={onSearch} showAccordion>
          <Row>
            <Col>
              <DateTest type="month" label={"귀속연월"} value={state.searchVO.allowMonth} onChange={(e,value)=>actions.setAllowMonth(value)}/>
            </Col>
            <Col>
              <SelectForm label={"구분"} optionList={selectOption.salOptionList} onChange={actions.setSalDivision}/>
            </Col>
            <Col>
              <DateTest 
                label={"지급일"} 
                type={'date'} 
                value={state.searchVO.paymentDate} 
                onChange={(e,value)=>actions.setPaymentDate(value)}
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
                  onChange={actions.setSearchCdEmp} 
                  codeHelper onClickCodeHelper={() => codeHelperShow(codeHelperparams.cdEmp)}  
                  //onChange={(e,value)=>actions.setSearchCdEmp(value)}
                />
              </Col>
              <Col>
                <TextBoxComponent 
                  name="searchCdDept" 
                  label={"부서코드"} 
                  value={state.searchVO.searchCdDept}
                  onChange={actions.setSearchCdDept}
                  codeHelper onClickCodeHelper={() => codeHelperShow(codeHelperparams.cdDept)}  
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextBoxComponent 
                  name="searchRankNo"  
                  label={"직급코드"}  
                  value={state.searchVO.searchRankNo}
                  onChange={actions.setSearchRankNo}
                  codeHelper/>
              </Col>
              <Col>
                <TextBoxComponent 
                  name="searchCdOccup"  
                  label={"직책코드"}  
                  value={state.searchVO.searchCdOccup}
                  onChange={actions.setSearchCdOccup}
                  codeHelper/>
              </Col>
            </Row>

            <Row>
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
            </Row>

            <Row>
              <Col>
                <SelectForm label={"생산직여부"} optionList={selectOption.unitOption} />
              </Col>
              <Col>
                <SelectForm label={"국외근로여부"} optionList={selectOption.forLaborOption} />
              </Col>
            </Row>
          </div>
        </SearchPanel>

        <Row>
          <Col md="3">
            {/* 사원정보 table영역 */}
            <TableTemp
              readOnly
              showCheckbox={true}
              showHeaderArrow={true}
              tableHeaders={tableHeader.salEmp}
              tableData={state.saInfoListData}
              actions={{
                setTableData: actions.setSaInfoListData,
                setPkValue: actions.setSearchAllowVo,
              }}
            />
            <Button variant="secondary" onClick={()=>codeHelperShow(state.empListData)}>
              +
            </Button>
          </Col>
          <Col md="3">
            <>
            {/* 급여항목 table영역 */}
            <TableTemp
              tableHeaders={tableHeader.salAllow}
              tableData={state.salAllowData.salData}
              rowAddable
              actions={{
                setTableData: actions.setSalData,
                setEditedRow: actions.setEditedAllow
              }}
            />
            <div> 과세 : {state.salAllowData.sumData.taxYSum}</div>
            <div> 비과세 :{state.salAllowData.sumData.taxNSum}</div>
            <div> 총합계 : {state.salAllowData.sumData.sum} </div>
            </>
          </Col>
          <Col md="3">
            {/* 공제항목 table영역 */}
            <>
            <TableTemp
              tableHeaders={tableHeader.salDeduct}
              tableData={state.deductData.deductData}
              actions={{}}
            /> 
            <div>공제액 계 : {state.deductData.sumData.sum}</div>
            <div>차인지급액 : {state.salAllowData.sumData.sum-state.deductData.sumData.sum}</div>
            </>
          </Col>
          <Col md="3">
            {/* 조회구분 영역*/}
            <SelectForm label={labels.inquiryYype} optionList={selectOption.salOptionByPeriodList} onChange={actions.setSelectedOption}/>
            <Row>
              <TableTemp 
                showCheckbox={false}
                showHeaderArrow={false}
                tableHeaders={tableHeader.salAllowSum}
                tableData={state.sumTableData.salAllowPaySumData}
                actions={{}}
                readOnly
              />
            </Row>
            <Row>
              <TableTemp 
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
                    <TextBoxComponent label={labels.daEnter} value={state.saInfoDetailData.daEnter}/>
                    <TextBoxComponent label='배우자공제' value={state.saInfoDetailData.ynMateDed}/>
                    <TextBoxComponent label='20세/60세/다자녀' value={state.saInfoDetailData.num20Family + '/' + state.saInfoDetailData.num60Family + '/' + state.saInfoDetailData.numManyFamily}/>
                    <TextBoxComponent label='조정율' value='구현중'/>
                    <TextBoxComponent label='거주구분' value={state.saInfoDetailData.ynResident}/>
                    <TextBoxComponent label='생산/국외' value={state.saInfoDetailData.ynUnit + '/' + state.saInfoDetailData.ynForLabor}/>
                    <TextBoxComponent label='연장근로비과세' value={state.saInfoDetailData.ynOverwork}/>
                    <TextBoxComponent label='퇴사일' value={state.saInfoDetailData.daRetire}/>
                    <TextBoxComponent label={labels.cdOccup} value={state.saInfoDetailData.cdOccup}/>
                    <TextBoxComponent label={labels.cdDept} value={state.saInfoDetailData.cdDept}/>
                    <TextBoxComponent label={labels.cdField} value={state.saInfoDetailData.cdField}/>
                    <TextBoxComponent label={labels.cdProject} value={state.saInfoDetailData.cdProject}/>
                    <TextBoxComponent label='주민(외국인)번호' value={state.saInfoDetailData.noSocial}/>
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
