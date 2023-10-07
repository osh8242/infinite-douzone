import React, { useEffect, useRef, useState } from "react";
import TableForm from "../../../components/TableForm";
import { modal_insertSalaryAllowData } from "../../../model/SalaryInformationEntry/SalConstant";

import { useApi } from "../../../model/Api";
import { useCallback } from "react";
import fetchData from "../../../utils/codeHelperUtils";
import ConfirmComponent from "../../../components/ConfirmComponent";

const InsertSalaryAllowData = (props) => {
  const api = useApi();
  const { actions } = props;
  const insertSalaryTableDataRef = useRef([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

  const fetchDataAndUpdateState = async () => {
    if (modal_insertSalaryAllowData.url) {
      insertSalaryTableDataRef.current = await fetchData(
        api,
        modal_insertSalaryAllowData.url
      );
      actions.setModalContentData(() => ({
        tableData: insertSalaryTableDataRef.current,
      }));
    }
  };

  const insertSalAllow = useCallback((salAllow) => {
    salAllow.ynTax = salAllow.ynTax || "Y";
    salAllow.salDivision = salAllow.salDivision || "SAL";
    salAllow.commonlyYn = salAllow.commonlyYn || "Y";
    salAllow.monthlyYn = salAllow.monthlyYn || "Y";

    api
      .post("/sallowpay/insertSalAllow", salAllow, {
        "Content-Type": "application/json",
      })
      .then((response) => {
        if (response.data !== 0) {
          setShowModal({
            show: true,
            message: "등록되었습니다.",
            onlyConfirm: true,
            action :()=> fetchDataAndUpdateState()
          });
        }
      })
      .catch((error) => {
        console.log("에러발생: ", error);
      });
  }, []);

  const updateSalAllow = useCallback((salAllow) => {
    api
      .put("/sallowpay/updateSalAllow", salAllow)
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

  const deleteSalAllow = useCallback((row) => {
    const salAllow = row.item;

    api
      .delete("/sallowpay/deleteSalAllow", {
        data: salAllow,
      })
      .then((response) => {
        if (response.data !== 0) {
          setShowModal({
            show: true,
            message: "삭제되었습니다.",
            onlyConfirm: true,
          });
        }
      })
      .catch((error) => {
        console.log("에러발생 -> ", error);
      });
  }, []);

  return (
    <div className="insertSalaryAllowData_container">
      <div>
        <div
          className="tableData_container"
          style={{ overflow: "auto", height: "300px" }}
        >
          <TableForm
            tableName="SI_INSERT_SALARY_ALLOW_DATA"
            sortable
            rowAddable
            tableHeaders={modal_insertSalaryAllowData.headers}
            tableData={insertSalaryTableDataRef.current}
            // deleteMessage="수당을 삭제하시겠습니까?"
            actions={{
              getRowObject: (data) => {
                return { item: data };
              },
              insertNewRow: insertSalAllow,
              updateEditedRow: updateSalAllow,
              deleteRow: deleteSalAllow,
            }}
          />
        </div>
        <div>
          <p>
            *월정액에 따른 수당등록 <br></br>
            1) 수당코드는 자동생성됩니다.<br></br>
            2) 수당 삭제시 이미 지급된 해당 항목의 지급내역은 남아있습니다<br></br>
            3) 비과세로 설정한 후 한도가 있는 경우 비과세 감면설정 탭에서 한도를
            설정해주시기 바랍니다.<br></br>
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

export default InsertSalaryAllowData;
