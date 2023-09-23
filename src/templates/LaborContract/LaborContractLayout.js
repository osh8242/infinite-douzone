import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LaborContractModel from "../../model/LaborContract/LaborContractModel";
import LaborContractHeader from "./LaborContractHeader";
import SearchPanel from "../../components/SearchPanel";
import {
  LeftTableHeaders,
  searchSelectList,
} from "../../model/LaborContract/LaborContractConstant";
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
import {
  MAIN_TAB,
  HEAD_TAB,
  TAB_MENU_LIST,
} from "./MainTab/LaborContractTabConstant";

import { useSelector } from "react-redux";
import LcSearchPanel from "./SearchPanel/LcSearchPanel";

const LaborContractLayout = () => {
  const { state, actions, mainTablePkValue } = LaborContractModel();
  const {
    mainTabRef,
    leftTableData,
    mainTabData,
    subTableData,
    selectedRows,

    //serarchPanel
    dateSelectRef,
    salSelectRef,
    dateOption,
  } = state;

  return (
    <>
      <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />
      <Container>
        {/* 조회 영역 */}
        {/* <SearchPanel>
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
        </SearchPanel> */}
        <Row className="hr-search-row">
          <LcSearchPanel
            onSearch={actions.onSearch}
            // dateSelectRef={dateSelectRef}
            // dateOption={dateOption}
            salSelectRef={salSelectRef}
            selectList={searchSelectList}
          />
        </Row>

        <Row>
          <Col md="3">
            <Row>
              <MenuTab menuList={TAB_MENU_LIST.mainTabMenuList}>
                {[
                  // 계약서 작성
                  <div className="leftTable">
                    <TableForm
                      tableName="EMP"
                      showHeaderArrow
                      sortable
                      tableHeaders={LeftTableHeaders}
                      // tableData={leftTableData}
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
                  </div>,

                  // 계약서 조회
                  <div>
                    <TableForm
                      tableName="EMP"
                      showHeaderArrow
                      sortable
                      tableHeaders={LeftTableHeaders}
                      tableData={leftTableData}
                      selectedRows={selectedRows}
                      rowAddable
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
                  </div>,
                ]}
              </MenuTab>
            </Row>
          </Col>
          {mainTabData ? (
            <Col md="9" className="px-5">
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
