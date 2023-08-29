import React, { useCallback, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import MenuTab from "../components/MenuTab";
import SearchPanel from "../components/SearchPanel";
import DateTest from "../components/DateTest";
import SelectForm from "../components/SelectForm";
import SwsmConstant from "../model/SwsmConstant";
import TableTemp from "../components/TableTemp";
import TempSwsmModel from "../model/TempSwsmModel";
import Swsm from "../vo/SwsmGrid/Swsm";
import SwsmOther from "../vo/SwsmGrid/SwsmOther";
import { Scrollbars } from "react-custom-scrollbars";
import TextBoxComponent from "../components/TextBoxComponent";
import TempAdd from "../components/TempAdd";
import TempText from "../components/TempText";
import Spinner from "react-bootstrap/Spinner";
import TempSelect from "../components/TempSelect";
import { LabelSharp } from "@material-ui/icons";

const TestSwsnGrid = () => {
  const {
    mainTabMenuList, // 전체 구분 목록
    subTabMenuList, // 메뉴 구분 목록
    incomeClassficationList, // 상단 조회 - 소득구분 목록
    SwsmLeftTableHeaders,
    SwsmSubTabHeaders,
    labels,
    salaryTypeList,
    otherBenefitStatusList,
    bonusPaymentStatusList,
    salaryPaymentDateTypeList,
    paymentMethodList,
    empInsuranceList,
    compensationInsuranceList,
    healthInsuranceList,
  } = SwsmConstant();

  const { state, actions } = TempSwsmModel();
  const { leftTableData, leftTablePkValue, mainTabData, subTableData } = state;

  return (
    <>
      <MenuTab menuList={mainTabMenuList} />
      <SearchPanel>
        <Row>
          {/* 작성년월 */}
          <Col md="4">
            <DateTest label={labels.dateOfCreation} />
          </Col>
          {/* 소득구분 */}
          <Col md="4">
            <SelectForm
              label={labels.incomeClassfication}
              optionList={incomeClassficationList}
            />
          </Col>
        </Row>
      </SearchPanel>
      <Row>
        <Col md="3">
          <TableTemp
            showCheckbox={true}
            showHeaderArrow={true}
            tableHeaders={SwsmLeftTableHeaders}
            tableData={leftTableData}
            rowAddable={true}
            actions={{
              setTableData: actions.setLeftTableData,
              setPkValue: actions.setMainTablePkValue,
              setEditedRow: actions.setEditedEmp,
              getRowObject: Swsm,
            }}
          />
        </Col>

        {mainTabData ? (
          <Col md="9">
            {/* 근로정보 탭 */}
            <MenuTab menuList={[subTabMenuList.WorkInformation]} />
            <Scrollbars style={{ height: 470, overflow: "hidden" }}>
              {/* 근로계약기간  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <DateTest
                    label={labels.empContractPeriod}
                    isPeriod={true}
                    type={"date"}
                    // pkValue={}/
                    labelKey={"startEmpContractPeriod"}
                    labelKey2={"endEmpContractPeriod"}
                    actions={{
                      // setPkValue: actions.setMainTablePkValue,
                      setEdited: actions.setEditedSwsm,
                    }}
                    value={
                      mainTabData ? mainTabData.startEmpContractPeriod : ""
                    }
                    value2={mainTabData ? mainTabData.endEmpContractPeriod : ""}
                  />
                </Col>
              </Row>
              {/* 근무장소  */}
              <Row>
                <Col xs md={{ span: 10, offset: 1 }}>
                  <TempAdd
                    label={labels.workAddress}
                    isZonecode={false}
                    value={mainTabData ? mainTabData.address : ""}
                    value2={mainTabData ? mainTabData.addDetail : ""}
                  />
                </Col>
              </Row>
              {/* 업무의 내용  */}
              <Row>
                <Col xs md={{ span: 10, offset: 1 }}>
                  {/* <TextBoxComponent
                      label={"test"}
                      value={mainTabData ? mainTabData.jobDescription : ""}
                    /> */}
                  <TempText
                    label={labels.jobDescription}
                    value={mainTabData ? mainTabData.jobDescription : ""}
                    md={2}
                    labelKey={"jobDescription"}
                    actions={{
                      setEdited: actions.setEditedSwsm,
                    }}
                  />
                </Col>
              </Row>
              {/* 소정근로시간  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TempText
                    isPeriod={true}
                    label={labels.workTime}
                    value={mainTabData ? mainTabData.startWorktime : ""}
                    PeriodEnd={mainTabData ? mainTabData.endWorktime : ""}
                  />
                </Col>
              </Row>
              {/* 휴게시간  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TempText
                    label={labels.breakTime}
                    isPeriod={true}
                    value={mainTabData ? mainTabData.startBreakTime : ""}
                    PeriodEnd={mainTabData ? mainTabData.endBreakTime : ""}
                  />
                </Col>
              </Row>
              {/* 근무일  */}
              <Row>
                <Col xs md={{ span: 10, offset: 1 }}>
                  <TempText
                    label={labels.workingDay}
                    label2={"매 주 "}
                    label3={"일"}
                    value={mainTabData ? mainTabData.workingDay : ""}
                    subLabel={true}
                    md={4}
                    size={1}
                    labelKey={"workingDay"}
                    actions={{
                      setEdited: actions.setEditedSwsm,
                    }}
                  />
                </Col>
              </Row>
              {/* 주휴일  */}
              <Row>
                <Col xs md={{ span: 10, offset: 1 }}>
                  <TempText
                    label={labels.dayOff}
                    label2={"매 주 "}
                    label3={"요일"}
                    type={"selectForm"}
                    value={mainTabData ? mainTabData.dayOff : ""}
                    subLabel={true}
                    md={4}
                    labelKey={"dayOff"}
                    actions={{
                      setEdited: actions.setEditedSwsm,
                    }}
                  />
                </Col>
              </Row>
              {/* 임금유형  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TempSelect
                    label={labels.salaryType}
                    optionList={salaryTypeList}
                    subLabel={"원"}
                    subValue={mainTabData ? mainTabData.salaryAmount : ""}
                    labelKey={"salaryAmount"}
                    actions={{
                      setEdited: actions.setEditedSwsm,
                    }}
                  />
                  {/* <TextBoxComponent />원 */}
                </Col>
              </Row>
              {/* 기타급여  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm
                    label={labels.otherBenefits}
                    optionList={otherBenefitStatusList}
                  />
                </Col>
              </Row>
              {/* 상여금  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TempSelect
                    label={labels.bonusPaymentStatus}
                    optionList={bonusPaymentStatusList}
                    subLabel={"원"}
                    subValue={mainTabData ? mainTabData.bonusAmount : ""}
                    labelKey={"bonusAmount"}
                    actions={{
                      setEdited: actions.setEditedSwsm,
                    }}
                  />
                  {/* 한 라인 안에 들어가게 변경 필요 */}
                  {/* <TextBoxComponent />원 */}
                </Col>
              </Row>
              {/* 임금지급일  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm
                    label={labels.salaryPaymentDateType}
                    optionList={salaryPaymentDateTypeList}
                  />
                  {/* 한 라인 안에 들어가게 변경 필요 */}
                  {/* <TextBoxComponent />원 */}
                </Col>
              </Row>
              {/* 지급방법  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm
                    label={labels.paymentMethod}
                    optionList={paymentMethodList}
                  />
                </Col>
              </Row>
              {/* 고용보험  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm
                    label={labels.empInsurance}
                    optionList={empInsuranceList}
                  />
                </Col>
              </Row>
              {/* 산재보험 */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm
                    label={labels.compensationInsurance}
                    optionList={compensationInsuranceList}
                  />
                </Col>
              </Row>

              {/* 건강보험  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm
                    label={labels.healthInsurance}
                    optionList={healthInsuranceList}
                  />
                </Col>
              </Row>

              {/* 작성일자  */}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <DateTest
                    label={labels.dateOfCreation}
                    value={mainTabData ? mainTabData.paymentDate : ""}
                    type={"date"}
                    isPeriod={false}
                    labelKey={"paymentDate"}
                    actions={{
                      setEdited: actions.setEditedSwsm,
                    }}
                  />
                </Col>
              </Row>
            </Scrollbars>
            {/* 기타 급여 탭 */}
            <MenuTab menuList={[subTabMenuList.otherBenefit]} />
            <TableTemp
              showCheckbox
              showHeaderArrow
              rowAddable
              tableHeaders={SwsmSubTabHeaders}
              tableData={subTableData}
              pkValue={leftTablePkValue}
              actions={{
                setTableData: actions.setSubTableData,
                // setPkValue: actions.setLeftTablePkValue,
                setEditedRow: actions.setEditedSwsmOther,
                getRowObject: SwsmOther,
              }}
            />
          </Col>
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Row>
    </>
  );
};

export default TestSwsnGrid;

{
  /* <TableTemp
                showCheckbox={true}
                showHeaderArrow={true}
                tableHeaders={SwsmSubTabHeaders}
                tableData={subTableData}
                rowAddable={true}
                actions={{
                  setTableData: actions.setSubTableData,
                  setPkValue: actions.setMainTablePkValue,
                  // setEditedRow:actions.setEditedEmp
                  // getRowObject: Swsm,
                }} */
}
{
  /* <TableTemp
                showCheckbox={true}
                showHeaderArrow={true}
                tableHeaders={SwsmSubTabHeaders}
                tableData={subTableData}
                rowAddable={true}
                actions={{
                  setTableData: actions.setSubTableData,
                  setPkValue: actions.setMainTablePkValue,
                  setEditedRow: actions.setEditedSwsmOther,
                  getRowObject: SwsmOther,
                }}
              /> */
}
