// 작성자 : 오승환
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DateForm from "../components/DateForm";
import SearchPanel from "../components/SearchPanel";
import SelectForm from "../components/SelectForm";
import TableForm from "../components/TableForm";
import ModalComponent from "../components/ModalComponent";
import CodeHelperTable from "../components/CodeHelperTable";
import TextBoxComponent from "../components/TextBoxComponent";

//사원테이블
const EmpData = [
  {
    code: "A1234567",
    사원명: "오승환",
    직급: "대리",
    감면율: "재직",
  },
  {
    code: "B2345678",
    사원명: "이서연",
    직급: "",
    감면율: "재직",
  },
  {
    code: "C3456789",
    사원명: "현소현",
    직급: "",
    감면율: "퇴직",
  },
  {
    code: "D4567890",
    사원명: "김진",
    직급: "",
    감면율: "재직",
  },
  {
    code: "E5678901",
    사원명: "김이긴",
    "내/외": "내국인",
    주민번호: "950505-5678901",
    구분: "퇴직",
  },
];

//  사원별 급여항목
const SalData = [
  {
    급여항목: "기본급",
    금액: "500000",  
  },
  {
    급여항목: "연장근로",
    금액: "50000",  
  },
  {
    급여항목: "식대",
    금액: "500000",  
  },
  {
    급여항목: "연구개발비",
    금액: "",  
  },
]

//  사원별 공제항목
const DeductionData = [
  {
    공제항목: "국민연금",
    금액: "500000",  
  },
  {
    공제항목: "건강보험",
    금액: "50000",  
  },
  {
    공제항목: "고용보험",
    금액: "500000",  
  },
  {
    공제항목: "장기요양보험료",
    금액: "",  
  },
  {
    공제항목: "대출",
    금액: "",  
  },
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

//부서코드도움 테이블
const deptCodeTable = [
  { key: "DE_HR", value: "인사팀" },
  { key: "DE_", value: "플랫폼팀" },
  { key: "DE_ERP", value: "ERP팀" },
];

const SalaryInformationEntry = ({ grid, mainTab, subTab }) => {
  
  const [modalState, setModalState] = useState({
    show: false
    , modalData: null 
  });

  useEffect(() => {
    setModalState({  show: true  });
  }, []);

  // 코드도움 아이콘 클릭
  const handleCodeHelperShow = useCallback((tableData) => {
    
    setModalState({
      show: true,
      modalData: tableData, 
    });
    
  }, []);


 // 조회버튼 이벤트
  const onSearch = () => {
    alert("검색버튼 눌러뗭><");
  }
  

  return (
    <>
      {/* 코드도움 모달 영역 */}
      {/* <ModalComponent show={modalState.show} onHide={() => setModalState({ ...modalState, show: false })}>
        {modalState.modalData && ( 
          <CodeHelperTable codeTableData={modalState.modalData} />
        )}
      </ModalComponent> */}

      {/* 기본 검색조건 */}
      <SearchPanel onSearch={onSearch} showAccordion>
        <Row>
          <Col>
            <DateForm label={"귀속연월"} />
          </Col>
          <Col>
            <SelectForm label={"구분"} optionList={salOptionList} />
          </Col>
          <Col>
            <DateForm label={"지급일"} />
          </Col>
        </Row>

        {/* 상세 검색조건 */}
        <div>
          <Row>
            <Col>
              <TextBoxComponent type='codeHelper' label={"사원코드"}/>
            </Col>
            <Col>
              {/* <TextBoxComponent type='codeHelper' label={"부서코드"} onClick={handleCodeHelperShow} tableData={deptCodeTable}/> */}
            </Col>
          </Row>

          <Row>
            <Col>
              <TextBoxComponent type='codeHelper' label={"직급코드"} />
            </Col>
            <Col>
              <TextBoxComponent type='codeHelper' label={"직책코드"} />
            </Col>
          </Row>

          <Row>
            <Col>
              <TextBoxComponent type='codeHelper' label={"현장코드"} />
            </Col>
            <Col>
              <TextBoxComponent type='codeHelper' label={"프로젝트코드"} />
            </Col>
          </Row>

          <Row>
            <Col>
              <SelectForm
                label={"생산직여부"}
                optionList={[
                  { key: "y", value: "생산직" },
                  { key: "n", value: "비생산직" },
                ]}
              />
            </Col>
            <Col>
              <SelectForm
                label={"국외근로여부"}
                optionList={[
                  { key: "y", value: "국외근로" },
                  { key: "n", value: "국내근로" },
                ]}
              />
            </Col>
          </Row>
        </div>
      </SearchPanel>
      {/* 검색조건2 */}

      <Row>
        <Col md="3">
          {/* 사원정보 table영역 */}
          <TableForm
            showCheckbox={true}
            showHeaderArrow={true}
            tableData={EmpData}
          />
        </Col>
        <Col md="3">
          {/* 급여항목 table영역 */}
          <TableForm tableData={SalData} />
        </Col>
        <Col md="3">
          {/* 공제항목 table영역 */}
          <TableForm tableData={DeductionData} />
        </Col>
        <Col md="3">
          {/* 조회구분 */}
          <SelectForm label="조회구분" optionList={salOptionByPeriodList} />
          <Row>
            <TableForm tableData={DeductionData} />
          </Row>
          <Row>
            <TableForm tableData={EmpData} />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SalaryInformationEntry;
