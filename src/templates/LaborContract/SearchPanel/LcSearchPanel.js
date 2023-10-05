import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import SearchPanel from "../../../components/SearchPanel";
import SelectForm from "../../../components/SelectForm";
import DateForm from "../../../components/DateForm";

const LcSearchPanel = (props) => {
  const { onSearch, jobSetSelectRef, searchOption, onSelect, dateSelectRef } =
    props;

  return (
    <Col className="border light-grey-border p-3">
      <div style={{ marginTop: "-12px" }}>
        <SearchPanel onSearch={() => onSearch(searchOption)} hideButton>
          <Row className="searchPanel deleteLabelBackground">
            <Col md="4">
              <DateForm
                label={"작성일자"}
                dateType="month"
                selectRef={dateSelectRef}
                onChange={onSelect}
                id={"dateOfcreate"}
              />
            </Col>
            <Col md={{ span: 5, offset: 1 }}>
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
      </div>
    </Col>
  );
};

export default LcSearchPanel;
