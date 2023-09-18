// 작성자: 김진
// 사원등록 페이지 전용 레이아웃

import React, { useCallback, useRef, useState } from "react";
import "../../styles/EmpRegister/empRegisterationLayout.css";
import "../../styles/commonComponent.css";
import EmpRegisterHeader from "./EmpRegisterHeader";
import EmpRegisterationModel from "../../model/EmpRegister/EmpRegisterationModel";
import Emp from "../../vo/EmpRegister/Emp";
import MenuTab from "../../components/MenuTab";
// import TextBoxComponent from "../../components/TextBoxComponent";
// import AddressForm from "../../components/AddressForm";
import CallNumberForm from "../../components/CallNumberForm";
import CodeHelperModal from "../../components/CodeHelperModal";
import ModalComponent from "../../components/ModalComponent";
// import NoSocialFormForEmpRegister from "../../components/NoSocialFormForEmpRegister";
import TableForm from "../../components/TableForm";
import { LABELS } from "../../model/CommonConstant";
import {
  EmpRegisterLeftHeaders,
  codeHelperData_abbNation,
  codeHelperData_cdNation,
  codeHelperData_cdDept,
  codeHelperData_rankNo,
  codeHelperData_cdSalcls,
  codeHelperData_cdProject,
  codeHelperData_cdOccup,
  codeHelperData_cdField,
  tabConstant,
  codeHelperData_cdBank,
} from "../../model/EmpRegister/EmpConstant";
import "../../styles/EmpRegister/empRegisterationLayout.css";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import FormPanel from "../../components/FormPanel";
import { MAIN_TAB } from "./MainTab/ErMainTabConstant";

