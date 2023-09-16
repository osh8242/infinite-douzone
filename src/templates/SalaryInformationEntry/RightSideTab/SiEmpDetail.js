import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import TextBoxComponent from "../../../components/TextBoxComponent";
import "../../../styles/SalaryInformationEntry/SalaryInformationEntryLayout.scss";
import { SI_EMP_DETAIL} from "./SiEmpDetailConstant";
import { INPUT_TYPE } from "../../../model/CommonConstant";
import FormPanel from "../../../components/FormPanel";


// 사원 상세정보 영역 
const SiEmpDetail = (props) => {
  const {
  } = props;

  return (
    <div className="siEmpDetail-container">
      <Container className="siEmpDetail-container">
        <FormPanel
            INPUT_CONSTANT = {SI_EMP_DETAIL}
            columnNumber = {1}
          /> 
      </Container>
    </div>
  );
};

export default SiEmpDetail;
