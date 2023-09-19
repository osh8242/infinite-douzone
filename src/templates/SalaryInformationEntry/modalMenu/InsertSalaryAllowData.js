import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import TableForm from "../../../components/TableForm";
import { modal_insertSalaryAllowData } from "../../../model/SalaryInformationEntry/SalConstant";
import { fetchData } from "../../../utils/codeHelperUtils";

const InsertSalaryAllowData = (props) => {
  const { actions } = props;
  const [isCalculationbVisible, setIsCalculationbVisible] = useState(true);

  const calculationbVisibility = () => {
    setIsCalculationbVisible(!isCalculationbVisible);
  };

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

  return (
    <div className="insertSalaryAllowData_container">
      <div>
        <Button onClick={calculationbVisibility}>산출식 보기</Button>
        <div className="tableData_container">
          <TableForm
            tableName="SI_INSERT_SALARY_ALLOW_DATA"
            readOnly
            tableHeaders={isCalculationbVisible?(modal_insertSalaryAllowData.headers):(modal_insertSalaryAllowData.headersWithCalculation)}
            tableData={insertSalaryTableDataRef.current}
          />
        </div>
        <div>
          <p>
            *월정액에 따른 수당등록 <br></br>
            1) (2.식대),[3. 자가운전]등 비과세되는 수당 중 실비변상이 아닌 수당은 월정액 포함됩니다.<br></br>
            2) 수당에 따라 실비 변상 여부를 확인할 수 없으므로 월정액에 따른 수당 설정은 각각 해주시기 바랍니다.<br></br>
            3) 단, 연장근로수당은 월정을 '여'로 선택할 수 없습니다.<br></br>
            석과공유 중소기업 경영성과급감면과 핵심인력 성과보상기금 소득세감면에 대한 소득세는 직접 입력합니다.<br></br>
            배우자 출산휴가 급여 비과세 수당 : 고용보험법에 따라 빋는 비과세 금액을 입력합니다.<br></br>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertSalaryAllowData;
