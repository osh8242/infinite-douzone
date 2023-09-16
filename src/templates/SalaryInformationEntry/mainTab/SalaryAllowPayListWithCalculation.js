import React, { useState } from 'react';
import TableForm from '../../../components/TableForm';
import { modal_calculationModal, salAllowWithCalculation } from '../../../model/SalaryInformationEntry/SalConstant';
import { Button, Row } from 'react-bootstrap';

const SalaryAllowPayCalculation = (props) => {
    const { 
      salAllowData 
        , actions 
        , modalShow 
        , showCalculation
    } = props;

    const [showYn, setShowYn] = useState(null);
  
    const toggleCalculation = () => {
      const newShowYn = showYn === 'salaryAllowPay' ? null : 'salaryAllowPay';
      setShowYn(newShowYn);
      showCalculation(newShowYn);
    };
  
    const showCalculationModal = () => {
        modalShow('calculationInsert', modal_calculationModal);
    }

    return (
      <div>
        <div className="table-container">
          <Button onClick={toggleCalculation}>산출식</Button>
          <Button onClick={showCalculationModal}>수당/공제 등록 산출식 불러오기</Button>
          <Row>
            <TableForm
              tableName="SI_SALARY_ALLOWPAY_LIST"
              tableHeaders={salAllowWithCalculation.headers}
              tableData={salAllowData.salData}
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
                    <td>{salAllowData.sumData.taxYSum}</td>
                  </tr>
                  <tr>
                    <th>비과세</th>
                    <td>{salAllowData.sumData.taxNSum}</td>
                  </tr>
                  <tr>
                    <th>총합계</th>
                    <td>{salAllowData.sumData.sum}</td>
                  </tr>
                </>
              }
            />
          </Row>
        </div>
      </div>
    );
  };

export default SalaryAllowPayCalculation;