// 작성자 : 오승환
import React from "react";
import { Col, Row } from "react-bootstrap";
import MenuTab from "../components/MenuTab";
import SelectForm from "../components/SelectForm";
import RadioForm from "../components/RadioForm";
import SearchPanel from "../components/SearchPanel";
import DateTest from "../components/DateTest";
import DateForm from "../components/DateForm";

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data
const TestGrid = ({ grid, mainTab, subTab }) => {
  const data = [
    { name: "홍길동", age: "20", gender: "남" },
    { name: "유관순", age: "35", gender: "여" },
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
          <DateTest label="입사일" />
        </Col>
        <Col md="9">
          <MenuTab menuList={menuList1} />
          <Row className="mb-5">
            <Col xs md={{ span: 5, offset: 1 }}>
              <SelectForm label="영문성명" optionList={optionList} />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <SelectForm label="한자성명" optionList={optionList} />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <SelectForm label="주민등록번호" optionList={optionList} />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <RadioForm label={"성별"} optionList={radioList} />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <DateForm label={"생년월일"} />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <SelectForm label={"구분"} optionList={optionList} />
            </Col>
          </Row>
          <MenuTab menuList={menuList2} />
          <SelectForm label="영문성명" optionList={optionList} />
        </Col>
      </Row>
    </>
  );
};

export default TestGrid;
