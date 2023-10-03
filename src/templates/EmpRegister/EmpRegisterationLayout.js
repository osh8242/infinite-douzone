// 작성자: 김진
// 사원등록 페이지 전용 레이아웃

import React, { useCallback, useState } from "react";
import MenuTab from "../../components/MenuTab";
import EmpRegisterationModel from "../../model/EmpRegister/EmpRegisterationModel";
import Emp from "../../vo/EmpRegister/Emp";
import EmpRegisterHeader from "./EmpRegisterHeader";
// import TextBoxComponent from "../../components/TextBoxComponent";
// import AddressForm from "../../components/AddressForm";
import CodeHelperModal from "../../components/CodeHelperModal";
import ModalComponent from "../../components/ModalComponent";
// import NoSocialFormForEmpRegister from "../../components/NoSocialFormForEmpRegister";
import { Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import FormPanel from "../../components/FormPanel";
import TableForm from "../../components/TableForm";
import {
  EmpRegisterLeftHeaders,
  codeHelperData_abbNation,
  codeHelperData_cdBank,
  codeHelperData_cdDept,
  codeHelperData_cdField,
  codeHelperData_cdNation,
  codeHelperData_cdOccup,
  codeHelperData_cdProject,
  codeHelperData_cdSalcls,
  codeHelperData_rankNo,
  tabConstant,
} from "../../model/EmpRegister/EmpConstant";
import { MAIN_TAB } from "./MainTab/ErMainTabConstant";

import "../../styles/commonComponent.css";
import "../../styles/EmpRegister/empRegisterationLayout.css";
import "../../styles/fonts.css";
import increaseBrightness from "../../model/increaseBrightness";

function EmpRegisterationLayout() {
  //Model로 관리되는 state들
  const { state, actions } = EmpRegisterationModel();
  const [modalType, setModalType] = useState("");

  // 테마 컬러 설정
  const userInfoObject = JSON.parse(localStorage.getItem("userInfo"));
  const themeColor = userInfoObject?.theme || "rgb(48, 150, 255)";
  const themeLabel = increaseBrightness(themeColor, 75);
  const labels = document.querySelectorAll(".label");

  labels.forEach((label) => {
    label.style.backgroundColor = themeLabel;
  });

  //코드도움 아이콘 클릭이벤트
  const modalShow = useCallback(
    async (type, data, setRowData) => {
      actions.setModalState({ ...state.modalState, show: true });
      setModalType(type);

      switch (type) {
        case "default":
          actions.setModalState((prevState) => ({
            ...prevState,
            size: "md",
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
        deleteButtonHandler={actions.deleteEmp}
        existSelectedRows={state.selectedRows.length !== 0}
      />
      <Container className="SUITE p-12">
        <Row id="empRegisterLayout">
          <Col md="4" id="empRegisterLayoutLeft">
            {/* 좌측 그리드 / 좌측 사원목록 테이블 */}
            {/* {state.leftTableData ? ( //tableData가 준비되었을 경우에만 TableForm 컴포넌트 렌더링 */}
            <TableForm
              tableHeaders={EmpRegisterLeftHeaders}
              tableData={state.leftTableData}
              selectedRows={state.selectedRows}
              showCheckbox
              sortable
              rowAddable
              defaultFocus
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
            {/* ) : (
              <div>Loading...</div> //로딩중 화면 표시 내용
            )} */}
          </Col>
          {/* 우측 메인 탭 영역 */}
          {state.mainTabData ? (
            <Col id="empRegisterLayoutRight">
              <MenuTab menuList={tabConstant.mainTabMenuListForEmpRegister}>
                {[
                  <Row key={"mainTeb1"}>
                    <Col>
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
                              actions.submitMainTabData
                            ),
                          cdNation: () =>
                            modalShow(
                              "default",
                              codeHelperData_cdNation,
                              actions.submitMainTabData
                            ),
                          cdDept: () =>
                            modalShow(
                              "default",
                              codeHelperData_cdDept,
                              actions.submitMainTabData
                            ),
                          cdOccup: () =>
                            modalShow(
                              "default",
                              codeHelperData_cdOccup,
                              actions.submitMainTabData
                            ),
                          rankNo: () =>
                            modalShow(
                              "default",
                              codeHelperData_rankNo,
                              actions.submitMainTabData
                            ),
                          cdSalcls: () =>
                            modalShow(
                              "default",
                              codeHelperData_cdSalcls,
                              actions.submitMainTabData
                            ),
                          cdField: () =>
                            modalShow(
                              "default",
                              codeHelperData_cdField,
                              actions.submitMainTabData
                            ),
                          cdProject: () =>
                            modalShow(
                              "default",
                              codeHelperData_cdProject,
                              actions.submitMainTabData
                            ),
                          cdBank: () =>
                            modalShow(
                              "default",
                              codeHelperData_cdBank,
                              actions.submitMainTabData
                            ),
                        }}
                      />
                    </Col>
                  </Row>,
                  <Row key={"mainTeb2"}>
                    <Col>
                      <FormPanel
                        INPUT_CONSTANT={MAIN_TAB.secondaryTabInputs}
                        formData={state.mainTabData}
                        submitData={actions.submitMainTabData} // update 함수
                      />
                    </Col>
                  </Row>,
                ]}
              </MenuTab>
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
            setRowData={state.codeHelperTableData.setRowData} // 우측 메인 탭에서 가져온 row 데이터를 반환받을 함수
            // => 여기서 onChange 이벤트를 발생시켜서 값을 update 할 수 있도록 해야한다.

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
    </>
  );
}

export default EmpRegisterationLayout;
