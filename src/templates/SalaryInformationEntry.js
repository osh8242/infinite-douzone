// 작성자 : 현소현
import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Modal, Row } from "react-bootstrap";
import SearchPanel from "../components/SearchPanel";
import SelectForm from "../components/SelectForm";
import TableForm from "../components/TableForm";
import TextBoxComponent from "../components/TextBoxComponent";
import SalaryInformationEntryModel from "../model/SalaryInformationEntryModel";
import ModalComponent from "../components/ModalComponent";
import DateTest from "../components/DateTest";
import SalConstant from "../model/SalConstant";
import CommonConstant from "../model/CommonConstant";
import TableTemp from "../components/TableTemp";
import CodeHelper from "../components/CodeHelper";
import CodeHelpComponent from "../components/CodeHelper";
import HrManagementHeader from "./HrManagementHeader";

const SalaryInformationEntry = ({ grid, mainTab, subTab }) => {
  
  const { labels } = CommonConstant();
  const { selectOption, tableHeader, codeHelperparams } = SalConstant();
  
  const {
    saInfoListData
    , setSaInfoListData 
    , salAllowData
    , setSalData
    , deductData
    , sumTableData
    , saInfoDetailData
    , setSaInfoDetailData

    , modalState
    , setModalState    
    , codeHelperTableData

    , actions
    , searchVO
    
  } = SalaryInformationEntryModel();
  
  console.log(sumTableData.salDeductPaySumData);

  // 코드도움 아이콘 클릭이벤트
  const codeHelperShow = useCallback((codeHelperTableData, setData) => {
    setModalState({ show: true });
    actions.setCodeHelperTableData(codeHelperTableData);
    //{setData: setData}
  }, []);

  //조회버튼
  const onSearch =()=> {
    alert("검색버튼");
  }

  return (
    <>
    <HrManagementHeader deleteButtonHandler={actions.deleteSelectedRows} />
      {/* 코드 도움 모달 영역 */}
      <ModalComponent title= {codeHelperTableData.title} show={modalState.show} onHide={() => setModalState({ ...modalState, show: false })} size="lg" centered>
       <CodeHelpComponent onRowClick={() => setModalState({ ...modalState, show: false })} table={codeHelperTableData} setData={codeHelperTableData} />
       {/* setData={actions.setSearchCdDept}/> */}
      </ModalComponent> 

      {/* 기본 검색조건 */}
      <SearchPanel onSearch={onSearch} showAccordion>
        <Row>
          <Col>
            <DateTest type="month" label={"귀속연월"} value={searchVO.allowMonth} onChange={(e,value)=>actions.setAllowMonth(value)}/>
          </Col>
          <Col>
            <SelectForm label={"구분"} optionList={selectOption.salOptionList} onChange={actions.setSalDivision}/>
          </Col>
          <Col>
            <DateTest 
              label={"지급일"} 
              type={'date'} 
              value={searchVO.paymentDate} 
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
                value={searchVO.searchCdEmp}
                onChange={actions.setSearchCdEmp} 
                codeHelper onClickCodeHelper={() => codeHelperShow(codeHelperparams.cdEmp, actions.setSearchCdEmp)}  
                //onChange={(e,value)=>actions.setSearchCdEmp(value)}
              />
            </Col>
            <Col>
              <TextBoxComponent 
                name="searchCdDept" 
                label={"부서코드"} 
                value={searchVO.searchCdDept}
                onChange={actions.setSearchCdDept}
                codeHelper onClickCodeHelper={() => codeHelperShow(codeHelperparams.cdDept, actions.setSearchCdDept)}  
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <TextBoxComponent 
                name="searchRankNo"  
                label={"직급코드"}  
                value={searchVO.searchRankNo}
                onChange={actions.setSearchRankNo}
                codeHelper/>
            </Col>
            <Col>
              <TextBoxComponent 
                name="searchCdOccup"  
                label={"직책코드"}  
                value={searchVO.searchCdOccup}
                onChange={actions.setSearchCdOccup}
                codeHelper/>
            </Col>
          </Row>

          <Row>
            <Col>
              <TextBoxComponent 
                name="searchCdField"  
                label={"현장코드"}  
                value={searchVO.searchCdField}
                onChange={actions.setSearchCdField}
                codeHelper/>
            </Col>
            <Col>
              <TextBoxComponent 
                name="searchCdProject"  
                label={"프로젝트코드"}  
                value={searchVO.searchCdField}
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
            tableData={saInfoListData}
            actions={{
              setTableData: setSaInfoListData,
              setPkValue: actions.setSearchAllowVo,
            }}
          />
        </Col>
        <Col md="3">
          <>
          {/* 급여항목 table영역 */}
          <TableTemp
            tableHeaders={tableHeader.salAllow}
            tableData={salAllowData.salData}
            rowAddable
            actions={{
              setTableData: setSalData,
              setEditedRow: actions.setEditedAllow,
              //{ cdAllow :'', nmAllow:'급여항목', allowPay : 500000 }
              
            }}
          />
          <div> 과세 : {salAllowData.sumData.taxYSum}</div>
          <div> 비과세 :{salAllowData.sumData.taxNSum}</div>
          <div> 총합계 : {salAllowData.sumData.sum} </div>
          </>
        </Col>
        <Col md="3">
          {/* 공제항목 table영역 */}
          <>
          <TableTemp
            tableHeaders={tableHeader.salDeduct}
            tableData={deductData.deductData}
            actions={{}}
          /> 
          <div>공제액 계 : {deductData.sumData.sum}</div>
          <div>차인지급액 : {salAllowData.sumData.sum-deductData.sumData.sum}</div>
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
              tableData={sumTableData.salAllowPaySumData}
              actions={{}}
              readOnly
            />
          </Row>
          <Row>
            <TableTemp 
              tableHeaders={tableHeader.salDeductSum}
              tableData={sumTableData.salDeductPaySumData} 
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
                {saInfoDetailData ? (
                  <>
                  <TextBoxComponent label={labels.daEnter} value={saInfoDetailData.daEnter}/>
                  <TextBoxComponent label='배우자공제' value={saInfoDetailData.ynMateDed}/>
                  <TextBoxComponent label='20세/60세/다자녀' value={saInfoDetailData.num20Family + '/' + saInfoDetailData.num60Family + '/' + saInfoDetailData.numManyFamily}/>
                  <TextBoxComponent label='조정율' value='구현중'/>
                  <TextBoxComponent label='거주구분' value={saInfoDetailData.ynResident}/>
                  <TextBoxComponent label='생산/국외' value={saInfoDetailData.ynUnit + '/' + saInfoDetailData.ynForLabor}/>
                  <TextBoxComponent label='연장근로비과세' value={saInfoDetailData.ynOverwork}/>
                  <TextBoxComponent label='퇴사일' value={saInfoDetailData.daRetire}/>
                  <TextBoxComponent label={labels.cdOccup} value={saInfoDetailData.cdOccup}/>
                  <TextBoxComponent label={labels.cdDept} value={saInfoDetailData.cdDept}/>
                  <TextBoxComponent label={labels.cdField} value={saInfoDetailData.cdField}/>
                  <TextBoxComponent label={labels.cdProject} value={saInfoDetailData.cdProject}/>
                  <TextBoxComponent label='주민(외국인)번호' value={saInfoDetailData.noSocial}/>
                  </>
                ) : (
                  <p>데이터가 없습니다.</p>
                )}
              
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SalaryInformationEntry;
