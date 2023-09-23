import React from "react";
import { Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import {
  modal_addSalAllow,
  salAllow,
  salAllowSumData,
  sumAllowPay,
} from "../../../model/SalaryInformationEntry/SalConstant";
import "../../../styles/HrManagement/HrManagementLayout.scss";

const SalaryAllowPayList = (props) => {
  const { salAllowData, actions, showCalculation, modalShow, ynComplete } = props;
  //const [showYn, setShowYn] = useState("salaryAllowPay");
  // const toggleCalculation = () => {
  //   const newShowYn = showYn === "salaryAllowPay" ? null : "salaryAllowPay";
  //   setShowYn(newShowYn);
  //   showCalculation(newShowYn);
  // };

  console.log(salAllowData.salData);
  console.log(salAllowData.sumAllowPayByYnTax);
  return (
    <div>
      <Row>
        <div className="leftTable">
          <TableForm
            tableName="SI_SALARY_ALLOWPAY_LIST"
            readOnly={ynComplete === 'Y'}
            tableHeaders={salAllow.headers}
            tableData={salAllowData.salData}
            rowAddable
            codeHelper
            actions={{
              setTableData: actions.setSalData,
              updateEditedRow: actions.updateSalaryAllowPay,
              setCodeHelper : ()=> modalShow('addSalAllowPay', modal_addSalAllow, actions.setAddSalAllowPay)
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
