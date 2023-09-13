import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LaborContractModel from "../../model/LaborContract/LaborContractModel";
import TestModel from "../../model/LaborContract/TestModel";
import LaborContractHeader from "../LaborContractHeader";
import SearchPanel from "../../components/SearchPanel";
// import LaborContractConstant from "./src/model/LaborContract/LaborContractConstant";
import SwsmConstant from "../../model/SwsmConstant";
import DispatcherComponent from "../../components/DispatcherCompoenet";
import { LeftTableHeaders } from "../../model/LaborContract/LaborContractConstant";
import { SubTabHeaders } from "../../model/LaborContract/LaborContractConstant";
import { subTabMenuList } from "../../model/LaborContract/LaborContractConstant";
import TableForm from "../../components/TableForm";
import Swsm from "../../vo/SwsmGrid/Swsm";
import SwsmOther from "../../vo/SwsmGrid/SwsmOther";
import Spinner from "react-bootstrap/Spinner";
import MenuTab from "../../components/MenuTab";
import { Scrollbars } from "react-custom-scrollbars";
import DateForm from "../../components/DateForm";
import AddressForm from "../../components/AddressForm";
import TempAdd from "../../components/TempAdd";
import SelectForm from "../../components/SelectForm";
import TextBoxComponent from "../../components/TextBoxComponent";
import ProfileImageForm from "../../components/ProfileImageForm";
import {
  leftStaticsTableConstant,
  leftTableConstant,
  orderList,
  searchOption,
  subTableConstant,
  tabConstant,
} from "../../model/HrManagement/HrManagementConstant";
import "../../styles/HrManagement/HrManagementLayout.scss";

import MainTab from "./MainTab/LaborContractMainTab";

import {
  HeaderField,
  MainTabField,
} from "../../model/LaborContract/LaborContractField";
//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data

const HrManagementLayout = () => {
  //Model로 관리되는 값들
  const { state, actions, mainTablePkValue } = TestModel();
  const { mainTabRef, leftTableData, mainTabData, subTableData, selectedRows } =
    state;

  //   const {
  //     jobOkSelectRef,
  //     orderSelectRef,
  //     leftTableData,
  //     leftTablePkValue,
  //     leftStaticsTableData,
  //     mainTabRef,
  //     mainTabData,
  //     empImageSrc,
  //     subTableData,
  //     selectedRows,
  //   } = state;

  return (
    <>
      <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />

      <Container>
        {/* 조회영역 */}
        <SearchPanel showAccordion>
          <Row>
            {HeaderField.map((field, idx) => (
              <Col key={idx}>{DispatcherComponent(field)}</Col>
            ))}
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
                  showCheckbox
                  showHeaderArrow
                  sortable
                  rowAddable
                  tableHeaders={LeftTableHeaders}
                  tableData={leftTableData}
                  selectedRows={selectedRows}
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
                <div>하나하나</div>
              </MenuTab>
              {/* 우측 메인폼 */}
              <Scrollbars style={{ height: 470, overflow: "hidden" }}>
                <Row className="mb-5 justify-content-center" ref={mainTabRef}>
                  <Row>
                    <MainTab
                      formData={mainTabData}
                      submitData={actions.submitMainTabData}
                      columnNumber={1}
                    />
                  </Row>
                </Row>
              </Scrollbars>

              {/* 우측 서브탭 */}
              <MenuTab menuList={[subTabMenuList.otherBenefit]} />
              {/* 우측 서브 그리드 */}
              <div className="subTable">
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
                    // insertNewRow: actions.insertEmpFam,
                    // updateEditedRow: actions.updateEmpFam,
                    // deleteRow: actions.deleteRow,
                  }}
                />
              </div>
            </Col>
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </Row>
      </Container>
    </>
  );
};

export default HrManagementLayout;
