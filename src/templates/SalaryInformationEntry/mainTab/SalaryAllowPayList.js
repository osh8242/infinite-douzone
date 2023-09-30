import React from "react";
import { Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import {
  salAllow,
  sumAllowPay,
} from "../../../model/SalaryInformationEntry/SalConstant";
import "../../../styles/HrManagement/HrManagementLayout.scss";

const SalaryAllowPayList = (props) => {
  const { salAllowData, actions, ynComplete } = props;
  
  return (
    <div>
      <Row>
        <div className="hr-leftTable">
          <TableForm
            tableName="SI_SALARY_ALLOWPAY_LIST"
            readOnly={ynComplete === 'Y'}
            tableHeaders={salAllow.headers}
            tableData={salAllowData.salData}
            actions={{
              setTableData: actions.setSalData,
              updateEditedRow: actions.updateSalaryAllowPay,
            }}
          />
        </div>
      </Row>
      {/* 통계 테이블 */}
       <Row className="mt-3">
        <TableForm
          tableName="EMPSTATICS"
          tableHeaders={sumAllowPay.headers}
          tableData={salAllowData.sumAllowPayByYnTax}
          readOnly
        /> 
      </Row>
    </div>
  );
};

export default SalaryAllowPayList;
