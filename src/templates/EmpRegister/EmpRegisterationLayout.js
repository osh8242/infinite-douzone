// 작성자: 김진
// 사원등록 페이지 전용 레이아웃

import React, { useCallback, useRef, useState } from "react";
import "../../styles/EmpRegister/empRegisterationLayout.css";
import "../../styles/commonComponent.css";
import EmpRegisterHeader from "./EmpRegisterHeader";
import EmpRegisterationModel from "../../model/EmpRegister/EmpRegisterationModel";
import Emp from "../../vo/EmpRegister/Emp";
import MenuTab from "../../components/MenuTab";
import TextBoxComponent from "../../components/TextBoxComponent";
import AddressForm from "../../components/AddressForm";
import CallNumberForm from "../../components/CallNumberForm";
import CodeHelperModal from "../../components/CodeHelperModal";
import ModalComponent from "../../components/ModalComponent";
import NoSocialFormForEmpRegister from "../../components/NoSocialFormForEmpRegister";
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
  EmpRegisterUndeletedEmpHeaders,
  tabConstant,
} from "../../model/EmpRegister/EmpConstant";
import "../../styles/EmpRegister/empRegisterationLayout.css";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import FormPanel from "../../components/FormPanel";
import { MAIN_TAB } from "./MainTab/ErMainTabConstant";

