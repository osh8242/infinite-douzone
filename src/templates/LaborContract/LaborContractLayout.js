import React, { useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LaborContractModel from "../../model/LaborContract/LaborContractModel";
import LaborContractHeader from "./LaborContractHeader";
import CodeHelperModal from "../../components/CodeHelperModal";
import ModalComponent from "../../components/ModalComponent";

import SearchPanel from "../../components/SearchPanel";
import {
  LeftTableHeaders,
  searchSelectList,
  CODE_HELPER_DATA,
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
    leftCodeHelperTableData,
    modalState,
    codeHelperTableData,
  } = state;

  //코드도움 아이콘 클릭이벤트
  const modalShow = useCallback(
    async (type, data, setRowData, parentFocusRef) => {
      actions.setModalState({
        ...modalState,
        show: true,
        parentFocusRef: parentFocusRef,
      });

      switch (type) {
        case "default":
          actions.setCodeHelperTableData(() => ({
            setRowData: setRowData,
            tableHeaders: data.headers,
            tableData: data.tableData,
            usePk: data.usePk ? data.usePk : "",
            searchField: data.searchField,
          }));
          break;

        case "leftTable":
          actions.setModalState((prevState) => ({
            ...prevState,
            title: data.title,
          }));

          actions.setCodeHelperTableData(() => ({
            setRowData: setRowData,
            tableHeaders: data.headers,
            tableData: leftCodeHelperTableData,
            usePk: data.usePk ? data.usePk : "",
            searchField: data.searchField,
          }));
          break;

        default:
          break;
      }
    },
    [actions, modalState, leftCodeHelperTableData]
  );

  return (
    <>
      <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />
      <Container>
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
                          {/* <TableForm
                            readOnly
                            tableName="swsm"
                            sortable
                            rowAddable
                            showCheckbox
                            tableHeaders={LeftTableHeaders}
                            // tableData={leftTableData}
                            selectedRows={selectedRows}
                            codeHelper
                            defaultFocus
                            actions={{
                              setTableData: actions.setLeftTableData,
                              newRowCodeHelper: (parentFocusRef) => {
                                parentFocusRef.current = false;
                                modalShow(
                                  "leftTable",
                                  CODE_HELPER_DATA.leftTableCodeHelper,
                                  actions.registSwsm,
                                  parentFocusRef
                                );
                              },
                              setPkValue: actions.setLeftTablePkValue,
                              insertNewRow: (row) => {
                                actions.insertSwsm(row);
                                actions.setLeftTablePkValue({
                                  cdEmp: row.cdEmp,
                                });
                              },
                              updateEditedRow: actions.updateEmp,
                              setSelectedRows: actions.setSelectedRows,
                              deleteRow: actions.deleteRow,
                              getRowObject: Swsm,
                            }}
                          /> */}
                          <TableForm
                            tableName="swsm"
                            showHeaderArrow
                            sortable
                            tableHeaders={LeftTableHeaders}
                            selectedRows={selectedRows}
                            rowAddable
                            defaultSelectedRow
                            defaultFocus
                            readOnly
                            showCheckbox
                            codeHelper
                            actions={{
                              setTableData: actions.setLeftTableData,
                              setPkValue: actions.setMainTablePkValue,
                              setEditedRow: actions.setEditedEmp,
                              setSelectedRows: actions.setSelectedRows,
                              deleteCurrentRow: actions.deleteCurrentRow,
                              getRowObject: Swsm,
                              newRowCodeHelper: (parentFocusRef) => {
                                parentFocusRef.current = false;
                                modalShow(
                                  "leftTable",
                                  CODE_HELPER_DATA.leftTableCodeHelper,
                                  actions.registSwsm,
                                  parentFocusRef
                                );
                              },
                              insertNewRow: (row) => {
                                actions.insertSwsm(row);
                                actions.setLeftTablePkValue({
                                  cdEmp: row.cdEmp,
                                });
                              },
                              updateEditedRow: actions.updateEmp,
                              deleteRow: actions.deleteRow,
                            }}
                          />
                          {/* <TableForm
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
                              newRowCodeHelper: (parentFocusRef) => {
                                parentFocusRef.current = false;
                                modalShow(
                                  "leftTable",
                                  CODE_HELPER_DATA.leftTableCodeHelper,
                                  actions.registEmpAdd,
                                  parentFocusRef
                                );
                              },
                            }}
                          /> */}
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
      <ModalComponent
        title={modalState.title}
        size={modalState.size}
        show={modalState.show}
        onHide={() => {
          actions.setModalState({ show: false });
          modalState.parentFocusRef.current = true;
        }}
      >
        <CodeHelperModal
          onHide={() => {
            actions.setModalState({ show: false });
            if (modalState.parentFocusRef)
              modalState.parentFocusRef.current = true;
          }}
          setRowData={codeHelperTableData.setRowData}
          tableHeaders={codeHelperTableData.tableHeaders}
          tableData={codeHelperTableData.tableData}
          usePk={codeHelperTableData.usePk}
          searchField={codeHelperTableData.searchField}
        />
      </ModalComponent>
    </>
  );
};

export default LaborContractLayout;
