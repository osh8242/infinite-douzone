import React, { useCallback, useEffect, useRef, useState } from "react";
import TableForm from "../../../components/TableForm";
import { modal_insertSalaryDeductData } from "../../../model/SalaryInformationEntry/SalConstant";

import { Button } from "react-bootstrap";
import { useApi } from "../../../model/Api";
import fetchData from "../../../utils/codeHelperUtils";

const InsertSalartDeductData = (props) => {
    const api = useApi();  
    const { actions } = props;
    const [isCalculationbVisible, setIsCalculationbVisible] = useState(false);
    const calculationbVisibility = () => {
      setIsCalculationbVisible(!isCalculationbVisible);
    };
    
    const insertSalaryDeducteDataRef = useRef([]); // useRef를 사용하여 변수 선언
    
    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            if (modal_insertSalaryDeductData.url) {
                insertSalaryDeducteDataRef.current = await fetchData(api,modal_insertSalaryDeductData.url); // useRef의 current 속성에 저장
                actions.setModalContentData(() => ({
                    tableData: insertSalaryDeducteDataRef.current
                }));
            }
        };
        fetchDataAndUpdateState();
    }, []);

    
  const insertSalDeduct = useCallback((salAllow) => {
    api
      .post("/sallowpay/insertSalAllow", salAllow, {
        "Content-Type": "qpplication/json",
      })
      .then((response) => {
        if (response.data !== 0){
          alert ("공제 등록에 성공하였습니다!");
        }
      })
      .catch((error) => {
        console.log("에러발생: ", error);
      });
  }, []);

  const updateSalDeduct = useCallback((salDeduct) => {
    //salDeduct.calculation
    api
      .put("/sallowpay/updateSalAllow", salDeduct)
      .then((response) => {
        if (response.data !== 0) {
          alert("수정되었습니다!");
        }
      })
      .catch((error) => {
        console.log("에러발생 -> ", error);
      });
  }, []);

  const deleteDeduct = useCallback((row) => {
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
    <div>
      <div>
        <div className="tableData_container">
          <Button onClick={calculationbVisibility}>{!isCalculationbVisible? '산출식보기' : '산출식 숨기기' }</Button>
          <TableForm
            tableName="SI_INSERT_SALARY_DEDUCT_DATA"
            sortable
            rowAddable
            tableHeaders={!isCalculationbVisible?(modal_insertSalaryDeductData.headers):(modal_insertSalaryDeductData.headersWithCalculation)}
            tableData={insertSalaryDeducteDataRef.current}
            actions={{
              getRowObject : (data)=>{ return {item:data}},
              insertNewRow: insertSalDeduct,
              updateEditedRow: updateSalDeduct,
              deleteRow: deleteDeduct
            }}
          />
          
        </div>
      </div>
    </div>
  );
};

export default InsertSalartDeductData;
