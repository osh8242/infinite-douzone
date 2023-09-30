import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchPanel from "../../../components/SearchPanel";
import SelectForm from "../../../components/SelectForm";
import DateForm from "../../../components/DateForm";
import "../../../styles/DateForm.css";
const LcSearchSearchPanel = (props) => {
  const {
    onSearch,
    dateSelectRef,
    salSelectRef,
    searchSelectList,
    selectList,
  } = props;
  return (
    // select 만 확인하고 추가필요
    <SearchPanel onSearch={() => onSearch(salSelectRef)}>
      <Row className="searchPanel">
        <Col className="mx-1 col-md-7">
          <DateForm label={"작성일자"} sub="true" dateType="month" />
        </Col>
        {/* <Col className="mx-0 col-md-3">
          <DateForm label={"~"} dateType="month" />
        </Col> */}
        <Col md="4">
          <SelectForm
            label={"소득구분"}
            optionList={selectList}
            selectRef={salSelectRef}
          />
        </Col>
      </Row>
    </SearchPanel>
  );
};

export default LcSearchSearchPanel;
