import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchPanel from "../../../components/SearchPanel";
import SelectForm from "../../../components/SelectForm";

const HrSearchPanel = (props) => {
  const { onSearch, jobOkSelectRef, orderSelectRef, searchOption, orderList } =
    props;
  return (
    <SearchPanel onSearch={() => onSearch(jobOkSelectRef, orderSelectRef)}>
      <Row>
        <Col>
          <SelectForm
            label={"구분"}
            optionList={searchOption}
            selectRef={jobOkSelectRef}
          />
        </Col>
        <Col>
          <SelectForm
            label={"정렬"}
            optionList={orderList}
            selectRef={orderSelectRef}
          />
        </Col>
      </Row>
    </SearchPanel>
  );
};

export default HrSearchPanel;
