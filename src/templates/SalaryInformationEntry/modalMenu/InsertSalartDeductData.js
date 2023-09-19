import React, { useEffect, useRef, useState } from "react";
import TableForm from "../../../components/TableForm";
import { modal_insertSalaryDeductData } from "../../../model/SalaryInformationEntry/SalConstant";
import { fetchData } from "../../../utils/codeHelperUtils";
import { Button } from "react-bootstrap";

const InsertSalartDeductData = (props) => {
    const { actions } = props;
    const [isCalculationbVisible, setIsCalculationbVisible] = useState(true);

    const calculationbVisibility = () => {
      setIsCalculationbVisible(!isCalculationbVisible);
    };
    
    const insertSalaryDeducteDataRef = useRef([]); // useRef를 사용하여 변수 선언
    
    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            if (modal_insertSalaryDeductData.url) {
                insertSalaryDeducteDataRef.current = await fetchData(modal_insertSalaryDeductData.url); // useRef의 current 속성에 저장
                actions.setModalContentData(() => ({
                    tableData: insertSalaryDeducteDataRef.current
                }));
            }
        };
        fetchDataAndUpdateState();
    }, []);

  return (
    <div>
      <div>
        <div className="tableData_container">
          <Button onClick={calculationbVisibility}>산출식보기</Button>
          <TableForm
            tableName="SI_INSERT_SALARY_DEDUCT_DATA"
            readOnly
            tableHeaders={isCalculationbVisible?(modal_insertSalaryDeductData.headers):(modal_insertSalaryDeductData.headersWithCalculation)}
            tableData={insertSalaryDeducteDataRef.current}
          />
          
        </div>
      </div>
    </div>
  );
};

export default InsertSalartDeductData;
