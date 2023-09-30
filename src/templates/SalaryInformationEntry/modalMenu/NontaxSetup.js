import React, { useCallback, useEffect, useRef } from "react";
import { fetchData } from "../../../utils/codeHelperUtils";
import { modal_nontaxSetup } from "../../../model/SalaryInformationEntry/SalConstant";
import TableForm from "../../../components/TableForm";
import { useApi } from "../../../model/Api";

const NontaxSetup = (props) => {
  const { actions } = props;
  const nontaxSetupDataRef = useRef([]);
  const api = useApi();
  
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

  const updateNontaxLimit = useCallback((nontaxLimit) => {
    api
      .put("/sallowpay/updateNonTaxLimit", nontaxLimit)
      .then((response) => {
        if (response.data !== 0) {
          console.log("수정되었습니다.");
        }
      })
      .catch((error) => {
        console.log("에러발생 -> ", error);
      });
  }, []);


  return (
    <div>
      <div className="tableData_container">
        <TableForm
          tableName="siNontaxsetup"
          sortable
          tableHeaders={modal_nontaxSetup.headers}
          tableData={nontaxSetupDataRef.current}
          actions={{
            getRowObject: (data) => {
              return { item: data };
            },
            updateEditedRow: updateNontaxLimit,
          }}
        />
      </div>
    </div>
  );
};

export default NontaxSetup;
