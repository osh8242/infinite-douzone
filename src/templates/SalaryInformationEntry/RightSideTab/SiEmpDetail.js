import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import TextBoxComponent from "../../../components/TextBoxComponent";
import "../../../styles/SalaryInformationEntry/SalaryInformationEntryLayout.scss";
import { SI_EMP_DETAIL} from "./SiEmpDetailConstant";
import { INPUT_TYPE } from "../../HrManagement/MainTab/HrMainTabConstant";

// 사원 상세정보 영역 
const SiEmpDetail = (props) => {
  const {
    siEmpDetailData,
    columnNumber = 1
  } = props;

  const defaultMd = 12 / columnNumber;
  const columns = [];

  const wrappingColTag = (input, index, span = 1) => {
    let md = defaultMd * span;
    if (md > 12) md = 12;
    return (
      <Col xs md={md} key={index}>
        {input}
      </Col>
    );
  };

  const inputs = SI_EMP_DETAIL.empDetailInputs;
  inputs.forEach((input, index) => {
    switch (input.type) {
      case INPUT_TYPE.text:
        columns.push(
          wrappingColTag(
            <TextBoxComponent
              id={input.field}
              label={input.label}
              value={siEmpDetailData[input.field] || ""}
            />,
            index,
            input.span
          )
        );
        break;
      
      default:
        break;
    }
  });

  const rows = [];
  for (let i = 0; i < columns.length; ) {
    let mdSum = 0;
    let tempRow = [];
    for (let j = i; j < i + columnNumber && j < columns.length; j++) {
      mdSum += inputs[j].span ? Math.min(defaultMd * inputs[j].span,12) : defaultMd;
      if (mdSum <= 12) {
        tempRow.push(columns[j]);
        i++;
      } else {
        break;
      }
    }
    rows.push(<Row key={i}>{tempRow}</Row>);
  }

  return (
    <div className="siEmpDetail-container">
      <Container className="siEmpDetail-container">
        <Card>
          <Card.Header as="h5">사원정보</Card.Header>
          <Card.Body>
              <>{rows}</>
          </Card.Body>
        </Card>
        </Container>
    </div>
  );
};

export default SiEmpDetail;
