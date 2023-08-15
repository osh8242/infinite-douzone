import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import SelectForm from "./SelectForm";

const SearchPanel = ({ optionList }) => {
  return (
    <>
      <Row className="border my-3 mx-1">
        <Col className="my-1" md="6">
          <Row>
            <Col>
              <SelectForm label={"구분"} optionList={optionList} />
            </Col>
            <Col>
              <SelectForm label={"정렬"} optionList={optionList} />
            </Col>
          </Row>
        </Col>

        <Col
          className="my-1 d-flex align-items-center justify-content-center"
          md={{ span: 1, offset: 5 }}
        >
          <Button variant="secondary">조회</Button>
        </Col>
      </Row>
    </>
  );
};

export default SearchPanel;
