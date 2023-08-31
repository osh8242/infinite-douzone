// 작성자 : 오승환
import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import DateTest from "../components/DateTest";
import MenuTab from "../components/MenuTab";
import RadioForm from "../components/RadioForm";
import SearchPanel from "../components/SearchPanel";
import SelectForm from "../components/SelectForm";
import TableTemp from "../components/TableTemp";
import TextBoxComponent from "../components/TextBoxComponent";
import CommonConstant from "../model/CommonConstant";
import HrManagementModel from "../model/HrManagementModel";
import Emp from "../vo/HrManagement/Emp";
import EmpFam from "../vo/HrManagement/EmpFam";
import HrManagementHeader from "./HrManagementHeader";

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data

const HrManagement = ({ grid, mainTab, subTab }) => {
  //실행중에는 값이 고정인 값들
  const {
    HrManagementLeftTableHeaders,
    HrManagementSubTableHeaders,
    searchOption, // 검색옵션 리스트
    orderList, // 정렬기준 리스트
    mainTabMenuList, //메인탭 메뉴리스트
    subTabMenuList, //서브탭 메뉴리스트
    genderRadioList, //성별
    marryRadioList, //결혼여부
    contractRadioList, //근로계약서 작성여부
    labels, // 속성명
  } = CommonConstant();

  //Model로 관리되는 값들
  const { state, actions } = HrManagementModel();
  const {
    leftTableData,
    leftTablePkValue,
    mainTabData,
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
    console.log("event", event);
    if (event.key === "Enter") {
      console.log("이벤트타겟", event.target);
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
        console.log("newMainTabData", newMainTabData);
        actions.setEditedEmpAdd(newMainTabData);
      }
    }
    if (event.type === "change") {
      if (mainTabRef.current) {
        event.target.blur();
        let newMainTabData = { ...mainTabData.item };
        newMainTabData[event.target.id] = value;
        console.log("newMainTabData", newMainTabData);
        actions.setEditedEmpAdd(newMainTabData);
      }
    }
  };

  return (
    <>
      <HrManagementHeader deleteButtonHandler={actions.deleteSelectedRows} />
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
            <TableTemp
              showCheckbox
              showHeaderArrow
              rowAddable
              tableHeaders={HrManagementLeftTableHeaders}
              tableData={leftTableData}
              selectedRows={selectedRows}
              actions={{
                setTableData: actions.setLeftTableData,
                setPkValue: actions.setLeftTablePkValue,
                setEditedRow: actions.setEditedEmp,
                setSelectedRows: actions.setSelectedRows,
                getRowObject: Emp,
              }}
            />
          </Col>
          {/* 우측 영역 */}
          {mainTabData ? (
            <Col md="9" className="px-5">
              {/* 우측 메인탭 */}
              <MenuTab menuList={mainTabMenuList} />
              {/* 우측 메인폼 */}
              <Row className="mb-5" ref={mainTabRef}>
                <Col xs md="6">
                  <TextBoxComponent
                    id="nmEnName"
                    label={labels.nmEnName}
                    value={mainTabData.item?.nmEnName}
                    onKeyDown={submitMainTabData}
                  />
                </Col>
                <Col xs md="6">
                  <TextBoxComponent
                    id="nmChName"
                    label={labels.nmChName}
                    value={mainTabData.item?.nmChName}
                    onKeyDown={submitMainTabData}
                  />
                </Col>
                <Col xs md="6">
                  <TextBoxComponent
                    id="noSocial"
                    type="regNum"
                    label={labels.noSocial}
                    disabled
                    value={mainTabData.item?.noSocial}
                    onKeyDown={submitMainTabData}
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
                    onKeyDown={submitMainTabData}
                  />
                </Col>
                <Col xs md="6">
                  <TextBoxComponent
                    id="rankNo"
                    label={labels.rankNo}
                    disabled
                    value={mainTabData.item?.ankNo}
                    onKeyDown={submitMainTabData}
                  />
                </Col>
                <Col xs md="6">
                  <TextBoxComponent
                    id="cdOffduty"
                    label={labels.cdOffduty}
                    value={mainTabData.item?.cdOffduty}
                    onKeyDown={submitMainTabData}
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
                    onKeyDown={submitMainTabData}
                  />
                </Col>
                <Col xs md="6">
                  <TextBoxComponent
                    id="daRetire"
                    label={labels.daRetire}
                    disabled
                    value={mainTabData.item?.daRetire}
                    onKeyDown={submitMainTabData}
                  />
                </Col>
              </Row>
              {/* 우측 서브탭 */}
              <MenuTab menuList={subTabMenuList} />
              {/* 우측 서브 그리드 */}
              <TableTemp
                showCheckbox
                showHeaderArrow
                rowAddable
                tableHeaders={HrManagementSubTableHeaders}
                tableData={subTableData}
                pkValue={leftTablePkValue}
                selectedRows={selectedRows}
                actions={{
                  setTableData: actions.setSubTableData,
                  setEditedRow: actions.setEditedEmpFam,
                  setSelectedRows: actions.setSelectedRows,
                  getRowObject: EmpFam,
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

export default HrManagement;
