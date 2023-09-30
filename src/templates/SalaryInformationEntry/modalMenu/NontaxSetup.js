import React, { useEffect, useRef } from "react";
import { fetchData } from "../../../utils/codeHelperUtils";
import { modal_nontaxSetup } from "../../../model/SalaryInformationEntry/SalConstant";
import TableForm from "../../../components/TableForm";

const NontaxSetup = (props) => {
  const { actions } = props;
  const nontaxSetupDataRef = useRef([]);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      if (modal_nontaxSetup.url) {
        nontaxSetupDataRef.current = await fetchData(modal_nontaxSetup.url);
        actions.setModalContentData(() => ({
          tableData: nontaxSetupDataRef.current,
        }));
      }
    };
    fetchDataAndUpdateState();
  }, []);

  return (
    <div>
      <div className="tableData_container">
        <TableForm
          tableName="siNontaxsetup"
          readOnly
          tableHeaders={modal_nontaxSetup.headers}
          tableData={nontaxSetupDataRef.current}
        />
      </div>
    </div>
  );
};

export default NontaxSetup;
