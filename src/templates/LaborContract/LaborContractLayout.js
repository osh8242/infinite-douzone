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
// import useLoginModel from "../../Login/useLoginModel";import "../../styles/fonts.css";

import {
  MAIN_TAB,
  HEAD_TAB,
  TAB_MENU_LIST,
  MAIN_TAB_SEARCH,
} from "./MainTab/LaborContractTabConstant";

import { useSelector } from "react-redux";
import LcSearchPanel from "./SearchPanel/LcSearchPanel";
import LcSearchSearchPanel from "./SearchPanel/LcSearchSearchPanel";

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
      <Container className="SUITE p-12">
        {/* 조회 영역 */}
        {/* <SearchPanel>
          <Row className="deleteLabelBackground">
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
        {/* 상단메뉴탭 적용 */}
        {mainTabData ? (
          <Row className="mt-3">
            <MenuTab menuList={TAB_MENU_LIST.mainTabMenuList}>
              {[
                <>
                  {/* 계약서 작성 */}
                  <LcSearchPanel
                    onSearch={actions.onSearch}
                    // dateSelectRef={dateSelectRef}
                    // dateOption={dateOption}
                    // searchOption={searchOption}
                    salSelectRef={salSelectRef}
                    selectList={searchSelectList}
                  />
                  <Row>
                    <Col md="3">
                      <Row>
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
                        </div>
                      </Row>
                    </Col>

                    <Col md="9" className="px-5">
                      <MenuTab menuList={[subTabMenuList.WorkInformation]}>
                        {[
                          // <Scrollbars style={{ height: 400, overflow: "hidden" }}>
                          <Row
                            key="key"
                            className="mt-4 mb-5 justify-content-center"
                          >
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
                          <Row
                            key="key"
                            className="mt-4 mb-4 justify-content-center"
                          >
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
                  </Row>
                </>,
                <>
                  {/*  계약서 조회 */}
                  <LcSearchSearchPanel
                    onSearch={actions.onSearch}
                    // dateSelectRef={dateSelectRef}
                    // dateOption={dateOption}
                    salSelectRef={salSelectRef}
                    selectList={searchSelectList}
                  />
                  <Row>
                    <Col md="3">
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

                    <Col md="9" className="px-5">
                      <MenuTab menuList={[subTabMenuList.WorkInformation]}>
                        {[
                          <Row
                            key="key"
                            className="mt-4 mb-5 justify-content-center"
                          >
                            <FormPanel
                              INPUT_CONSTANT={MAIN_TAB_SEARCH.primaryTabInputs}
                              formData={mainTabData}
                              submitData={actions.submitMainTabData}
                              actions={actions}
                            />
                          </Row>,
                        ]}
                      </MenuTab>
                      <MenuTab menuList={[subTabMenuList.otherBenefit]}>
                        {[
                          <Row
                            key="key"
                            className="mt-4 mb-4 justify-content-center"
                          >
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
                        ]}
                      </MenuTab>
                    </Col>
                  </Row>
                </>,
              ]}
            </MenuTab>
          </Row>
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Container>
    </>
  );
};

export default LaborContractLayout;
