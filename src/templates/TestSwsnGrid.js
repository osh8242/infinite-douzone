import React from "react";
import { Col, Row } from "react-bootstrap";
import MenuTab from "../components/MenuTab";
import SearchPanel from "../components/SearchPanel";
import DateTest from "../components/DateTest";
import SelectForm from "../components/SelectForm";
import SwsmConstant from "../model/SwsmConstant";
import TableTemp from "../components/TableTemp";

const TestSwsnGrid = () => {
  const {
    mainTabMenuList, // 전체 구분 목록
    incomeClassficationList, // 상단 조회 - 소득구분 목록
  } = SwsmConstant();

  return (
    <>
      <Row className="py-1">
        <MenuTab menuList={mainTabMenuList} />
        <SearchPanel>
          <Row>
            <Col md="4">
              <DateTest label={"작성년월"} />
            </Col>
            <Col md="4">
              <SelectForm
                label={"소득구분"}
                optionList={incomeClassficationList}
              />
            </Col>
          </Row>
        </SearchPanel>
        <Row>
          <Col md="3">
            <TableTemp showCheckbox={true} showHeaderArrow={true} />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default TestSwsnGrid;
