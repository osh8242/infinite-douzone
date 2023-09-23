import React from "react";
import { Container } from "react-bootstrap";
import { SI_EMP_PAYROLL_CRITERIA } from "./SiEmpDetailConstant";
import FormPanel from "../../../components/FormPanel";

const PayrollLedgerEntry = (props) => {
  const {
    siEmpDetailData,
    actions
  }=props;

  console.log(siEmpDetailData);
  return (
    <div className="siEmpDetail-container">
      <Container className="siEmpDetail-container">
        <div>
          <FormPanel
            INPUT_CONSTANT={SI_EMP_PAYROLL_CRITERIA}
            columnNumber={1}
            formData = {siEmpDetailData}
            //submitData={actions.submitEmpPayrollLedgerEntryData} //update 함수
          />
        </div>
      </Container>
    </div>
  );
};

export default PayrollLedgerEntry;
