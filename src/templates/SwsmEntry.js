import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import { Col, Row } from "react-bootstrap";
import MenuTab from "../components/MenuTab";
import SelectForm from "../components/SelectForm";
import RadioForm from "../components/RadioForm";
import SearchPanel from "../components/SearchPanel";
import DateTest from "../components/DateTest";
import DateForm from "../components/DateForm";
import Test from "../components/Test";
import TableForm from "../components/TableForm";
import AddressForm from "../components/AddressForm";
import TextBoxComponent from "../components/TextBoxComponent";

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data
const SwsmEntry = ({ grid, mainTab, subTab }) => {
  const searchChild = [
    { key: "opt1", value: "1. 사원등록" },
    { key: "opt2", value: "2.일용직 사원등록" },
  ];

  const menuList = ["계약서 작성", "계약서 조회"];
  const menuList1 = ["근로정보"];
  const menuList2 = ["기타급여"];

  const tableDummyData = [
    {
      코드: "A1234567",
      성명: "오승환",
      주민번호: "910101-1234567",
    },
    {
      코드: "B2345678",
      성명: "이서연",
      주민번호: "920202-2345678",
    },
    {
      코드: "C3456789",
      성명: "현소현",
      주민번호: "930303-3456789",
    },
    {
      코드: "D4567890",
      성명: "김진",
      주민번호: "940404-4567890",
    },
    {
      코드: "E5678901",
      성명: "김이긴",
      주민번호: "950505-5678901",
    },
  ];

  const tableDummyData2 = [
    {
      항목: "",
      금액: "",
    },
  ];

  // 임금유형
  const optionList = [
    { key: "ename", value: "1.월급" },
    { key: "ecode", value: "2.주급" },
  ];
  // 기타급여
  const optionList2 = [
    { key: "otherBenefits", value: "0.여" },
    { key: "otherBenefits", value: "1.부" },
  ];
  // 상여금
  const optionList3 = [
    { key: "otherBenefits", value: "0.여" },
    { key: "otherBenefits", value: "1.부" },
  ];
  // 임금지급일
  const optionList4 = [
    { key: "otherBenefits", value: "1.매월" },
    { key: "otherBenefits", value: "2." },
  ];
  // 지급방법
  const optionList5 = [
    { key: "otherBenefits", value: "1.예금통장에 입금" },
    { key: "otherBenefits", value: "2." },
  ];
  // 고용보험
  const optionList6 = [
    { key: "otherBenefits", value: "0.여" },
    { key: "otherBenefits", value: "1.부" },
  ];
  // 산재보험
  const optionList7 = [
    { key: "otherBenefits", value: "0.여" },
    { key: "otherBenefits", value: "1.부" },
  ];
  // 국민연금
  const optionList8 = [
    { key: "otherBenefits", value: "0.여" },
    { key: "otherBenefits", value: "1.부" },
  ];
  // 건강보험
  const optionList9 = [
    { key: "otherBenefits", value: "0.여" },
    { key: "otherBenefits", value: "1.부" },
  ];

  return (
    <>
      <Row>
        <MenuTab menuList={menuList} />
        <Row>
          <Col>
            <SearchPanel
              children={<DateTest label={"작성년월"} />}
              optionList={optionList}
              // 아코디언 사용 시 children 속성 사라짐
              // showAccordion={false}
            />
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <TableForm
              showCheckbox={true}
              showHeaderArrow={false}
              tableData={tableDummyData}
            />
          </Col>
          <Col md="9">
            <MenuTab menuList={menuList1} />
            <Scrollbars style={{ height: 300 }}>
              {/* your content */}

              <Row className="mb-5">
                <Col xs md={{ span: 5, offset: 1 }}>
                  <DateTest label="근로계약기간" />
                </Col>
              </Row>
              {/* <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                <AddressForm label="근무장소" isZonecode={false} />
                </Col>
                </Row> */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TextBoxComponent label={"업무의내용"} />
                </Col>
              </Row>
              {/* 기간으로 변경 필요 */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TextBoxComponent label={"소정근로시간"} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TextBoxComponent label={"휴게시간"} />
                </Col>
              </Row>
              {/* 컴포넌트 사이 글자 추가 필요 */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TextBoxComponent label={"근무일"} />
                </Col>
              </Row>
              {/* 컴포넌트 사이 글자 추가 필요 */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TextBoxComponent label={"주휴일"} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="임금유형" optionList={optionList} />
                  {/* 한 라인 안에 들어가게 변경 필요 */}
                  {/* <TextBoxComponent />원 */}
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm
                    label="기타급여(제수당)"
                    optionList={optionList2}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="상여금" optionList={optionList3} />
                  {/* 한 라인 안에 들어가게 변경 필요 */}
                  {/* <TextBoxComponent />원 */}
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="임금지급일" optionList={optionList4} />
                  {/* 한 라인 안에 들어가게 변경 필요 */}
                  {/* <TextBoxComponent />원 */}
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="지급방법" optionList={optionList5} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="고용보험" optionList={optionList6} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="산재보험" optionList={optionList7} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="건강보험" optionList={optionList8} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <DateTest label="작성일자" />
                </Col>
              </Row>
            </Scrollbars>

            <MenuTab menuList={menuList2} />
            <TableForm
              showCheckbox={true}
              showHeaderArrow={false}
              tableData={tableDummyData2}
            />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default SwsmEntry;
