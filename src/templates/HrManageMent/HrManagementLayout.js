// 작성자 : 오승환
import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import DateTest from "../../components/DateTest";
import MenuTab from "../../components/MenuTab";
import ProfileImageForm from "../../components/ProfileImageForm";
import RadioForm from "../../components/RadioForm";
import SearchPanel from "../../components/SearchPanel";
import SelectForm from "../../components/SelectForm";
import TableForm from "../../components/TableForm";
import TextBoxComponent from "../../components/TextBoxComponent";
import {
  contractRadioList,
  genderRadioList,
  labels,
  marryRadioList, //결혼 여부
} from "../../model/CommonConstant";
import {
  leftStaticsTableConstant,
  leftTableConstant,
  orderList,
  searchOption,
  subTableConstant,
  tabConstant,
} from "../../model/HrManagement/HrManagementConstant";
import HrManagementModel from "../../model/HrManagement/HrManagementModel";
import "../../styles/HrManagement/HrManagementLayout.scss";
import Emp from "../../vo/HrManagement/Emp";
import EmpFam from "../../vo/HrManagement/EmpFam";
import HrManagementHeader from "./HrManagementHeader";

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data

const HrManagementLayout = () => {
  //Model로 관리되는 값들
  const { state, actions } = HrManagementModel();
  const {
    leftTableData,
    leftTablePkValue,
    leftStaticsTableData,
    mainTabData,
    empImageSrc,
    subTableData,
    selectedRows,
  } = state;

  //검색조건 : 재직구분, 정렬기준
  const jobOkRef = useRef();
  const orderRef = useRef();

  //조회버튼 클릭시 재직구분과 정렬기준을 업데이트
  const onSearch = () => {
    actions.setOrderRef(orderRef.current.value);
    if (jobOkRef.current.value === "yAndOnThisYear") {
      actions.setRefYear(new Date().getFullYear());
      actions.setJobOk("Y");
    } else {
      actions.setRefYear();
      actions.setJobOk(jobOkRef.current.value);
    }
  };

  const mainTabRef = useRef();

  //mainTab에서 Enter 입력시 EmpAdd 업데이트
  const submitMainTabData = (event, value) => {
    if (event.key === "Enter") {
      console.log("엔터누름");
      event.target.blur();
      if (mainTabRef.current) {
        let newMainTabData = { ...mainTabData.item };
        const inputElements = mainTabRef.current.querySelectorAll("input");
        Array.from(inputElements).forEach((input) => {
          newMainTabData[input.id] =
            input.type !== "radio"
              ? input.value
              : input.checked
              ? input.value
              : null;
        });
        actions.setEditedEmpAdd(newMainTabData);
      }
    }
    if (event.type === "change") {
      if (mainTabRef.current) {
        event.target.blur();
        let newMainTabData = { ...mainTabData.item };
        newMainTabData[event.target.id] = value;
        actions.setEditedEmpAdd(newMainTabData);
      }
    }
  };

  const tableFooter = () => {
    return (
      <tr>
        <td colSpan="3">푸터입니다.</td>
      </tr>
    );
  };

  return (
    <>
      {/* <CodeHelperModal
        show={empCodeHelper.show}
        apiFlag={empCodeHelper.apiFlag}
        onHide={() =>
          actions.setEmpCodeHelper({ ...empCodeHelper, show: false })
        }
        codeHelperCode={empCodeHelper.codeHelperCode}
      /> */}
      <HrManagementHeader
        deleteButtonHandler={actions.deleteSelectedRows}
        existSelectedRows={selectedRows.length !== 0}
      />
      <Container>
        {/* 조회영역 */}
        <SearchPanel onSearch={onSearch}>
          <Row>
            <Col>
              <SelectForm
                label={"구분"}
                optionList={searchOption}
                selectRef={jobOkRef}
              />
            </Col>
            <Col>
              <SelectForm
                label={"정렬"}
                optionList={orderList}
                selectRef={orderRef}
              />
            </Col>
          </Row>
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
                  tableHeaders={leftTableConstant.headers}
                  tableData={leftTableData}
                  selectedRows={selectedRows}
                  tableFooter={tableFooter()}
                  actions={{
                    setTableData: actions.setLeftTableData,
                    setPkValue: actions.setLeftTablePkValue,
                    setEditedRow: actions.setEditedEmp,
                    setSelectedRows: actions.setSelectedRows,
                    deleteCurrentRow: actions.deleteCurrentRow,
                    getRowObject: Emp,
                  }}
                />
              </div>
            </Row>
            <Row className="mt-3">
              <TableForm
                tableName="EMPSTATICS"
                tableHeaders={leftStaticsTableConstant.headers}
                tableData={leftStaticsTableData}
                readOnly
              />
            </Row>
          </Col>
          {/* 우측 영역 */}
          {mainTabData ? (
            <Col md="9" className="px-5">
              {/* 우측 메인탭 */}
              <MenuTab menuList={tabConstant.mainTabMenuList} />
              {/* 우측 메인폼 */}
              <Row className="mb-5 justify-content-center" ref={mainTabRef}>
                <Row>
                  <Col className="d-flex align-items-center" xs md="3">
                    <ProfileImageForm
                      src={empImageSrc}
                      handleUpload={actions.updateEmpPhoto}
                    />
                  </Col>
                  <Col xs md="9">
                    <Row>
                      <Col xs md="6">
                        <TextBoxComponent
                          id="nmEnName"
                          label={labels.nmEnName}
                          value={mainTabData.item?.nmEnName}
                          onEnter={submitMainTabData}
                        />
                      </Col>
                      <Col xs md="6">
                        <TextBoxComponent
                          id="nmChName"
                          label={labels.nmChName}
                          value={mainTabData.item?.nmChName}
                          onEnter={submitMainTabData}
                        />
                      </Col>
                      <Col xs md="6">
                        <TextBoxComponent
                          id="noSocial"
                          type="regNum"
                          label={labels.noSocial}
                          disabled
                          value={mainTabData.item?.noSocial}
                          onEnter={submitMainTabData}
                        />
                      </Col>
                      <Col xs md="6">
                        <RadioForm
                          id="fgSex"
                          label={labels.fgSex}
                          disabled
                          optionList={genderRadioList}
                          checked={mainTabData.item?.fgSex}
                        />
                      </Col>
                      <Col xs md="6">
                        <DateTest
                          id="daBirth"
                          label={labels.daBirth}
                          value={mainTabData.item?.daBirth}
                          onChange={submitMainTabData}
                        />
                      </Col>
                      <Col xs md="6">
                        <RadioForm
                          id="fgWedding"
                          label={labels.fgWedding}
                          optionList={marryRadioList}
                          checked={mainTabData.item?.fgWedding}
                          onChange={submitMainTabData}
                        />
                      </Col>
                      <Col xs md="6">
                        <TextBoxComponent
                          id="cdDept"
                          label={labels.cdDept}
                          disabled
                          value={mainTabData.item?.cdDept}
                          onEnter={submitMainTabData}
                        />
                      </Col>
                      <Col xs md="6">
                        <TextBoxComponent
                          id="rankNo"
                          label={labels.rankNo}
                          disabled
                          value={mainTabData.item?.ankNo}
                          onEnter={submitMainTabData}
                        />
                      </Col>
                      <Col xs md="6">
                        <TextBoxComponent
                          id="cdOffduty"
                          label={labels.cdOffduty}
                          value={mainTabData.item?.cdOffduty}
                          onEnter={submitMainTabData}
                        />
                      </Col>
                      <Col xs md="6">
                        <RadioForm
                          id="ynDrawContracts"
                          label={labels.ynDrawContracts}
                          optionList={contractRadioList}
                          checked={mainTabData.item?.ynDrawContracts}
                          onChange={submitMainTabData}
                        />
                      </Col>
                      <Col xs md="6">
                        <TextBoxComponent
                          id="daEnter"
                          label={labels.daEnter}
                          disabled
                          value={mainTabData.item?.daEnter}
                          onEnter={submitMainTabData}
                        />
                      </Col>
                      <Col xs md="6">
                        <TextBoxComponent
                          id="daRetire"
                          label={labels.daRetire}
                          disabled
                          value={mainTabData.item?.daRetire}
                          onEnter={submitMainTabData}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Row>
              {/* 우측 서브탭 */}
              <MenuTab menuList={tabConstant.subTabMenuList} />
              {/* 우측 서브 그리드 */}
              <div className="subTable">
                <TableForm
                  tableName="EMPFAM"
                  showCheckbox
                  showHeaderArrow
                  rowAddable
                  sortable
                  tableHeaders={subTableConstant.headers}
                  tableData={subTableData}
                  pkValue={leftTablePkValue}
                  selectedRows={selectedRows}
                  actions={{
                    setTableData: actions.setSubTableData,
                    setEditedRow: actions.setEditedEmpFam,
                    setSelectedRows: actions.setSelectedRows,
                    insertRow: actions.insertEmpFam,
                    updateRow: actions.updateEmpFam,
                    deleteRow: actions.deleteRow,
                    getRowObject: EmpFam,
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
