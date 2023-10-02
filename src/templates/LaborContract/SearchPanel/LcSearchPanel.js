import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchPanel from "../../../components/SearchPanel";
import SelectForm from "../../../components/SelectForm";
import DateForm from "../../../components/DateForm";

const LcSearchPanel = (props) => {
  const { onSearch, jobSetSelectRef, searchOption, onSelect, dateSelectRef } =
    props;
  return (
    <SearchPanel onSearch={() => onSearch(searchOption)} hideButton>
      <Row className="searchPanel">
        <Col md="4">
          <DateForm
            label={"작성일자"}
            dateType="month"
            selectRef={dateSelectRef}
            onChange={onSelect}
            id={"dateOfcreate"}
          />
        </Col>
        <Col md="4">
          <SelectForm
            label={"소득구분"}
            optionList={searchOption}
            selectRef={jobSetSelectRef}
            id={"incomeClassfication"}
            onChange={onSelect}
          />
        </Col>
      </Row>
    </SearchPanel>
  );
};

export default LcSearchPanel;
