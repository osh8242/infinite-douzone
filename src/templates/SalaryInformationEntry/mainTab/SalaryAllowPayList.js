import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import { salAllow } from "../../../model/SalaryInformationEntry/SalConstant";

const SalaryAllowPayList = (props) => {
  const { 
    state
    , actions 
    , showCalculation
  } = props;
  const [showYn, setShowYn] = useState('salaryAllowPay');

  const toggleCalculation = () => {
    const newShowYn = showYn === 'salaryAllowPay' ? null : 'salaryAllowPay';
    setShowYn(newShowYn);
    showCalculation(newShowYn);
  };

  return (
    <div>
      <div className="table-container">
        <Button onClick={toggleCalculation}>산출식</Button>
        <Row>
          <TableForm
            tableName="SI_SALARY_ALLOWPAY_LIST"
            tableHeaders={salAllow.headers}
            tableData={state.salAllowData.salData}
            rowAddable
            actions={{
              setTableData: actions.setSalData,
              setEditedRow: actions.setEditedAllow,
              updateEditedRow: actions.updatesalaryAllowPay,
            }}
          />
        </Row>
        <Row className="table-footer">
          <TableForm
            tableFooter={
              <>
                <tr>
                  <th>과세</th>
                  <td>{state.salAllowData.sumData.taxYSum}</td>
                </tr>
                <tr>
                  <th>비과세</th>
                  <td>{state.salAllowData.sumData.taxNSum}</td>
                </tr>
                <tr>
                  <th>총합계</th>
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

export default SalaryAllowPayList;
