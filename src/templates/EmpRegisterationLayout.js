// 작성자: 김진
// 사원등록 페이지 전용 레이아웃

import { Col, Container, Row } from "react-bootstrap";
import React, { useRef, useState } from "react";
import MenuTab from "../components/MenuTab";
import TextBoxComponent from "../components/TextBoxComponent";
import AddressForm from "../components/AddressForm";
import "../styles/empRegisterationLayout.css";
import EmpRegisterationModel from "../model/EmpRegisterationModel";
import CommonConstant from "../model/CommonConstant";
import CallNumberForm from "../components/CallNumberForm";
import NoSocialFormForEmpRegister from "../components/NoSocialFormForEmpRegister";
import EmailForm from "../components/EmailForm";
import DateTest from "../components/DateTest";
import TableTemp from "../components/TableTemp";
import Emp from "../vo/EmpRegister/Emp";
import EmpRegisterHeader from "./EmpRegisterHeader";

function EmpRegisterationLayout() {
  //Model로 관리되는 state들
  const {
    mainTablePk,
    leftTableData,
    mainTabData,
    subTabData,
    selectedRows,
    actions,
  } = EmpRegisterationModel();

  //고정된 값을 가지는 state들
  const {
    EmpRegisterLeftHeaders,
    mainTabMenuListForEmpRegister, //메뉴 탭 목록
    ynForList, //내외국인 구분
    genderRadioList, //성별구분
    emailList, //이메일 도메인 리스트
    labels, //속성명
  } = CommonConstant();

  // 메뉴 탭 전환 기능 추후 수정 예정
  // const [selectedMenu, setSelectedMenu] = useState(0);

  const mainTabRef = useRef();

  //mainTab Enter key 이벤트 Emp 업데이트
  const submitMainTabData = (event, value) => {
    if (event.key === "Enter") {
      // console.log("이벤트 타겟", event.target);
      event.target.blur();
      if (mainTabRef.current) {
        let newMainTabData = { ...mainTabData.item };
        const inputItems = mainTabRef.current.querySelectorAll("input");
        Array.from(inputItems).forEach((input) => {
          if (input.id) {
            newMainTabData[input.id] = input.value;
          }
          // console.log("input.id :", input.id, "input.value", input.value);
        });
        newMainTabData.cdEmp = mainTablePk.cdEmp;
        // newMainTabData = newMainTabData.filter((item) => item.key !== "");
        console.log("newMainTabData", newMainTabData);
        actions.setEditedEmp(newMainTabData);
      }
    }
    if (event.type === "change") {
      if (mainTabRef.current) {
        event.target.blur();
        let newMainTabData = { ...mainTabData };
        newMainTabData[event.target.id] = value;
        newMainTabData.cdEmp = mainTablePk.cdEmp;
        actions.setEditedEmp(newMainTabData);
      }
    }
  };

  return (
    <>
      <EmpRegisterHeader
        selectedRows={selectedRows}
        actions={{ deleteSelectedRows: actions.deleteSelectedRows }}
      />
      <Container>
        <Row id="empRegisterLayout">
          <Col md="4" id="empRegisterLayoutLeft">
            {/* 좌측 사원목록 테이블 */}
            {leftTableData ? ( //tableData가 준비되었을 경우에만 TableForm 컴포넌트 렌더링
              <TableTemp
                showCheckbox
                showHeaderArrow
                rowAddable
                tableHeaders={EmpRegisterLeftHeaders}
                tableData={leftTableData}
                selectedRows={selectedRows}
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
              {mainTabData ? (
                <div id="baseDataContents">
                  <div id="baseDataContentsBackground"></div>
                  <DateTest
                    id="daEnter"
                    label={labels.daEnter}
                    value={mainTabData.daEnter}
                    onChange={submitMainTabData}
                  />
                  <NoSocialFormForEmpRegister
                    label={labels.noSocial}
                    ynForList={ynForList}
                    ynFor={mainTabData.ynFor}
                    genderList={genderRadioList}
                    fgSex={mainTabData.fgSex}
                    noSocial={mainTabData.noSocial}
                    pkValue={mainTablePk}
                    actions={{
                      setNoSocialForm: actions.setEditedEmp,
                    }}
                  />
                  <TextBoxComponent
                    id="abbNation"
                    label={labels.abbNation}
                    value={mainTabData.abbNation}
                    onKeyDown={submitMainTabData}
                  />
                  <TextBoxComponent
                    id="cdNation"
                    label={labels.cdNation}
                    value={mainTabData.cdNation}
                    onKeyDown={submitMainTabData}
                  />
                  <AddressForm
                    isZonecode={true}
                    zipHome={mainTabData.zipHome ? mainTabData.zipHome : null}
                    addHome1={
                      mainTabData.addHome1 ? mainTabData.addHome1 : null
                    }
                    addHome2={
                      mainTabData.addHome2 ? mainTabData.addHome2 : null
                    }
                    pkValue={mainTablePk}
                    actions={{
                      setAddress: actions.setEditedEmp,
                    }}
                  />
                  <CallNumberForm
                    label={labels.telHome}
                    type="callNumber"
                    val1={mainTabData.telHome1}
                    val2={mainTabData.telHome2}
                    val3={mainTabData.telHome3}
                    pkValue={mainTablePk}
                    actions={{
                      setNewEmp: actions.setEditedEmp,
                    }}
                  />
                  <CallNumberForm
                    label={labels.calEmp}
                    type="callNumber"
                    val1={mainTabData.celEmp1}
                    val2={mainTabData.celEmp2}
                    val3={mainTabData.celEmp3}
                    pkValue={mainTablePk}
                    actions={{
                      setNewEmp: actions.setEditedEmp,
                    }}
                  />
                  <EmailForm
                    label={labels.emEmp}
                    emEmp={mainTabData.emEmp}
                    optionList={emailList}
                    pkValue={mainTablePk}
                    actions={{
                      setEmEmp: actions.setEditedEmp,
                    }}
                  />
                  <TextBoxComponent
                    id="idMsn"
                    label={labels.idMsn}
                    value={mainTabData.idMsn}
                    onKeyDown={submitMainTabData}
                  />
                  <TextBoxComponent
                    id="cdDept"
                    label={labels.cdDept}
                    value={mainTabData.cdDept}
                    onKeyDown={submitMainTabData}
                  />
                  <TextBoxComponent
                    id="cdOccup"
                    label={labels.cdOccup}
                    value={mainTabData.cdOccup}
                    onKeyDown={submitMainTabData}
                  />
                  <TextBoxComponent
                    id="rankNo"
                    label={labels.rankNo}
                    value={mainTabData.rankNo}
                    onKeyDown={submitMainTabData}
                  />
                  <TextBoxComponent
                    id="cdSalcls"
                    label={labels.cdSalcls}
                    value={mainTabData.cdSalcls}
                    onKeyDown={submitMainTabData}
                  />
                  <TextBoxComponent
                    id="cdField"
                    label={labels.cdField}
                    value={mainTabData.cdField}
                    onKeyDown={submitMainTabData}
                  />
                  <TextBoxComponent
                    id="cdProject"
                    label={labels.cdProject}
                    value={mainTabData.cdProject}
                    onKeyDown={submitMainTabData}
                  />
                  {mainTabData.daRetire ? (
                    <DateTest
                      id="daRetire"
                      label={labels.daRetire}
                      value={mainTabData.daRetire}
                      onChange={submitMainTabData}
                    />
                  ) : (
                    <TextBoxComponent
                      label={labels.daRetire}
                      placeholder={"----년 --월 --일"}
                      disabled={"disabled"}
                    />
                  )}
                  <CallNumberForm
                    label={labels.cdBank}
                    val1={mainTabData.cdBank}
                    val2={mainTabData.noBnkacct}
                    val3={mainTabData.nmBnkowner}
                    pkValue={mainTablePk}
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
      {/* </div> */}
    </>
  );
}

export default EmpRegisterationLayout;
