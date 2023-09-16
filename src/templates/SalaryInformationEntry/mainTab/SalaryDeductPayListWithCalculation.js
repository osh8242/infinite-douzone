import React, { useState } from 'react';
import { Button, Row, Table } from 'react-bootstrap';
import TableForm from '../../../components/TableForm';
import { salDeduct, salDeductWithCalculation } from '../../../model/SalaryInformationEntry/SalConstant';

const SalaryDeductPayCalculation = (props) => {
    const { 
      deductData
      , showCalculation

    } = props;
    const [showYn, setShowYn] = useState(null);
  
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
                tableHeaders={salDeductWithCalculation.headers}
                tableData={deductData.deductData}
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
                    <td>{deductData.sumData.sum}</td>
                  </tr>
                  <tr>
                    <th>차인지급액</th>
                    <td>
                      {/* {deductData.sumData.sum} */}
                    </td>
                  </tr>
                </>
              }
            />
          </Row>
        </div>
      </div>
    );
  };
  
export default SalaryDeductPayCalculation;