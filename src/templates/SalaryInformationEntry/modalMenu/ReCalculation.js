import React from "react";
import TableForm from "../../../components/TableForm";
import {
  RECALCULATION_URL,
  modal_reCalculationList,
} from "../../../model/SalaryInformationEntry/SalConstant";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { url } from "../../../model/CommonConstant";

const ReCalculation = (props) => {
  const { actions, state } = props;
  const [selectedRows, setSelectedRows] = useState([]);

  const confirmButtonHandler = () => {
    let selectOption = [];
    selectedRows.forEach((element) => {
      selectOption.push(element.item.cdOption);
    });

    const submitReCalculationInfo = {
      cdEmp: state.cdEmp,
      dateId: state.dateId,
      allowMonth: state.allowMonth,
      selectOption: selectOption,
    };

    if (selectedRows.length !== 0) {
      try {
        axios.post(url + RECALCULATION_URL, submitReCalculationInfo);
        setSelectedRows([]);
        //리로드()
      } catch (error) {
        console.log("재계산 실패: ", error);
      }
    }
  };

  return (
    <div>
      <p> * 선택한 사원의 아래 항목을 재계산합니다.</p>
      <TableForm
        tableName="SI_RECALCULATION"
        readOnly
        showCheckbox
        showHeaderArrow
        tableHeaders={modal_reCalculationList.headers}
        tableData={modal_reCalculationList.tableData}
        actions={{
          setSelectedRows: setSelectedRows,
        }}
      />
      <Button onClick={() => confirmButtonHandler()}>확인</Button>
      <Button>취소</Button>
    </div>
  );
};

export default ReCalculation;
