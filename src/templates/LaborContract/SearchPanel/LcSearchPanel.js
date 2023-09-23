import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchPanel from "../../../components/SearchPanel";
import SelectForm from "../../../components/SelectForm";
import DateForm from "../../../components/DateForm";

const LcSearchPanel = (props) => {
  const {
    onSearch,
    dateSelectRef,
    salSelectRef,
    searchSelectList,
    selectList,
  } = props;
  return (
    <SearchPanel onSearch={() => onSearch(salSelectRef)}>
      <Row>
        <Col>
          <DateForm label={"작성일자"} dateType="month" />
        </Col>
        <Col>
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

export default LcSearchPanel;
