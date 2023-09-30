import React, { useEffect, useRef, useState } from "react";
import TableForm from "../../../components/TableForm";
import { modal_insertSalaryAllowData } from "../../../model/SalaryInformationEntry/SalConstant";
import { fetchData } from "../../../utils/codeHelperUtils";
import api from "../../../model/Api";
import { useCallback } from "react";

const InsertSalaryAllowData = (props) => {
  const { actions } = props;
  const insertSalaryTableDataRef = useRef([]);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      if (modal_insertSalaryAllowData.url) {
        insertSalaryTableDataRef.current = await fetchData(
          modal_insertSalaryAllowData.url
        );
        actions.setModalContentData(() => ({
          tableData: insertSalaryTableDataRef.current,
        }));
      }
    };
    fetchDataAndUpdateState();
  }, []);


  const insertSalAllow = useCallback((salAllow) => {
    
   

    salAllow.ynTax = salAllow.ynTax || 'Y';
    salAllow.salDivision = salAllow.salDivision || 'SAL';
    salAllow.commonlyYn = salAllow.commonlyYn || 'Y';
    salAllow.monthlyYn = salAllow.monthlyYn || 'Y';

    api
      .post("/sallowpay/insertSalAllow", salAllow, {
        "Content-Type": "application/json", 
      })
      .then((response) => {
        if (response.data !== 0) {
          alert("수당 등록 성공");
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
          alert("수정되었습니다!");
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
        data: salAllow
      })
      .then((response) => {
        if (response.data !== 0)  {
          alert("삭제되었습니다!");
        }
      })
      .catch((error) => {
        console.log("에러발생 -> ", error);
      });
  }, []);


  return (
    <div className="insertSalaryAllowData_container">
      <div>
        <div className="tableData_container" style={{overflow:"auto", height:"300px"}}>
          <TableForm
            tableName="SI_INSERT_SALARY_ALLOW_DATA"
            sortable
            rowAddable
            tableHeaders={modal_insertSalaryAllowData.headers}
            tableData={insertSalaryTableDataRef.current}
            actions={{
              getRowObject : (data)=>{ return {item:data}},
              insertNewRow: insertSalAllow,
              updateEditedRow: updateSalAllow,
              deleteRow: deleteSalAllow
            }}
          />
        </div>
        <div>
          <p>
            *월정액에 따른 수당등록 <br></br>
            1) (2.식대),[3. 자가운전]등 비과세되는 수당 중 실비변상이 아닌 수당은 월정액 포함됩니다.<br></br>
            2) 수당에 따라 실비 변상 여부를 확인할 수 없으므로 월정액에 따른 수당 설정은 각각 해주시기 바랍니다.<br></br>
            3) 비과세로 설정한 후 한도가 있는 경우 비과세 감면설정 탭에서 한도를 설정해주시기 바랍니다.<br></br>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertSalaryAllowData;
