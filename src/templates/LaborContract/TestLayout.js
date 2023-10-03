import React, { useCallback, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LaborContractModel from "../../model/LaborContract/TestModel";
import LaborContractHeader from "./LaborContractHeader";
import CodeHelperModal from "../../components/CodeHelperModal";
import ModalComponent from "../../components/ModalComponent";
import Swsm from "../../vo/LaborContract/Swsm";
import SwsmOther from "../../vo/LaborContract/SwsmOther";
import Scrollbars from "react-custom-scrollbars";

import {
  LeftTableHeaders,
  searchSelectList,
  CODE_HELPER_DATA,
  searchOption,
  leftTableConstant,
} from "../../model/LaborContract/LaborContractConstant";

import { SubTabHeaders } from "../../model/LaborContract/LaborContractConstant";
import { subTabMenuList } from "../../model/LaborContract/LaborContractConstant";
import TableForm from "../../components/TableForm";
import FormPanel from "../../components/FormPanel";
import Spinner from "react-bootstrap/Spinner";
import MenuTab from "../../components/MenuTab";
import "../../styles/LaborContract/LaborContractLayout.scss";

import {
  TAB_MENU_LIST,
  MAIN_TAB_SEARCH,
  MAIN_TAB,
} from "./MainTab/LaborContractTabConstant";

import LcSearchSearchPanel from "./SearchPanel/LcSearchSearchPanel";
import LcSearchPanel from "./SearchPanel/LcSearchPanel";

const TestLayout = () => {
  const { state, actions } = LaborContractModel();
  const {
    jobSelectRef,
    jobSetSelectRef,
    leftTableData,
    selectedRows,
    modalState,
    codeHelperTableData,
    leftCodeHelperTableData,
    mainTabData,
    subTableData,
    leftTablePkValue,
    dateSelectRef,
    dateEndSelectRef,
    dateSetSelectRef,
  } = state;

  useEffect(() => {
    actions.onLoadCodeHelper();
    // actions.setMainTabData({});
  }, []);

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
      <LaborContractHeader />
      <Container>
        <Row className="mt-3">
          <MenuTab menuList={TAB_MENU_LIST.mainTabMenuList}>
            {[
              <>
                {/* 계약서 작성 */}
                <LcSearchPanel
                  // <LcSearchSearchPanel
                  onSearch={actions.onSearch}
                  jobSetSelectRef={jobSetSelectRef}
                  dateSelectRef={dateSetSelectRef}
                  searchOption={searchOption}
                  onSelect={actions.submitMainTabData}
                />
                <Row>
                  <Col md="3">
                    <Row>
                      <div className="leftTable">
                        <TableForm
                          readOnly
                          tableName="swsm"
                          sortable
                          rowAddable
                          showCheckbox
                          tableHeaders={leftTableConstant.headers}
                          tableData={leftTableData}
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
                              actions.setLeftTablePkValue({ cdEmp: row.cdEmp });
                            },
                            updateEditedRow: actions.updateEmp,
                            setSelectedRows: actions.setSelectedRows,
                            deleteRow: actions.deleteRow,
                            getRowObject: (data) => {
                              return { item: Swsm(data), table: "swsm" };
                            },
                          }}
                        />
                      </div>
                    </Row>
                  </Col>

                  <Col md="9" className="px-5">
                    <MenuTab menuList={[subTabMenuList.WorkInformation]}>
                      {[
                        <Scrollbars
                          style={{
                            height: 380,
                            overflow: "hidden",
                            marginBottom: 30,
                          }}
                        >
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
                          </Row>
                          ,
                        </Scrollbars>,
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
                            rowAddable
                            // sortable
                            showCheckbox
                            tableHeaders={SubTabHeaders}
                            tableData={subTableData}
                            pkValue={leftTablePkValue}
                            selectedRows={selectedRows}
                            actions={{
                              setTableData: actions.setSubTableData,
                              setSelectedRows: actions.setSelectedRows,
                              insertNewRow: actions.insertSwsmOther,
                              updateEditedRow: actions.updateSwsmOther,
                              deleteRow: actions.deleteRow,
                              getRowObject: SwsmOther,
                            }}
                          />
                        </Row>,
                      ]}
                    </MenuTab>
                  </Col>
                </Row>
              </>,
              <>
                {/*  계약서 조회 */}
                <LcSearchSearchPanel
                  onSearch={actions.onSearch}
                  jobSelectRef={jobSelectRef}
                  dateSelectRef={dateSelectRef}
                  dateEndSelectRef={dateEndSelectRef}
                  searchOption={searchOption}
                  onSelect={actions.submitMainTabData}
                />
                <Row>
                  <Col md="3">
                    <Row>
                      <div className="leftTable">
                        <TableForm
                          readOnly
                          tableName="swsm"
                          //showCheckbox
                          sortable
                          // rowAddable
                          showCheckbox
                          tableHeaders={leftTableConstant.headers}
                          tableData={leftTableData}
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
                              actions.setLeftTablePkValue({ cdEmp: row.cdEmp });
                            },
                            updateEditedRow: actions.updateEmp,
                            setSelectedRows: actions.setSelectedRows,
                            deleteRow: actions.deleteRow,
                            getRowObject: (data) => {
                              return { item: Swsm(data), table: "swsm" };
                            },
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
                  </Col>
                </Row>
              </>,
            ]}
          </MenuTab>
        </Row>
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

export default TestLayout;
