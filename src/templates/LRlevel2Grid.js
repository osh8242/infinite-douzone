// 작성자 : 오승환
import React from "react";
import { Col, Row } from "react-bootstrap";
import AddressForm from "../components/AddressForm";
import DateForm from "../components/DateForm";
import MenuTab from "../components/MenuTab";
import SearchPanel from "../components/SearchPanel";
import SelectForm from "../components/SelectForm";
import TableForm from "../components/TableForm";
import RadioForm from "../components/RadioForm";
import DateTest from "../components/DateTest";

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data

const dummyData = [
  {
    code: "A1234567",
    사원명: "오승환",
    "내/외": "내국인",
    주민번호: "910101-1234567",
    구분: "재직",
  },
  {
    code: "B2345678",
    사원명: "이서연",
    "내/외": "외국인",
    주민번호: "920202-2345678",
    구분: "재직",
  },
  {
    code: "C3456789",
    사원명: "현소현",
    "내/외": "내국인",
    주민번호: "930303-3456789",
    구분: "퇴직",
  },
  {
    code: "D4567890",
    사원명: "김진",
    "내/외": "외국인",
    주민번호: "940404-4567890",
    구분: "재직",
  },
  {
    code: "E5678901",
    사원명: "김이긴",
    "내/외": "내국인",
    주민번호: "950505-5678901",
    구분: "퇴직",
  },
];

const LRlevel2Grid = ({ grid, mainTab, subTab }) => {
  const data = [
    { name: "홍길동", age: "20", gender: "남" },
    { name: "유관순", age: "35", gender: "여" },
    { name: "김유신", age: "16", gender: "남" },
  ];

  const menuList1 = ["기초정보", "인적정보"];
  const menuList2 = ["가족", "학력", "경력", "신체", "병역"];

  const optionList = [
    { key: "ename", value: "이름" },
    { key: "ecode", value: "사원번호" },
  ];

  const radioList = [
    { key: "M", value: "남자" },
    { key: "F", value: "여자" },
  ];

  return (
    <>
      <SearchPanel optionList={optionList} />
      <Row>
        <Col md="3">
          <SelectForm label="영문성명" optionList={optionList} />
          <DateForm label="입사일" />
        </Col>
        <Col md="9">
          <MenuTab menuList={menuList1} />
          <Row className="mb-5">
            <Col xs md="6">
              <SelectForm label="영문성명" optionList={optionList} />
            </Col>
            <Col xs md="6">
              <SelectForm label="한자성명" optionList={optionList} />
            </Col>
            <Col xs md="6">
              <SelectForm label="주민등록번호" optionList={optionList} />
            </Col>
            <Col xs md="6">
              <RadioForm label={"성별"} optionList={radioList} />
            </Col>
            <Col xs md="6">
              <DateTest label={"생년월일"} />
            </Col>
            <Col xs md="6">
              <SelectForm label={"구분"} optionList={optionList} />
            </Col>
            <Col>
              <AddressForm label="주소" isZonecode={true} />
            </Col>
          </Row>
          <MenuTab menuList={menuList2} />
          <TableForm
            showCheckbox={true}
            showHeaderArrow={true}
            tableData={dummyData}
          />
        </Col>
      </Row>
    </>
  );
};

export default LRlevel2Grid;
