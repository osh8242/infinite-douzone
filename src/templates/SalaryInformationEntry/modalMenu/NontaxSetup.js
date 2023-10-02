import React, { useCallback, useEffect, useRef } from "react";

import { modal_nontaxSetup } from "../../../model/SalaryInformationEntry/SalConstant";
import TableForm from "../../../components/TableForm";

import fetchData from "../../../utils/codeHelperUtils";
import useApi from "../../../model/Api";
import ConfirmComponent from "../../../components/ConfirmComponent";
import { useState } from "react";

const NontaxSetup = (props) => {
  const api = useApi();
  const { actions, selectedTab } = props;
  const nontaxSetupDataRef = useRef([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

  useEffect(() => {
    if (selectedTab === "3") {
      fetchDataAndUpdateState();
    }
  }, [selectedTab]);

  const fetchDataAndUpdateState = async () => {
    if (modal_nontaxSetup.url) {
      nontaxSetupDataRef.current = await fetchData(
        api,
        modal_nontaxSetup.url
      );
      actions.setModalContentData(() => ({
        tableData: nontaxSetupDataRef.current,
      }));
    }
  };

  const updateNontaxLimit = useCallback((nontaxLimit) => {
    api
      .put("/sallowpay/updateNonTaxLimit", nontaxLimit)
      .then((response) => {
        if (response.data !== 0) {
          setShowModal({
            show: true,
            message: "수정되었습니다.",
            onlyConfirm: true,
          });
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
        <div>
          <p>
            *월정액에 따른 비과세감면 설정<br></br>
            비과세로 설정한 한도는 월 단위로 계산됩니다.<br></br>
          </p>
        </div>
      </div>
      <ConfirmComponent
        show={showModal.show}
        message={showModal.message}
        onlyConfirm={showModal.onlyConfirm}
        onHide={() => setShowModal(false)}
        onConfirm={() => {
          showModal.action && showModal.action();
          setShowModal(false);
        }}
      />
    </div>
  
  );
};

export default NontaxSetup;
