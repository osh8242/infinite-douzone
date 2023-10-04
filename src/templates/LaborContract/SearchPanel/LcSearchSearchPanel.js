import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchPanel from "../../../components/SearchPanel";
import SelectForm from "../../../components/SelectForm";
import DateForm from "../../../components/DateForm";
import "../../../styles/DateForm.css";

const LcSearchSearchPanel = (props) => {
  const {
    onSearch,
    jobSelectRef,
    searchOption,
    dateSelectRef,
    dateEndSelectRef,
    onSelect,
  } = props;

  return (
    <Col className="border light-grey-border p-3">
      {" "}
      <div style={{ marginTop: "-12px" }}>
        <SearchPanel
          onSearch={() =>
            onSearch(jobSelectRef, dateSelectRef, dateEndSelectRef)
          }
        >
          <Row className="searchPanel deleteLabelBackground">
            <Col className="mx-1 col-md-7">
              <DateForm
                label={"작성기간"}
                sub="true"
                dateType="month"
                selectRef={dateSelectRef}
                selectEndRef={dateEndSelectRef}
                onChange={onSelect}
              />
            </Col>
            {/* <Col className="mx-0 col-md-3">
          <DateForm label={"~"} dateType="month" />
        </Col> */}
            <Col style={{ marginLeft: "35px" }}>
              <SelectForm
                label={"소득구분"}
                optionList={searchOption}
                selectRef={jobSelectRef}
              />
            </Col>
          </Row>
        </SearchPanel>
      </div>
    </Col>
  );
};

export default LcSearchSearchPanel;