function EmpRegisterationLayout() {
  //Model로 관리되는 state들
  const { state, actions } = EmpRegisterationModel();

  const [modalType, setModalType] = useState("");

  //코드도움 아이콘 클릭이벤트
  const modalShow = useCallback(async (type, data, setRowData) => {
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
      default:
        break;
    }
  }, []);

  //mainTab Enter 이벤트 발생시 Emp 업데이트
  const submitMainTabData = (value, id) => {
    console.log("value: ", value);
    console.log("id: ", id);
    let data = {
      [id]: value,
    };
    //item 포장
    data = {
      item: {
        ...data,
        cdEmp: state.mainTablePkValue.cdEmp,
      },
    };
    console.log(data);
    actions.setEditedEmp(data);
  };

  // 코드도움 값 update 로직
  const submitValue = (data) => {
    console.log("코드도움(empRegister Layout) data: ", data);
    //item 포장
    let { description, ...item } = data;
    console.log(item);
    item = {
      ...item,
      cdEmp: state.mainTablePkValue.cdEmp,
    };
    let newData = {
      item,
    };
    console.log(newData); //item:{abbNation: 'KR'} item으로 포장된 vo객체
    actions.setEditedEmp(newData);
  };

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
          <Col md="5" id="empRegisterLayoutLeft">
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
                  //여기다가 함수를 넣으면 됨............
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
                }}
              />
              {/* 급여이체은행 -> 추후 분리 예정 */}
              <CallNumberForm
                label={LABELS.cdBank}
                val1={state.mainTabData.cdBank}
                val2={state.mainTabData.noBnkacct}
                val3={state.mainTabData.nmBnkowner}
                pkValue={state.mainTablePkValue}
                actions={{
                  setNewEmp: actions.setEditedEmp,
                }}
              />
              {/* 여기가 영역... 여기에 구현... */}

              {/* <Row id="empDataSortedMenuArea"> */}
              {/* <MenuTab menuList={tabConstant.mainTabMenuListForEmpRegister} /> */}
              {/* </Row> */}
              {/* 사원정보 편집 */}
              {/* <Row id="baseData" ref={state.mainTabRef}>
                {state.mainTabData ? (
                  <div id="baseDataContents">
                    <div id="baseDataContentsBackground"></div> 
                    <TextBoxComponent
                      label={LABELS.daEnter}
                      id="daEnter"
                      type="date"
                      value={state.mainTabData.daEnter}
                      actions={{
                        setEdited: actions.setEditedEmp,
                      }}
                    />
                    <NoSocialFormForEmpRegister
                      label={LABELS.noSocial}
                      ynFor={state.mainTabData.ynFor}
                      fgSex={state.mainTabData.fgSex}
                      noSocial={state.mainTabData.noSocial}
                      pkValue={state.mainTablePkValue}
                      actions={{
                        setNoSocialForm: actions.setEditedEmp,
                      }}
                    />
                    <TextBoxComponent
                      id="abbNation"
                      label={LABELS.abbNation}
                      // onKeyDown={submitMainTabData}
                      value={state.mainTabData.abbNation}
                      // onChange={actions.setSearchAbbNation}
                      setRowData={actions.setAddRow}
                      codeHelper
                      onClickCodeHelper={() =>
                        modalShow(
                          false,
                          codeHelperData.abbNation,
                          "",
                          actions.setSearchAbbNation,
                          "nmAbbNation"
                        )
                      }
                    />
                    <TextBoxComponent
                      id="cdNation"
                      label={LABELS.cdNation}
                      value={state.mainTabData.cdNation}
                      setRowData={actions.setAddRow}
                      codeHelper
                      onClickCodeHelper={() =>
                        modalShow(
                          "default",
                          codeHelperData.cdNation,
                          "nmCdNation"
                        )
                      }
                    />
                    <AddressForm
                      isZonecode={true}
                      zipHome={
                        state.mainTabData.zipHome
                          ? state.mainTabData.zipHome
                          : null
                      }
                      addHome1={
                        state.mainTabData.addHome1
                          ? state.mainTabData.addHome1
                          : null
                      }
                      addHome2={
                        state.mainTabData.addHome2
                          ? state.mainTabData.addHome2
                          : null
                      }
                      pkValue={state.mainTablePkValue}
                      actions={{
                        setAddress: actions.setEditedEmp,
                      }}
                    />
                    <TextBoxComponent
                      id="telHome1"
                      label={LABELS.telHome}
                      type="callNumber"
                      value={state.mainTabData.telHome1}
                    />
                    <TextBoxComponent
                      id="celEmp1"
                      label={LABELS.celEmp}
                      type="callNumber"
                      value={state.mainTabData.celEmp1}
                    />
                    <TextBoxComponent
                      id="emEmp"
                      label={LABELS.emEmp}
                      type="email"
                      value={state.mainTabData.emEmp}
                    />
                    <TextBoxComponent
                      id="idMsn"
                      label={LABELS.idMsn}
                      value={state.mainTabData.idMsn}
                      onEnter={submitMainTabData}
                      // onKeyDown={(event) => {}}
                    />
                    <TextBoxComponent
                      id="cdDept"
                      label={LABELS.cdDept}
                      value={state.mainTabData.cdDept}
                      // onKeyDown={submitMainTabData}
                      // onChange={(e) => {
                      //   actions.setSearchCdDept(e);
                      //   submitMainTabData(e);
                      // }}
                      setRowData={actions.setAddRow}
                      codeHelper
                      onClickCodeHelper={() =>
                        modalShow(
                          false,
                          codeHelperData.cdDept,
                          "",
                          actions.setSearchCdDept,
                          "nmCdDept"
                        )
                      }
                    />
                    <TextBoxComponent
                      id="cdOccup"
                      label={LABELS.cdOccup}
                      value={state.mainTabData.cdOccup}
                      // onChange={actions.setSearchCdOccup}
                      setRowData={actions.setAddRow}
                      codeHelper
                      onClickCodeHelper={() =>
                        modalShow(
                          false,
                          codeHelperData.cdOccup,
                          "",
                          actions.setSearchCdOccup,
                          "nmCdOccup"
                        )
                      }
                    />
                    <TextBoxComponent
                      id="rankNo"
                      label={LABELS.rankNo}
                      value={state.mainTabData.rankNo}
                      // onChange={actions.setSearchRankNo}
                      setRowData={actions.setAddRow}
                      codeHelper
                      onClickCodeHelper={() =>
                        modalShow(
                          false,
                          codeHelperData.rankNo,
                          "",
                          actions.setSearchRankNo,
                          "nmRankNo"
                        )
                      }
                    />
                    <TextBoxComponent
                      id="cdSalcls"
                      label={LABELS.cdSalcls}
                      value={state.mainTabData.cdSalcls}
                      // onChange={actions.setSearchCdSalcls}
                      setRowData={actions.setAddRow}
                      codeHelper
                      onClickCodeHelper={() =>
                        modalShow(
                          false,
                          codeHelperData.cdSalcls,
                          "",
                          actions.setSearchCdSalcls,
                          "nmCdSalcls"
                        )
                      }
                    />
                    <TextBoxComponent
                      id="cdField"
                      label={LABELS.cdField}
                      value={state.mainTabData.cdField}
                      // onChange={actions.setSearchCdField}
                      setRowData={actions.setAddRow}
                      codeHelper
                      onClickCodeHelper={() =>
                        modalShow(
                          false,
                          codeHelperData.cdField,
                          "",
                          actions.setSearchCdField,
                          "nmCdField"
                        )
                      }
                    />
                    <TextBoxComponent
                      id="cdProject"
                      label={LABELS.cdProject}
                      value={state.mainTabData.cdProject}
                      // onChange={actions.setSearchCdProject}
                      setRowData={actions.setAddRow}
                      codeHelper
                      onClickCodeHelper={() =>
                        modalShow(
                          false,
                          codeHelperData.cdProject,
                          "",
                          actions.setSearchCdProject,
                          "nmCdProject"
                        )
                      }
                    />
                     퇴사년월일 
                    {state.mainTabData.jobOk === "N" ||
                    state.mainTabData.daRetire ? (
                      <TextBoxComponent
                        label={LABELS.daRetire}
                        id="daRetire"
                        type="date"
                        value={state.mainTabData.daRetire}
                        // onChange={submitMainTabData}
                        actions={{
                          setEdited: actions.setEditedEmp,
                        }}
                      />
                    ) : (
                      <TextBoxComponent
                        label={LABELS.daRetire}
                        placeholder={"----년 --월 --일"}
                        disabled={"disabled"}
                      />
                      // <DateTest
                      //   id="daRetire"
                      //   label={LABELS.daRetire}
                      //   value={state.mainTabData.daRetire}
                      //   onChange={submitMainTabData}
                      // />
                    )}

                    <CallNumberForm
                      label={LABELS.cdBank}
                      val1={state.mainTabData.cdBank}
                      val2={state.mainTabData.noBnkacct}
                      val3={state.mainTabData.nmBnkowner}
                      pkValue={state.mainTablePkValue}
                      actions={{
                        setNewEmp: actions.setEditedEmp,
                      }}
                    />
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </Row> */}
              {/* <div style={{ display: 'none' }}>
            <Row id="familyData">
            {subTableData ? (
              <TableForm showCheckbox={true} tableData={subTableData} />
              ) : (
                <div>Loading...</div>
                )}
                </Row>
              </div> */}
            </Col>
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </Row>
      </Container>

      {/* 코드도움 모달영역 */}
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
