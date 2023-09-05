import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Scrollbars } from "react-custom-scrollbars";
import DateTest from "../components/DateTest";
import MenuTab from "../components/MenuTab";
import SearchPanel from "../components/SearchPanel";
import SelectForm from "../components/SelectForm";
import SwsmAddress from "../components/SwsmAddress";
import SwsmText from "../components/SwsmText";
import TableForm from "../components/TableForm";
import TempSelect from "../components/TempSelect";
import LaborContractModel from "../model/LaborContractModel";
import SwsmConstant from "../model/SwsmConstant";
import Swsm from "../vo/SwsmGrid/Swsm";
import SwsmOther from "../vo/SwsmGrid/SwsmOther";
import LaborContractHeader from "./LaborContractHeader";

const LaborContract = () => {
  const {
    mainTabMenuList, // 전체 구분 목록
    subTabMenuList, // 메뉴 구분 목록
    incomeClassficationList, // 상단 조회 - 소득구분 목록
    SwsmLeftTableHeaders,
    SwsmSubTabHeaders,
    labels, //
    salaryTypeList,
    otherBenefitStatusList,
    bonusPaymentStatusList,
    salaryPaymentDateTypeList,
    paymentMethodList,
    empInsuranceList,
    compensationInsuranceList,
    healthInsuranceList,
  } = SwsmConstant();

  const { state, actions, mainTablePkValue } = LaborContractModel();

  const {
    leftTableData,
    // leftTablePkValue,
    mainTabData,
    subTableData,
  } = state;

  const handlerMainTab = (e) => {
    console.log(e.target.value);
    console.log(mainTabMenuList);
    console.log(mainTabMenuList);
  };

  return (
    <>
      <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />
      <Container fluid>
        <MenuTab menuList={mainTabMenuList} onChange={handlerMainTab} />
        <SearchPanel>
          <Row>
            {/* 작성년월 */}
            <Col md="4">
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
            <TableForm
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
                      labelKey={"startEmpContractPeriod"}
                      labelKey2={"endEmpContractPeriod"}
                      actions={{
                        setEdited: actions.setEditedSwsm,
                      }}
                      value={mainTabData ? mainTabData.startEmpContractPeriod : ""}
                      value2={mainTabData ? mainTabData.endEmpContractPeriod : ""}
                    />
                  </Col>
                </Row>
                {/* 근무장소  */}
                <Row>
                  <Col xs md={{ span: 10, offset: 1 }}>
                    <SwsmAddress
                      label={labels.workAddress}
                      isZonecode={false}
                      value={mainTabData ? mainTabData.address : ""}
                      value2={mainTabData ? mainTabData.addDetail : ""}
                      actions={{
                        setEdited: actions.setEditedSwsm,
                      }}
                    />
                  </Col>
                </Row>
                {/* 업무의 내용  */}
                <Row>
                  <Col xs md={{ span: 10, offset: 1 }}>
                    <SwsmText
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
                    <SwsmText
                      isPeriod={true}
                      label={labels.workTime}
                      labelKey={"startWorktime"}
                      labelKey2={"endWorktime"}
                      value={mainTabData ? mainTabData.startWorktime : ""}
                      PeriodEnd={mainTabData ? mainTabData.endWorktime : ""}
                      actions={{
                        setEdited: actions.setEditedSwsm,
                      }}
                    />
                  </Col>
                </Row>
                {/* 휴게시간  */}
                <Row>
                  <Col xs md={{ span: 5, offset: 1 }}>
                    <SwsmText
                      isPeriod={true}
                      label={labels.breakTime}
                      labelKey={"startBreakTime"}
                      labelKey2={"endBreakTime"}
                      value={mainTabData ? mainTabData.startBreakTime : ""}
                      PeriodEnd={mainTabData ? mainTabData.endBreakTime : ""}
                      actions={{
                        setEdited: actions.setEditedSwsm,
                      }}
                    />
                  </Col>
                </Row>
                {/* 근무일  */}
                <Row>
                  <Col xs md={{ span: 10, offset: 1 }}>
                    <SwsmText
                      label={labels.workingDay}
                      label2={"매 주 "}
                      label3={"일"}
                      size={1}
                      value={mainTabData ? mainTabData.workingDay : ""}
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
                    <SwsmText
                      label={labels.dayOff}
                      label2={"매 주"}
                      label3={"요일"}
                      size={1}
                      value={mainTabData ? mainTabData.dayOff : ""}
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
              <TableForm
                showCheckbox
                showHeaderArrow
                rowAddable
                tableHeaders={SwsmSubTabHeaders}
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

export default LaborContract;
