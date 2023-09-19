import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LaborContractModel from "../../model/LaborContract/LaborContractModel";
import LaborContractHeader from "./LaborContractHeader";
import SearchPanel from "../../components/SearchPanel";
import { LeftTableHeaders } from "../../model/LaborContract/LaborContractConstant";
import { SubTabHeaders } from "../../model/LaborContract/LaborContractConstant";
import { subTabMenuList } from "../../model/LaborContract/LaborContractConstant";
import TableForm from "../../components/TableForm";
import FormPanel from "../../components/FormPanel";
import Swsm from "../../vo/SwsmGrid/Swsm";
import SwsmOther from "../../vo/SwsmGrid/SwsmOther";
import Spinner from "react-bootstrap/Spinner";
import MenuTab from "../../components/MenuTab";
import "../../styles/LaborContract/LaborContractLayout.scss";
// import useLoginModel from "../../Login/useLoginModel";
import { MAIN_TAB, HEAD_TAB } from "./MainTab/LaborContractTabConstant";

import { useSelector } from "react-redux";

// import MainTab from "./MainTab/LaborContractMainTab";

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data

const LaborContractLayout = () => {
  const { state, actions, mainTablePkValue } = LaborContractModel();
  const { mainTabRef, leftTableData, mainTabData, subTableData, selectedRows } =
    state;

  const authData = useSelector((states) => states.auth);
  console.log("login success:");
  console.log(authData);
  // const { LoginUser } = useLoginModel();
  // console.log("Login Test");
  // console.log(LoginUser);

  console.log("Redux info....");
  // const user = useSelector((state) => state.auth.user);
  // console.log(user);
  // console.log(user?.message);

  // setTimeout(() => {
  //   console.log(
  //     "Delayed fetch from localStorage:",
  //     localStorage.getItem("userInfo2")
  //   );
  // }, 2000);

  console.log("localstore get");
  // console.log(JSON.stringify(localStorage.getItem("userInfo")));

  let userInfoString = localStorage.getItem("userInfo");

  if (userInfoString) {
    let userInfoObject = JSON.parse(userInfoString);
    console.log("user value return");
    console.log(userInfoObject);
    console.log(userInfoObject.empImg);
  } else {
    console.log("userInfo 없음");
  }

  const entireState = useSelector((state) => state);
  console.log(entireState);
  console.log("Before useSelector");
  const user = useSelector((state) => state.auth.user);
  console.log("After useSelector:", user);

  return (
    <>
      <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />
      <Container>
        {/* 조회영역 */}
        <SearchPanel showAccordion>
          <Row>
            {mainTabData ? (
              <FormPanel
                INPUT_CONSTANT={HEAD_TAB.primaryTabInputs}
                formData={mainTabData}
                submitData={actions.submitMainTabData}
              />
            ) : (
              <Spinner animation="border" variant="primary" />
            )}
          </Row>

          <div></div>
        </SearchPanel>
        {/* 메인영역 */}
        <Row>
          {/* 좌측 영역 */}
          <Col md="3">
            {/* 좌측 그리드 */}
            <Row>
              <div className="leftTable">
                <TableForm
                  tableName="EMP"
                  showHeaderArrow
                  sortable
                  tableHeaders={LeftTableHeaders}
                  tableData={leftTableData}
                  selectedRows={selectedRows}
                  rowAddable
                  defaultSelectedRow
                  defaultFocus
                  actions={{
                    setTableData: actions.setLeftTableData,
                    setPkValue: actions.setMainTablePkValue,
                    setEditedRow: actions.setEditedEmp,
                    setSelectedRows: actions.setSelectedRows,
                    deleteCurrentRow: actions.deleteCurrentRow,
                    getRowObject: Swsm,
                  }}
                />
              </div>
            </Row>
          </Col>
          {/* 우측 영역 */}
          {mainTabData ? (
            <Col md="9" className="px-5">
              {/* 우측 메인탭 */}
              <MenuTab menuList={[subTabMenuList.WorkInformation]}>
                {[
                  // <Scrollbars style={{ height: 400, overflow: "hidden" }}>
                  <Row key="key" className="mt-4 mb-5 justify-content-center">
                    <FormPanel
                      INPUT_CONSTANT={MAIN_TAB.primaryTabInputs}
                      formData={mainTabData}
                      submitData={actions.submitMainTabData}
                      actions={actions}
                    />
                  </Row>,
                  // </Scrollbars>,
                ]}
              </MenuTab>
              {/* 우측 메인폼 */}
              {/* 우측 서브탭 */}
              <MenuTab menuList={[subTabMenuList.otherBenefit]}>
                {[
                  <Row key="key" className="mt-4 mb-4 justify-content-center">
                    <TableForm
                      tableName="SwsmOther"
                      showCheckbox
                      rowAddable
                      sortable
                      tableHeaders={SubTabHeaders}
                      tableData={subTableData}
                      pkValue={mainTablePkValue}
                      selectedRows={selectedRows}
                      actions={{
                        setTableData: actions.setSubTableData,
                        setEditedRow: actions.setEditedSwsmOther,
                        setSelectedRows: actions.setSelectedRows,
                        getRowObject: SwsmOther,
                        insertNewRow: actions.insertSwsmOther,
                        updateEditedRow: actions.updateSwsmOther,
                        deleteRow: actions.deleteSelectedRows,
                      }}
                    />
                  </Row>,
                  // </Scrollbars>,
                ]}
              </MenuTab>
            </Col>
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </Row>
        {/* </MenuTab> */}
      </Container>
    </>
  );
};

export default LaborContractLayout;
