// 작성자 : 오승환
import React from "react";
import { Col, Row } from "react-bootstrap";
import MenuTab from "../components/MenuTab";
import SelectForm from "../components/SelectForm";
import SearchPanel from "../components/SearchPanel";
import DateForm from "../components/DateForm";
import TextBoxComponent from "../components/TextBoxComponent";

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data
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
            
            
            <Col xs md={{ span: 5, offset: 1 }}>
              <SelectForm label="성별" optionList={optionList} />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <SelectForm label={"생년월일"} optionList={optionList} />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <SelectForm label={"구분"} optionList={optionList} />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <TextBoxComponent label="비고" type="textarea" rows="3"/>
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <TextBoxComponent label="첨부파일" type="file"/>
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <TextBoxComponent label="숫자" type="number"/>
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <TextBoxComponent label="영문성명" placeholder="영문성명 입력" />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <TextBoxComponent label="퍼센트" type="rate" />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <TextBoxComponent label="원화" type="won" />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <TextBoxComponent label="날짜" type="date" />
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <TextBoxComponent label="주민번호" type="regNum"/>
            </Col>
            <Col xs md={{ span: 5, offset: 1 }}>
              <TextBoxComponent label="비밀번호" type="password" />
            </Col>
            {/* <Col xs md={{ span: 5, offset: 1 }}>
              <TextBoxComponent label="커스텀format" type="customformat" format="#/#/#" />
            </Col> */}
            
          </Row>
          <MenuTab menuList={menuList2} />
          <SelectForm label="영문성명" optionList={optionList} />
        </Col>
      </Row>
    </>
  );
};

export default LRlevel2Grid;
