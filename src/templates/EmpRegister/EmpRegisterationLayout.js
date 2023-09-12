// 작성자: 김진
// 사원등록 페이지 전용 레이아웃

import { Col, Container, Row } from "react-bootstrap";
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
import NoSocialFormForEmpRegister from "../../components/NoSocialFormForEmpRegister";
import EmailForm from "../../components/EmailForm";
import DateTest from "../../components/DateTest";
import TableForm from "../../components/TableForm";
import CodeHelperModal from "../../components/CodeHelperModal";
import ModalComponent from "../../components/ModalComponent";
import {
  ynForList, //내외국인 구분
  genderRadioList, //성별구분
  emailList, //이메일 도메인 리스트
  labels, //속성명
} from "../../model/CommonConstant";
import {
  EmpRegisterUndeletedEmpHeaders, //미삭제 사원목록 테이블 헤더
  EmpRegisterLeftHeaders,
  mainTabMenuListForEmpRegister, //메뉴 탭 목록
  codeHelperparams, //코드도움 상수 값
} from "../../model/EmpRegister/EmpConstant";

function EmpRegisterationLayout() {
  //Model로 관리되는 state들
  const { state, actions } = EmpRegisterationModel();

  //코드도움 아이콘 클릭이벤트
  const codeHelperShow = useCallback(
    (flag, codeHelperTableData, codeHelperCode, setFn, usePk) => {
      actions.setCodeHelperState({ show: true });
      // setApiFlag(flag);
      if (flag) {
        actions.setCodeHelperTableData((prevState) => ({
          ...prevState,
          code: codeHelperCode,
          setData: setFn,
          usePk: usePk,
        }));
      } else {
        actions.setCodeHelperTableData((prevState) => ({
          ...prevState,
          data: codeHelperTableData,
          setData: setFn,
          usePk: usePk,
        }));
      }
    },
    []
  );

  const mainTabRef = useRef();

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
      />
      <Container>
        <Row id="empRegisterLayout">
          <Col md="4" id="empRegisterLayoutLeft">
            {/* 좌측 사원목록 테이블 */}
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
                  setEditedRow: actions.setEditedEmp,
                  getRowObject: Emp,
                  setSelectedRows: actions.setSelectedRows,
                }}
              />
            ) : (
              <div>Loading...</div> //로딩중 화면 표시 내용
            )}
          </Col>
          <Col id="empRegisterLayoutRight">
            <Row id="empDataSortedMenuArea">
              <MenuTab menuList={mainTabMenuListForEmpRegister} />
            </Row>
            {/* 사원정보 편집 */}
            <Row id="baseData" ref={mainTabRef}>
              {state.mainTabData ? (
                <div id="baseDataContents">
                  <div id="baseDataContentsBackground"></div>
                  <DateTest
                    id="daEnter"
                    label={labels.daEnter}
                    value={state.mainTabData.daEnter}
                    actions={{
                      setEdited: actions.setEditedEmp,
                    }}
                  />
                  <NoSocialFormForEmpRegister
                    label={labels.noSocial}
                    ynForList={ynForList}
                    ynFor={state.mainTabData.ynFor}
                    genderList={genderRadioList}
                    fgSex={state.mainTabData.fgSex}
                    noSocial={state.mainTabData.noSocial}
                    pkValue={state.mainTablePkValue}
                    actions={{
                      setNoSocialForm: actions.setEditedEmp,
                    }}
                  />
                  <TextBoxComponent
                    id="abbNation"
                    label={labels.abbNation}
                    // onKeyDown={submitMainTabData}
                    value={state.mainTabData.abbNation}
                    // onChange={actions.setSearchAbbNation}
                    setRowData={actions.setAddRow}
                    codeHelper
                    onClickCodeHelper={() =>
                      codeHelperShow(
                        false,
                        codeHelperparams.abbNation,
                        "",
                        actions.setSearchAbbNation,
                        "nmAbbNation"
                      )
                    }
                  />
                  <TextBoxComponent
                    id="cdNation"
                    label={labels.cdNation}
                    value={state.mainTabData.cdNation}
                    // onChange={actions.setSearchCdNation}
                    setRowData={actions.setAddRow}
                    codeHelper
                    onClickCodeHelper={() =>
                      codeHelperShow(
                        false,
                        codeHelperparams.cdNation,
                        "",
                        actions.setSearchCdNation,
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
                    label={labels.telHome}
                    type="callNumber"
                    value={state.mainTabData.telHome1}
                  />
                  <TextBoxComponent
                    label={labels.celEmp}
                    type="callNumber"
                    value={state.mainTabData.celEmp1}
                  />
                  <EmailForm
                    label={labels.emEmp}
                    emEmp={state.mainTabData.emEmp}
                    optionList={emailList}
                    pkValue={state.mainTablePkValue}
                    actions={{
                      setEmEmp: actions.setEditedEmp,
                    }}
                  />
                  <TextBoxComponent
                    id="idMsn"
                    label={labels.idMsn}
                    value={state.mainTabData.idMsn}
                    onEnter={submitMainTabData}
                    // onKeyDown={(event) => {}}
                  />
                  <TextBoxComponent
                    id="cdDept"
                    label={labels.cdDept}
                    value={state.mainTabData.cdDept}
                    // onKeyDown={submitMainTabData}
                    // onChange={(e) => {
                    //   actions.setSearchCdDept(e);
                    //   submitMainTabData(e);
                    // }}
                    setRowData={actions.setAddRow}
                    codeHelper
                    onClickCodeHelper={() =>
                      codeHelperShow(
                        false,
                        codeHelperparams.cdDept,
                        "",
                        actions.setSearchCdDept,
                        "nmCdDept"
                      )
                    }
                  />
                  <TextBoxComponent
                    id="cdOccup"
                    label={labels.cdOccup}
                    value={state.mainTabData.cdOccup}
                    // onChange={actions.setSearchCdOccup}
                    setRowData={actions.setAddRow}
                    codeHelper
                    onClickCodeHelper={() =>
                      codeHelperShow(
                        false,
                        codeHelperparams.cdOccup,
                        "",
                        actions.setSearchCdOccup,
                        "nmCdOccup"
                      )
                    }
                  />
                  <TextBoxComponent
                    id="rankNo"
                    label={labels.rankNo}
                    value={state.mainTabData.rankNo}
                    // onChange={actions.setSearchRankNo}
                    setRowData={actions.setAddRow}
                    codeHelper
                    onClickCodeHelper={() =>
                      codeHelperShow(
                        false,
                        codeHelperparams.rankNo,
                        "",
                        actions.setSearchRankNo,
                        "nmRankNo"
                      )
                    }
                  />
                  <TextBoxComponent
                    id="cdSalcls"
                    label={labels.cdSalcls}
                    value={state.mainTabData.cdSalcls}
                    // onChange={actions.setSearchCdSalcls}
                    setRowData={actions.setAddRow}
                    codeHelper
                    onClickCodeHelper={() =>
                      codeHelperShow(
                        false,
                        codeHelperparams.cdSalcls,
                        "",
                        actions.setSearchCdSalcls,
                        "nmCdSalcls"
                      )
                    }
                  />
                  <TextBoxComponent
                    id="cdField"
                    label={labels.cdField}
                    value={state.mainTabData.cdField}
                    // onChange={actions.setSearchCdField}
                    setRowData={actions.setAddRow}
                    codeHelper
                    onClickCodeHelper={() =>
                      codeHelperShow(
                        false,
                        codeHelperparams.cdField,
                        "",
                        actions.setSearchCdField,
                        "nmCdField"
                      )
                    }
                  />
                  <TextBoxComponent
                    id="cdProject"
                    label={labels.cdProject}
                    value={state.mainTabData.cdProject}
                    // onChange={actions.setSearchCdProject}
                    setRowData={actions.setAddRow}
                    codeHelper
                    onClickCodeHelper={() =>
                      codeHelperShow(
                        false,
                        codeHelperparams.cdProject,
                        "",
                        actions.setSearchCdProject,
                        "nmCdProject"
                      )
                    }
                  />
                  {/* 퇴사년월일 */}
                  {state.mainTabData.jobOk === "N" ||
                  state.mainTabData.daRetire ? (
                    <DateTest
                      id="daRetire"
                      label={labels.daRetire}
                      value={state.mainTabData.daRetire}
                      // onChange={submitMainTabData}
                      actions={{
                        setEdited: actions.setEditedEmp,
                      }}
                    />
                  ) : (
                    <TextBoxComponent
                      label={labels.daRetire}
                      placeholder={"----년 --월 --일"}
                      disabled={"disabled"}
                    />
                    // <DateTest
                    //   id="daRetire"
                    //   label={labels.daRetire}
                    //   value={state.mainTabData.daRetire}
                    //   onChange={submitMainTabData}
                    // />
                  )}
                  <CallNumberForm
                    label={labels.cdBank}
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
            </Row>
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
        </Row>
      </Container>

      {/* 코드도움 모달영역 */}
      <CodeHelperModal
        show={state.codeHelperState.show}
        onHide={() =>
          actions.setCodeHelperState({
            ...state.codeHelperState,
            show: false,
          })
        }
        // onConfirm={() => alert("확인")}
        setRowData={(event) => submitValue(event)} // 여기서 값을 반환합니다.
        table={state.codeHelperTableData.data}
        codeHelperCode={state.codeHelperTableData.code}
      />

      {/* 삭제실패 사원목록 모달영역 */}
      <ModalComponent
        title={"삭제 실패 사원목록"}
        show={state.modalState.show}
        onHide={() =>
          actions.setModalState({ ...state.modalState, show: false })
        }
        size="md"
        centered
      >
        <TableForm
          tableHeaders={EmpRegisterUndeletedEmpHeaders}
          tableData={state.undeletedEmpTableData}
          selectedRows={state.selectedRows}
          actions={{
            setSelectedRows: actions.setSelectedRows,
          }}
        />
      </ModalComponent>
    </>
  );
}

export default EmpRegisterationLayout;
