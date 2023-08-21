// 작성자 : 오승환
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import SelectForm from "./SelectForm";

const SearchPanel = ({ searchOption, orderList }) => {
  return (
    <>
      <Row className="border my-3 mx-1">
        <Col className="my-1" md="6">
          <Row>
            <Col>
              <SelectForm label={"구분"} optionList={searchOption} />
            </Col>
            <Col>
              <SelectForm label={"정렬"} optionList={orderList} />
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
