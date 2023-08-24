// 작성자 : 오승환
import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import SearchPanel from "../components/SearchPanel";
import SelectForm from "../components/SelectForm";
import TableForm from "../components/TableForm";
import TextBoxComponent from "../components/TextBoxComponent";
import SalaryInformationEntryModel from "../model/SalaryInformationEntryModel";
import ModalComponent from "../components/ModalComponent";
import DateTest from "../components/DateTest";

// nodata 급여_사원리스트
const basicSaEmpData = [
  { 사원코드 : "", 사원이름 : "", 직급 : "", 감면율 : ""},
]

// nodata 급여항목
const basicSalData = [
  { 공제항목 : "기본급",지급금액 : ""},
  { 공제항목 : "연장근로", 지급금액 : ""},
  { 공제항목 : "식대",지급금액 : ""},
  { 공제항목 : "연구개발비",지급금액 : ""}
]

// nodata 사원별 공제항목
const basicDeductData = [
  {공제항목: "국민연금",  금액: ""},
  {공제항목: "건강보험",  금액: ""},
  {공제항목: "고용보험",  금액: ""},
  {공제항목: "장기요양보험료",  금액: ""},
  {공제항목: "대출",  금액: ""}
]

//구분 옵션
const salOptionList = [
  { key: "sal"      , value: "1.급여" },
  { key: "sal+bonus", value: "2.급여+상여" },
  { key: "bonus"    , value: "3.상여" },
  { key: "plusSal"  , value: "5.추급" },
  { key: "plusBonus", value: "6.추상" },
];

//조회구분 검색조건 옵션
const salOptionByPeriodList = [
  { key: "EmpAllThisMonth", value: "0.전체사원 당월" },
  { key: "EmpOneThisMonth", value: "1.현재사원 당월" },
  { key: "EmpAlleCurrent",  value: "2.전체사원 현재" },
  { key: "EmpOneCurrent",   value: "3.현재사원 현재" },
  { key: "EmpAllThisMonth", value: "4.전체사원 연간" },
  { key: "EmpOneThisYear",  value: "5.현재사원 연간" },
];

//생산직 여부 검색조건 옵션
const unitOption = [
  { key: "y", value: "생산직" },
  { key: "n", value: "비생산직" },
];

//국외 근로여부 검색조건 옵션
const forLaborOption =[
  { key: "y", value: "국외근로" },
  { key: "n", value: "국내근로" },
]

//부서코드도움 테이블
const deptCodeTable = [
  { key: "DE_HR", value: "인사팀" },
  { key: "DE_", value: "플랫폼팀" },
  { key: "DE_ERP", value: "ERP팀" },
];

const SalaryInformationEntry = ({ grid, mainTab, subTab }) => {

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
 
    , cdEmp
    , setCdEmp
    , salDivision
    , setSalDivision
    , allowMonth
    , setAllowMonth
    , paymentDate
    , setPaymentDate
    , searchVo
    , setSearchVo
  } = SalaryInformationEntryModel();
  
  
  // 코드도움 아이콘 클릭
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
      {/* 코드도움 모달 영역 */}
      <ModalComponent show={modalState.show} onHide={() => setModalState({ ...modalState, show: false })} size="lg" centered>
        <TableForm
          showCheckbox={false}
          showHeaderArrow={false}
          tableData={saInfoListData}
        ></TableForm>
      </ModalComponent>

      {/* 기본 검색조건 */}
      <SearchPanel onSearch={onSearch} showAccordion>
        <Row>
          <Col>
            <DateTest type="month" label={"귀속연월"} value={allowMonth} onChange={setAllowMonth}/>
          </Col>
          <Col>
            <SelectForm label={"구분"} optionList={salOptionList} onChange={setSalDivision}/>
          </Col>
          <Col>
            <DateTest label={"지급일"} value={paymentDate} onChange={setPaymentDate}/>
          </Col>
        </Row>

        {/* 상세 검색조건 */}
        <div>
          <Row>
            <Col>
              <TextBoxComponent
                type="codeHelper"
                name="searchEmpCd"
                label={"사원코드"}
              />
            </Col>
            <Col>
              <TextBoxComponent
                type="codeHelper"
                name="searchDeptCd"
                label={"부서코드"}
                onClick={codeHelperShow}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <TextBoxComponent
                type="codeHelper"
                name="searchRankNo"
                label={"직급코드"}
              />
            </Col>
            <Col>
              <TextBoxComponent
                type="codeHelper"
                name="searchCdOccup"
                label={"직책코드"}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <TextBoxComponent
                type="codeHelper"
                name="searchCdField"
                label={"현장코드"}
              />
            </Col>
            <Col>
              <TextBoxComponent
                type="codeHelper"
                name="searchCdProject"
                label={"프로젝트코드"}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <SelectForm label={"생산직여부"} optionList={unitOption} />
            </Col>
            <Col>
              <SelectForm label={"국외근로여부"} optionList={forLaborOption} />
            </Col>
          </Row>
        </div>
      </SearchPanel>

      <Row>
        <Col md="3">
          {/* 사원정보 table영역 */}
          {saInfoListData ? (
            <TableForm
              showCheckbox={true}
              showHeaderArrow={true}
              tableData={saInfoListData}
              rowClickHandler={setCdEmp}
            />
          ) : (
            <TableForm tableData={basicSaEmpData} />
          )}
        </Col>
        <Col md="3">
          {/* 급여항목 table영역 */}
          {salData ? (
            <TableForm
              showCheckbox={false}
              showHeaderArrow={false}
              tableData={salData}
              rowClickHandler={setCdEmp}
            />
          ) : (
            <TableForm tableData={basicSalData} />
          )}
        </Col>
        <Col md="3">
          {/* 공제항목 table영역 */}
          {deductData ? (
            <TableForm
              showCheckbox={false}
              showHeaderArrow={false}
              tableData={deductData}
            />
          ) : (
            <TableForm tableData={basicDeductData} />
          )}
        </Col>
        <Col md="3">
          {/* 조회구분 영역*/}
          <SelectForm label="조회구분" optionList={salOptionByPeriodList} />
          <Row>
            <TableForm tableData={basicDeductData} />
          </Row>
          <Row>
            <TableForm tableData={basicDeductData} />
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
                  <TextBoxComponent label='입사일' value={saInfoDetailData.daEnter}/>
                  <TextBoxComponent label='배우자공제' value={saInfoDetailData.ynMateDed}/>
                  <TextBoxComponent label='20세/60세/다자녀' value={saInfoDetailData.num20Family + '/' + saInfoDetailData.num60Family + '/' + saInfoDetailData.numManyFamily}/>
                  <TextBoxComponent label='조정율' value='구현중'/>
                  <TextBoxComponent label='거주구분' value={saInfoDetailData.ynResident}/>
                  <TextBoxComponent label='생산/국외' value={saInfoDetailData.ynUnit + '/' + saInfoDetailData.ynForLabor}/>
                  <TextBoxComponent label='연장근로비과세' value={saInfoDetailData.ynOverwork}/>
                  <TextBoxComponent label='퇴사일' value={saInfoDetailData.daRetire}/>
                  <TextBoxComponent label='직종' value={saInfoDetailData.cdOccup}/>
                  <TextBoxComponent label='부서' value={saInfoDetailData.cdDept}/>
                  <TextBoxComponent label='현장' value={saInfoDetailData.cdField}/>
                  <TextBoxComponent label='프로젝트' value={saInfoDetailData.cdProject}/>
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
