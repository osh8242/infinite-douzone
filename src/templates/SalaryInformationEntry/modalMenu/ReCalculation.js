import React, { useEffect } from "react";
import TableForm from "../../../components/TableForm";
import {
  RECALCULATION_URL,
  modal_reCalculationList,
} from "../../../model/SalaryInformationEntry/SalConstant";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { url } from "../../../model/CommonConstant";
import { useApi } from "../../../model/Api";
import ConfirmComponent from "../../../components/ConfirmComponent";

const ReCalculation = (props) => {
  const api = useApi();
  const { actions, state } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData([
      { item: { cdOption: "recalculateTaxYn", nmOption: "과세, 비과세 재계산" },},
      { item: { cdOption: "recalculateDeductInfo", nmOption: "공제항목 재계산", },},
      { item: { cdOption: "editEmpInfo", nmOption: "사원정보 변경" } },
    ]);
  }, []);

  const confirmButtonHandler = () => {
    if (selectedRows.length !== 0) {
      setShowModal({
        show: true,
        message: "선택한 항목들을 재계산 하시겠습니까?",
        action: selectOptionRecalculation, // selectOptionRecalculation 함수를 직접 전달
        onlyConfirm: false,
      });
    } else {
      setShowModal({
        show: true,
        message: "재계산할 항목을 체크해주세요.",
        onlyConfirm: true,
      });
    }
  };

  const selectOptionRecalculation = () => {
    let selectOption = [];
    selectedRows.forEach((element) => {
      selectOption.push(element.item.cdOption);
    });

    const submitReCalculationInfo = {
      cdEmp: state.cdEmp,
      dateId: state.dateId,
      allowMonth: state.allowMonth,
      allowYear: state.allowYear,
      salDivision : state.salDivision,
      selectOption: selectOption,
    };

    api
      .post(url + RECALCULATION_URL, submitReCalculationInfo)
      .then(() => {
        setSelectedRows([]);
        setShowModal({
          show: true,
          message: "재계산이 완료되었습니다.",
          action: () => {
            setSelectedRows([]);
            actions.getSaPayByCdEmp();
            actions.getSalTotalSum("EmpAllThisMonth");
            actions.setModalState({ show: false });
          },
          onlyConfirm: true,
        });
      })
      .catch((error) => {
        console.log("재계산 실패: ", error);
        setShowModal({
          show: true,
          message: "재계산에 실패하였습니다.",
          action: () => {
            setSelectedRows([]);
            actions.setModalState({ show: false });
          },
          onlyConfirm: true,
        });
      });
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
        tableData={tableData}
        actions={{
          setSelectedRows: setSelectedRows,
        }}
      />
      <div>
        <Button onClick={() => confirmButtonHandler()}>확인</Button>
      </div>
      <ConfirmComponent
        show={showModal.show}
        message={showModal.message}
        onlyConfirm={showModal.onlyConfirm}
        onHide={() => {
          setShowModal(false);
        }}
        onConfirm={() => {
          showModal.action && showModal.action();
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default ReCalculation;
