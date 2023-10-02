import React, { useCallback, useEffect, useRef, useState } from "react";
import TableForm from "../../../components/TableForm";
import { modal_insertSalaryDeductData } from "../../../model/SalaryInformationEntry/SalConstant";

import { Button } from "react-bootstrap";
import { useApi } from "../../../model/Api";
import fetchData from "../../../utils/codeHelperUtils";
import ConfirmComponent from "../../../components/ConfirmComponent";

const InsertSalartDeductData = (props) => {
  const api = useApi();
  const [showModal, setShowModal] = useState(false);
  const { actions, selectedTab } = props;

  const insertSalaryDeducteDataRef = useRef([]); 

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

  useEffect(() => {
    if (selectedTab === "2") {
      fetchDataAndUpdateState();
    }
  }, [selectedTab]);

  const fetchDataAndUpdateState = async () => {
    if (modal_insertSalaryDeductData.url) {
      insertSalaryDeducteDataRef.current = await fetchData(
        api,
        modal_insertSalaryDeductData.url,
        modal_insertSalaryDeductData.params
      );
      actions.setModalContentData(() => ({
        tableData: insertSalaryDeducteDataRef.current,
      }));
    }
  };

  const insertSalDeduct = useCallback((salDeduct) => {
    
    salDeduct.ynSal = salDeduct.ynSal || "Y";
    salDeduct.ynBonus = salDeduct.ynBonus || "Y";
    
    api
      .post("/sadeductpay/insertSaDeduct", salDeduct, {
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

  const updateSalDeduct = useCallback((salDeduct) => {
    api
      .put("/sadeductpay/updateSaDeduct", salDeduct)
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

  const deleteDeduct = useCallback((row) => {
    const salDeduct = row.item;
    api
      .delete("/sadeductpay/deleteSaDeduct", {
        data: salDeduct,
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
    <div>
      <div>
        <div className="tableData_container">
          <TableForm
            tableName="SI_INSERT_SALARY_DEDUCT_DATA"
            sortable
            rowAddable
            tableHeaders={modal_insertSalaryDeductData.headers}
            tableData={insertSalaryDeducteDataRef.current}
            actions={{
              getRowObject: (data) => {
                return { item: data };
              },
              insertNewRow: insertSalDeduct,
              updateEditedRow: updateSalDeduct,
              deleteRow: deleteDeduct,
            }}
          />
        </div>
        <div>
          <p>
            *기타공제 등록 <br></br>
            1) 산출식은 [지급항목(급여,상여)의 과세항목 지급합계 * 비율]로 계산됩니다.<br></br>
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

export default InsertSalartDeductData;
