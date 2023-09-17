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
    siEmpDetailData
  } = props;

  return (
    <div>
      <Container className="siEmpDetail-container">
        <FormPanel
            INPUT_CONSTANT = {SI_EMP_DETAIL}
            columnNumber = {1}
            formData = {siEmpDetailData}
          /> 
      </Container>
    </div>
  );
};

export default SiEmpDetail;
