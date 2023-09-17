import React from "react";
import { Container } from "react-bootstrap";
import { SI_EMP_PAYROLL_CRITERIA } from "./SiEmpDetailConstant";
import FormPanel from "../../../components/FormPanel";

const PayrollLedgerEntry = (props) => {
  const {
    siEmpDetailData
  }=props;

  return (
    <div className="siEmpDetail-container">
      <Container className="siEmpDetail-container">
        <div>
          <FormPanel
            INPUT_CONSTANT={SI_EMP_PAYROLL_CRITERIA}
            columnNumber={1}
            formData = {siEmpDetailData}
          />
        </div>
      </Container>
    </div>
  );
};

export default PayrollLedgerEntry;
