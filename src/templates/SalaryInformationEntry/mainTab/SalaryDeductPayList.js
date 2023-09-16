import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import { salDeduct } from "../../../model/SalaryInformationEntry/SalConstant";

const SalaryDeductPayList = (props) => {
  const { state, showCalculation } = props;
  const [showYn, setShowYn] = useState('salaryDeductPay');

  const toggleCalculation = () => {
    const newShowYn = showYn === 'salaryDeductPay' ? null : 'salaryDeductPay';
    setShowYn(newShowYn);
    showCalculation(newShowYn);
  };

  return (
    <div>
      <div className="table-container">
        <Row>
          <div className="leftTable">
          <Button onClick={toggleCalculation}>산출식</Button>
          <TableForm
              tableName="SI_SALARY_DEDUCTPAY_LIST"
              readOnly
              tableHeaders={salDeduct.headers}
              tableData={state.deductData.deductData}
              actions={{}}
            />
          </div>
        </Row>
        <Row className="table-footer">
          <TableForm
            tableFooter={
              <>
                <tr>
                  <th>공제액 계</th>
                  <td>{state.deductData.sumData.sum}</td>
                </tr>
                <tr>
                  <th>차인지급액</th>
                  <td>{state.salAllowData.sumData.sum}</td>
                </tr>
              </>
            }
          />
        </Row>
      </div>
    </div>
  );
};

export default SalaryDeductPayList;