function EmpRegisterationLayout() {
  //Model로 관리되는 state들
  const { state, actions } = EmpRegisterationModel();

  const [modalType, setModalType] = useState("");

  //코드도움 아이콘 클릭이벤트
  const modalShow = useCallback(
    async (type, data, setRowData) => {
      actions.setModalState({ ...state.modalState, show: true });
      setModalType(type);

      switch (type) {
        case "default":
          actions.setModalState((prevState) => ({
            ...prevState,
            size: "lg",
            subject: data.subject,
          }));

          actions.setCodeHelperTableData(() => ({
            // subject: data.subject,
            setRowData: setRowData,
            tableHeaders: data.headers,
            tableData: data.tableData,
            usePk: data.usePk ? data.usePk : "",
            searchField: data.searchField,
          }));
          break;
        case "undeletedEmp":
          console.log(state.undeletedEmpTableData);

          actions.setModalState((prevState) => ({
            ...prevState,
            size: "md",
            subject: data.subject,
          }));

          actions.setCodeHelperTableData(() => ({
            // subject: data.subject,
            tableHeaders: data.headers,
            tableData: state.undeletedEmpTableData,
          }));
          break;
        default:
          break;
      }
    },
    [state]
  );

  //mainTab Enter 이벤트 발생시 Emp 업데이트
  // const submitMainTabData = (value, id) => {
  //   console.log("value: ", value);
  //   console.log("id: ", id);
  //   let data = {
  //     [id]: value,
  //   };
  //   //item 포장
  //   data = {
  //     item: {
  //       ...data,
  //       cdEmp: state.mainTablePkValue.cdEmp,
  //     },
  //   };
  //   console.log(data);
  //   actions.setEditedEmp(data);
  // };

  // 코드도움 값 update 로직
  // const submitValue = (data) => {
  //   console.log("코드도움(empRegister Layout) data: ", data);
  //   //item 포장
  //   let { description, ...item } = data;
  //   console.log(item);
  //   item = {
  //     ...item,
  //     cdEmp: state.mainTablePkValue.cdEmp,
  //   };
  //   let newData = {
  //     item,
  //   };
  //   console.log(newData); //item:{abbNation: 'KR'} item으로 포장된 vo객체
  //   actions.setEditedEmp(newData);
  // };

  return (
    <>
      {/* 사원등록 전용 헤더 */}
      <EmpRegisterHeader
        selectedRows={state.selectedRows}
        actions={{ deleteSelectedRows: actions.deleteSelectedRows }}
        modalShow={modalShow}
      />
      <Container>
        <Row id="empRegisterLayout">
          <Col md="4" id="empRegisterLayoutLeft">
            {/* 좌측 그리드 / 좌측 사원목록 테이블 */}
            {state.leftTableData ? ( //tableData가 준비되었을 경우에만 TableForm 컴포넌트 렌더링
              <TableForm
                tableHeaders={EmpRegisterLeftHeaders}
                tableData={state.leftTableData}
                selectedRows={state.selectedRows}
                showCheckbox
                sortable
                rowAddable
                actions={{
                  setTableData: actions.setLeftTableData,
                  setPkValue: actions.setMainTablePkValue,
                  setSelectedRows: actions.setSelectedRows,
                  insertNewRow: actions.insertEmp,
                  updateEditedRow: actions.updateEmp,
                  deleteRow: actions.deleteRow,
                  getRowObject: Emp,
                }}
              />
            ) : (
              <div>Loading...</div> //로딩중 화면 표시 내용
            )}
          </Col>
          {/* 우측 메인 탭 영역 */}
          {state.mainTabData ? (
            <Col id="empRegisterLayoutRight">
              <MenuTab
                menuList={tabConstant.mainTabMenuListForEmpRegister}
                ref={state.mainTabRef}
              ></MenuTab>
              <FormPanel
                INPUT_CONSTANT={MAIN_TAB.primaryTabInputs}
                formData={state.mainTabData}
                submitData={actions.submitMainTabData} // update 함수
                codeHelperFn={{
                  //코드도움 함수모음
                  abbNation: () =>
                    modalShow(
                      "default",
                      codeHelperData_abbNation,
                      actions.setEditedEmp
                    ),
                  cdNation: () =>
                    modalShow(
                      "default",
                      codeHelperData_cdNation,
                      actions.setEditedEmp
                    ),
                  cdDept: () =>
                    modalShow(
                      "default",
                      codeHelperData_cdDept,
                      actions.setEditedEmp
                    ),
                  cdOccup: () =>
                    modalShow(
                      "default",
                      codeHelperData_cdOccup,
                      actions.setEditedEmp
                    ),
                  rankNo: () =>
                    modalShow(
                      "default",
                      codeHelperData_rankNo,
                      actions.setEditedEmp
                    ),
                  cdSalcls: () =>
                    modalShow(
                      "default",
                      codeHelperData_cdSalcls,
                      actions.setEditedEmp
                    ),
                  cdField: () =>
                    modalShow(
                      "default",
                      codeHelperData_cdField,
                      actions.setEditedEmp
                    ),
                  cdProject: () =>
                    modalShow(
                      "default",
                      codeHelperData_cdProject,
                      actions.setEditedEmp
                    ),
                  cdBank: () =>
                    modalShow(
                      "default",
                      codeHelperData_cdBank,
                      actions.setEditedEmp
                    ),
                }}
              />
              <Form.Control type="text" style={{ outline: "none" }} />
            </Col>
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </Row>
      </Container>

      {/* 모달영역 */}
      <ModalComponent
        title={state.modalState.subject}
        size={state.modalState.size}
        show={state.modalState.show}
        onHide={() => actions.setModalState({ show: false })}
      >
        {modalType === "default" ? (
          <CodeHelperModal
            setRowData={state.codeHelperTableData.setRowData}
            usePk={state.codeHelperTableData.usePk}
            tableHeaders={state.codeHelperTableData.tableHeaders}
            tableData={state.codeHelperTableData.tableData}
            subject={state.codeHelperTableData.subject}
            searchField={state.codeHelperTableData.searchField}
            onHide={() => actions.setModalState({ show: false })}
          />
        ) : modalType === "undeletedEmp" ? (
          <div>
            <TableForm
              tableHeaders={state.codeHelperTableData.tableHeaders}
              tableData={state.codeHelperTableData.tableData}
            />
          </div>
        ) : (
          //default
          <></>
        )}
      </ModalComponent>

      {/* 삭제실패 사원목록 모달영역 */}
      {/* <ModalComponent
        title={"삭제 실패 사원목록"}
        show={state.modalState.show}
        onHide={() =>
          actions.setModalState({ ...state.modalState, show: false })
        }
        size="md"
        centered
      ></ModalComponent> */}
    </>
  );
}

export default EmpRegisterationLayout;
