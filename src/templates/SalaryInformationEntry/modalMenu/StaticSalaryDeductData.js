import React, { useEffect, useRef, useState } from "react";
import TableForm from "../../../components/TableForm";
import { modal_insertSalaryDeductData, modal_staticSalaryDeductData } from "../../../model/SalaryInformationEntry/SalConstant";

import { useApi } from "../../../model/Api";
import fetchData from "../../../utils/codeHelperUtils";
import ConfirmComponent from "../../../components/ConfirmComponent";

const StaticSalaryDeductData = (props) => {
  const api = useApi();
  const { actions } = props;
  const [showModal, setShowModal] = useState(false);

  const StaticSalaryDeductDataRef = useRef([]);

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

  const fetchDataAndUpdateState = async () => {
    if (modal_staticSalaryDeductData.url) {
      StaticSalaryDeductDataRef.current = await fetchData(
        api,
        modal_staticSalaryDeductData.url,
        modal_staticSalaryDeductData.params
      );
      actions.setModalContentData(() => ({
        tableData: StaticSalaryDeductDataRef.current,
      }));
    }
  };
  const handleDivClick = () =>{
    setShowModal({
      show: true,
      message: "기본 공제항목은 수정 및 삭제가 불가능합니다.",
      action: () => actions.deleteSelectedRows(),
      onlyConfirm: true,
    });
  }
  return (
    <div>
      <div>
        <div className="tableData_container" onClick={handleDivClick}>
          <TableForm
            tableName="SI_INSERT_SALARY_DEDUCT_DATA"
            sortable
            readOnly
            tableHeaders={modal_staticSalaryDeductData.headers}
            tableData={StaticSalaryDeductDataRef.current}
          />
        </div>
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

export default StaticSalaryDeductData;
