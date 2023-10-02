import React, { useEffect, useRef } from "react";
import TableForm from "../../../components/TableForm";
import { modal_insertSalaryDeductData, modal_staticSalaryDeductData } from "../../../model/SalaryInformationEntry/SalConstant";

import { useApi } from "../../../model/Api";
import fetchData from "../../../utils/codeHelperUtils";

const StaticSalaryDeductData = (props) => {
  const api = useApi();
  const { actions } = props;

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
  return (
    <div>
      <div>
        <div className="tableData_container">
          <TableForm
            tableName="SI_INSERT_SALARY_DEDUCT_DATA"
            sortable
            readOnly
            tableHeaders={modal_staticSalaryDeductData.headers}
            tableData={StaticSalaryDeductDataRef.current}
          />
        </div>
      </div>
    </div>
  );
};

export default StaticSalaryDeductData;
