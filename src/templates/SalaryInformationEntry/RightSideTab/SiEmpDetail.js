import React from "react";
import { Container } from "react-bootstrap";
import "../../../styles/SalaryInformationEntry/SalaryInformationEntryLayout.scss";
import { SI_EMP_DETAIL } from "./SiEmpDetailConstant";
import FormPanel from "../../../components/FormPanel";

// 사원 상세정보 영역
const SiEmpDetail = (props) => {
  const { siEmpDetailData } = props;

  return (
    <div>
      <Container className="siEmpDetail-container">
        <FormPanel
          INPUT_CONSTANT={SI_EMP_DETAIL}
          columnNumber={1}
          formData={siEmpDetailData}
        />
      </Container>
    </div>
  );
};

export default SiEmpDetail;
