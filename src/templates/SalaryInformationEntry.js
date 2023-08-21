// 작성자 : 오승환
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import AddressForm from "../components/AddressForm";
import DateForm from "../components/DateForm";
import MenuTab from "../components/MenuTab";
import SearchPanel from "../components/SearchPanel";
import SelectForm from "../components/SelectForm";
import TableForm from "../components/TableForm";
import RadioForm from "../components/RadioForm";
import DateTest from "../components/DateTest";
import TextBoxComponent from "../components/TextBoxComponent";

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data

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


const LRlevel2Grid = ({ grid, mainTab, subTab }) => {
  const data = [
    { name: "홍길동", age: "20", gender: "남" },
    { name: "유관순", age: "35", gender: "여" },
    { name: "김유신", age: "16", gender: "남" },
  ];

  //검색패널 옵션
  const optionList = [
    { key: "ename", value: "이름" },
    { key: "ecode", value: "사원번호" },
  ];

  //조회구분 검색조건 옵션
  const optionList2 = [
    { key: "EmpAllThisMonth", value: "2.전체사원 당월" },
    { key: "ecode", value: "사원번호" },
  ];


  return (
    <>
      {/* 검색조건 */}
      <Row className="border my-3 mx-1">
        <Col className="my-1" md="8">
          <Row>
            <Col>
              <DateForm label={"귀속연월"}/>
            </Col>
            <Col>
              <SelectForm label={"구분"} optionList={optionList} />
            </Col>
            <Col>
              <DateForm label={"지급일"} />
            </Col>
          </Row>
        </Col>
        <Col className="d-flex align-items-center justify-content-center" md={{ span: 1, offset: 3 }}>
          <Button variant="secondary">조회</Button>
        </Col>
      </Row>
      {/* 검색조건 */}
      {/* 검색조건2 */}
      <Row className="border my-3 mx-1">
        <Col className="my-1" md="12">

            <Row>
              <Col>
                <TextBoxComponent label={"사원코드"}/>
              </Col>
              <Col>
                <TextBoxComponent label={"부서코드"} />
              </Col>
            </Row>
            
            <Row>
              <Col>
                <TextBoxComponent label={"직급코드"}/>
              </Col>
              <Col>
                <TextBoxComponent label={"직책코드"} />
              </Col>
            </Row>

            <Row>
              <Col>
                <TextBoxComponent label={"현장코드"}/>
              </Col>
              <Col>
                <TextBoxComponent label={"프로젝트코드"} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Row>
                  <SelectForm label={"생산식여부"}  optionList={ [ { key: "y", value: "생산직" },{ key: "n", value: "비생산직" }, ]} />
                  <SelectForm label={"국외근로여부"}  optionList={[{ key: "y", value: "국외근로" },{ key: "n", value: "국내근로" } ]} />
                </Row>
              </Col>
              <Col>
                
              </Col>
            </Row>

          
        </Col>
        <Col className="d-flex align-items-center justify-content-center" md={{ span: 1, offset: 6 }}>
          <Button variant="secondary">조회</Button>
        </Col>
      </Row>
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
          <SelectForm label="조회구분" optionList={optionList2} />
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

export default LRlevel2Grid;
