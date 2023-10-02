import React from "react";
import { Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import {
  salAllow,
  sumAllowPay,
} from "../../../model/SalaryInformationEntry/SalConstant";
import "../../../styles/HrManagement/HrManagementLayout.scss";
import { useState } from "react";
import ConfirmComponent from "../../../components/ConfirmComponent";

const SalaryAllowPayList = (props) => {
  const { salAllowData, actions, ynComplete } = props;
  const [showModal, setShowModal] = useState(false);
  
  const handleDivClick = () => {
    if (ynComplete === 'Y') {
      setShowModal({
        show: true,
        message: "완료 해제후 수정가능합니다.",
        onlyConfirm: true,
      });
    }
  };

  return (
    <div>
      <Row>
        <div className="hr-leftTable" onClick={handleDivClick}>
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
      <ConfirmComponent
        show={showModal.show}
        message={showModal.message}
        onlyConfirm={showModal.onlyConfirm}
        onHide={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default SalaryAllowPayList;
