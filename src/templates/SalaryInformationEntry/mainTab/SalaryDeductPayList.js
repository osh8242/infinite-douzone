import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import { salDeduct, sumDeductPay } from "../../../model/SalaryInformationEntry/SalConstant";

const SalaryDeductPayList = (props) => {
  const { salDeductData, showCalculation } = props;
  const [showYn, setShowYn] = useState('salaryDeductPay');
  
  const toggleCalculation = () => {
    const newShowYn = showYn === 'salaryDeductPay' ? null : 'salaryDeductPay';
    setShowYn(newShowYn);
    showCalculation(newShowYn);
  };

  return (
    <div>
      <div>
        <Row>
          <div className="leftTable">
          <Button onClick={toggleCalculation}>산출식</Button>
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
