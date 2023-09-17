import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import { salDeduct } from "../../../model/SalaryInformationEntry/SalConstant";

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
          {/* <TableForm
            tableFooter={
              <>
                <tr>
                  <th>공제액 계</th>
                  <td>{salDeductData.sumData.sum}</td>
                </tr>
                <tr>
                  <th>차인지급액</th>
                  <td>{salDeductData.sumData.sum}</td>
                </tr>
              </>
            }
          /> */}
        </Row>
        
      </div>
    </div>
  );
};

export default SalaryDeductPayList;
