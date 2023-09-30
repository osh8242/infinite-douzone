import React, { useState } from "react";
import { Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import { salDeduct, sumDeductPay } from "../../../model/SalaryInformationEntry/SalConstant";

const SalaryDeductPayList = (props) => {
  const { salDeductData, ynComplete, actions } = props;
  
  return (
    <div>
      <div>
        <Row>
          <div className="hr-leftTable">
          <TableForm
              tableName="SI_SALARY_DEDUCTPAY_LIST"
              readOnly={ynComplete === 'Y'}
              tableHeaders={salDeduct.headers}
              tableData={salDeductData.deductData}
              actions={{
                setTableData: actions.setDeductData,
                updateEditedRow: actions.updateSalaryDeductPay,
              }}
            />
          </div>
        </Row>
        {/* 통계 테이블 */}
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
