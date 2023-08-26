// 작성자 : 현소현
import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
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

const SalaryInformationEntry = ({ grid, mainTab, subTab }) => {
  
  const { labels } = CommonConstant();
  const { selectOption, tableHeader } = SalConstant();

  const {
    saInfoListData
    , setSaInfoListData 
    , salData
    , setSalData
    , deductData
    , setDeductData
    , saInfoDetailData
    , setSaInfoDetailData
    
    , modalState
    , setModalState    
    , actions
    , searchVO
    
  } = SalaryInformationEntryModel();
  
  
  // 코드도움 아이콘 클릭이벤트
  const codeHelperShow = useCallback((tableData) => {
    setModalState({ show: true });
  }, []);

  //검색조건 버튼
  const onSearch = () => {
    // console.log('allowMonth >>' ); console.log(allowMonth);
    // console.log('cdEmp >>' ); console.log(cdEmp);
    // console.log('paymentDate >>' ); console.log(paymentDate);
  };
  
  return (
    <>
      {/* 코드 도움 모달 영역 */}
      <ModalComponent show={modalState.show} onHide={() => setModalState({ ...modalState, show: false })} size="lg" centered>
        {/* <TableForm
          showCheckbox={false}
          showHeaderArrow={false}
          tableData={saInfoListData}
        ></TableForm> */}
      </ModalComponent>

      {/* 기본 검색조건 */}
      <SearchPanel onSearch={onSearch} showAccordion>
        <Row>
          <Col>
            <DateTest type="month" label={"귀속연월"} value={searchVO.allowMonth} onChange={actions.setAllowMonth}/>
          </Col>
          <Col>
            <SelectForm label={"구분"} optionList={selectOption.salOptionList} onChange={actions.setSalDivision}/>
          </Col>
          <Col>
            <DateTest label={"지급일"} value={searchVO.paymentDate} onChange={actions.setPaymentDate}/>
          </Col>
        </Row>

        {/* 상세 검색조건 */}
        <div>
          <Row>
            <Col>
              <TextBoxComponent type="codeHelper" name="searchEmpCd" label={"사원코드"} />
            </Col>
            <Col>
              <TextBoxComponent codeHelper name="searchDeptCd" label={"부서코드"} onChange={actions.setSearchDeptCd} onClickCodeHelper={codeHelperShow}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <TextBoxComponent type="codeHelper"  name="searchRankNo"  label={"직급코드"}  />
            </Col>
            <Col>
              <TextBoxComponent type="codeHelper"  name="searchCdOccup" label={"직책코드"}  />
            </Col>
          </Row>

          <Row>
            <Col>
              <TextBoxComponent  type="codeHelper" name="searchCdField" label={"현장코드"} />
            </Col>
            <Col>
              <TextBoxComponent  type="codeHelper" name="searchCdProject" label={"프로젝트코드"} />
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
            showCheckbox={true}
            showHeaderArrow={true}
            tableHeaders={tableHeader.salEmp}
            tableData={saInfoListData}
            actions={{
              setTableData: actions.setSaInfoListData,
              setPkValue: actions.setCdEmp,
            }}
          />
        </Col>
        <Col md="3">
          {/* 급여항목 table영역 */}
            <TableForm
              showCheckbox={false}
              showHeaderArrow={false}
              tableData={salData}
            />     
        </Col>
        <Col md="3">
          {/* 공제항목 table영역 */}
            <TableForm
              showCheckbox={false}
              showHeaderArrow={false}
              tableData={deductData}
            />
        </Col>
        <Col md="3">
          {/* 조회구분 영역*/}
          <SelectForm label={labels.inquiryYype} optionList={selectOption.salOptionByPeriodList} />
          <Row>
            <TableForm tableData={selectOption.basicDeductData} />
          </Row>
          <Row>
            <TableForm tableData={selectOption.basicDeductData} />
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
