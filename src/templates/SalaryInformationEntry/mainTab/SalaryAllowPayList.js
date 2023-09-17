import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import {
  modal_addSalAllow,
  salAllow,
  salAllowSumData,
} from "../../../model/SalaryInformationEntry/SalConstant";
import "../../../styles/HrManagement/HrManagementLayout.scss";

const SalaryAllowPayList = (props) => {
  const { salAllowData, actions, showCalculation, modalShow } = props;
  const [showYn, setShowYn] = useState("salaryAllowPay");

  const toggleCalculation = () => {
    const newShowYn = showYn === "salaryAllowPay" ? null : "salaryAllowPay";
    setShowYn(newShowYn);
    showCalculation(newShowYn);
  };

  console.log(salAllowData.salAllowPayTotalTableData);
  console.log(salAllowSumData.headers);
  return (
    <div>
      <Row>
        <div className="leftTable">
          <Button onClick={()=>{toggleCalculation()}}>산출식</Button>
          <TableForm
            tableName="SI_SALARY_ALLOWPAY_LIST"
            tableHeaders={salAllow.headers}
            tableData={salAllowData.salData}
            rowAddable
            codeHelper
            actions={{
              setTableData: actions.setSalData,
              updateEditedRow: actions.setAddSalAllowPayRow,
              setCodeHelper : ()=> modalShow('addSalAllowPay', modal_addSalAllow, actions.setAddSalAllowPay)
            }}
          />
        </div>
      </Row>
      {/* 통계 테이블 */}
       <Row className="mt-3">
        {/* <TableForm
          tableName="EMPSTATICS"
          tableHeaders={salAllowSumData.headers}
          tableData={salAllowData.salAllowPayTotalTableData}
          readOnly
        /> */}
      </Row>
    </div>
  );
};

export default SalaryAllowPayList;
