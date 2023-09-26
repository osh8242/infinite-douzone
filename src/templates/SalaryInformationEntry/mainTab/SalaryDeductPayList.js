import React, { useState } from "react";
import { Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import { salDeduct, sumDeductPay } from "../../../model/SalaryInformationEntry/SalConstant";

const SalaryDeductPayList = (props) => {
  const { salDeductData } = props;
  
  return (
    <div>
      <div>
        <Row>
          <div className="hr-leftTable">
          <TableForm
              tableName="SI_SALARY_DEDUCTPAY_LIST"
              readOnly
              tableHeaders={salDeduct.headers}
              tableData={salDeductData.deductData}
              actions={{}}
            />
          </div>
        </Row>

        <Row className="mt-3">
          <TableForm
            tableName="EMPSTATICS"
            tableHeaders={sumDeductPay.headers}
            tableData={salDeductData.sumDeductPay}
            readOnly
          /> 
        </Row>
        
      </div>
    </div>
  );
};

export default SalaryDeductPayList;
