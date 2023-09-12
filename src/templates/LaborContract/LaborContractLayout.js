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
import {
  HeaderField,
  MainTabField,
} from "../../model/LaborContract/LaborContractField";

const LaborContractLayout = () => {
  const { SwsmLeftTableHeaders, subTabMenuList } = SwsmConstant();
  const { state, actions, mainTablePkValue } = TestModel();
  const { leftTableData, mainTabData, subTableData, selectedRows } = state;
  const onSearch = () => {
    console.log("onSearcing...");
  };
  return (
    <>
      <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />
      <Container>
        {/* Header */}
        <SearchPanel showAccordion>
          <Row>
            {HeaderField.map((field, idx) => (
              <Col key={idx}>{DispatcherComponent(field)}</Col>
            ))}
          </Row>

          <div></div>
        </SearchPanel>
        <Row>
          {/* LeftGrid */}
          <Col md="3">
            <Row>
              <div className="leftTable">
                <TableForm
                  showCheckbox
                  showHeaderArrow={true}
                  tableHeaders={LeftTableHeaders}
                  tableData={leftTableData}
                  rowAddable={true}
                  actions={{
                    setTableData: actions.setLeftTableData,
                    setPkValue: actions.setMainTablePkValue,
                    setEditedRow: actions.setEditedEmp,
                    getRowObject: Swsm,
                  }}
                />
              </div>
            </Row>
          </Col>

          {mainTabData ? (
            <Col md="9">
              {/* 근로정보 탭 */}
              <MenuTab menuList={[subTabMenuList.WorkInformation]} />
              <Scrollbars style={{ height: 470, overflow: "hidden" }}>
                <Row>
                  {MainTabField.map((field, idx) => (
                    <Col key={idx} xs md="9">
                      {DispatcherComponent(field)}
                    </Col>
                  ))}
                </Row>
              </Scrollbars>
              <MenuTab menuList={[subTabMenuList.otherBenefit]} />
              {/* SubGrid */}
              <TableForm
                showCheckbox
                showHeaderArrow
                rowAddable
                tableHeaders={SubTabHeaders}
                tableData={subTableData}
                pkValue={mainTablePkValue}
                actions={{
                  setTableData: actions.setSubTableData,
                  setEditedRow: actions.setEditedSwsmOther,
                  setSelectedRows: actions.setSelectedRows,
                  getRowObject: SwsmOther,
                }}
              />
            </Col>
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </Row>
      </Container>
    </>
  );
};

export default LaborContractLayout;
