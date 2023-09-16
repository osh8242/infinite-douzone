import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchPanel from "../../components/SearchPanel";
import TestModel from "../../model/LaborContract/TestModel";
import LaborContractHeader from "../LaborContractHeader";
// import LaborContractConstant from "./src/model/LaborContract/LaborContractConstant";
import Spinner from "react-bootstrap/Spinner";
import { Scrollbars } from "react-custom-scrollbars";
import DispatcherComponent from "../../components/DispatcherCompoenet";
import MenuTab from "../../components/MenuTab";
import TableForm from "../../components/TableForm";
import {
  LeftTableHeaders,
  SubTabHeaders,
  subTabMenuList,
} from "../../model/LaborContract/LaborContractConstant";
import {
  HeaderField,
  MainTabField,
} from "../../model/LaborContract/LaborContractField";
import SwsmConstant from "../../model/SwsmConstant";
import Swsm from "../../vo/SwsmGrid/Swsm";
import SwsmOther from "../../vo/SwsmGrid/SwsmOther";

const LaborContractLayout = () => {
  const { SwsmLeftTableHeaders } = SwsmConstant();
  const { state, actions, mainTablePkValue } = TestModel();
  const { leftTableData, mainTabData, subTableData, selectedRows, mainTabRef } =
    state;
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
              <MenuTab
                menuList={[subTabMenuList.WorkInformation]}
                ref={mainTabRef}
              >
                <Scrollbars style={{ height: 470, overflow: "hidden" }}>
                  <Row>
                    {MainTabField.map((field, idx) => (
                      <Col key={idx} xs md="10">
                        {DispatcherComponent(field)}
                      </Col>
                    ))}
                  </Row>
                </Scrollbars>{" "}
              </MenuTab>
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
