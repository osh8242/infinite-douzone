import React, { useState } from "react";
import { Row } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import { salDeduct, sumDeductPay } from "../../../model/SalaryInformationEntry/SalConstant";
import ConfirmComponent from "../../../components/ConfirmComponent";

const SalaryDeductPayList = (props) => {
  const { salDeductData, ynComplete, actions } = props;
  const [showModal, setShowModal] = useState(false);

  const handleDivClick = () => {
    if (ynComplete === 'Y') {
      setShowModal({
        show: true,
        message: "완료 해제후 수정가능합니다.",
        action: () => actions.deleteSelectedRows(),
        onlyConfirm: true,
      });
    }
  };

  return (
    <div>
      <div>
        <Row>
          <div className="hr-leftTable" onClick={handleDivClick}>
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

export default SalaryDeductPayList;
