// 작성자 : 오승환
import { useMemo, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import DateTest from "../../components/DateTest";
import MenuTab from "../../components/MenuTab";
import RadioForm from "../../components/RadioForm";
import SearchPanel from "../../components/SearchPanel";
import SelectForm from "../../components/SelectForm";
import TableForm from "../../components/TableForm";
import TextBoxComponent from "../../components/TextBoxComponent";
import CommonConstant from "../../model/CommonConstant";
import HrManagementConstant from "../../model/HrManagement/HrManagementConstant";
import HrManagementModel from "../../model/HrManagement/HrManagementModel";
import "../../styles/HrManagement/HrManagementLayout.scss";
import Emp from "../../vo/HrManagement/Emp";
import EmpFam from "../../vo/HrManagement/EmpFam";
import HrManagementHeader from "./HrManagementHeader";
import ProfileImageForm from "../../components/ProfileImageForm";

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data

const HrManagementLayout = () => {
  //실행중에는 값이 고정인 값들
  const {
    searchOption, // 검색옵션 리스트
    orderList, // 정렬기준 리스트
    genderRadioList, //성별
    marryRadioList, //결혼여부
    contractRadioList, //근로계약서 작성여부
    labels, // 속성명
  } = CommonConstant();

  const {
    leftTableConstant,
    leftStaticsTableConstant,
    subTableConstant,
    tabConstant,
  } = HrManagementConstant();

  //Model로 관리되는 값들
  const { state, actions } = HrManagementModel();
  const {
    leftTableData,
    leftTablePkValue,
    mainTabData,
    empImageSrc,
    subTableData,
    selectedRows,
  } = state;

  //검색조건 : 재직구분, 정렬기준
  const jobOkRef = useRef();
  const orderRef = useRef();

  //사원 테이블 재직 통계 계산
  const leftStaticsTableData = useMemo(() => {
    let jobOkY = 0;
    let jobOkN = 0;
    leftTableData.forEach((row) => {
      if (row.item["jobOk"] === "Y") jobOkY++;
      else jobOkN++;
    });
    return [
      {
        item: {
          jobOkY: jobOkY,
          jobOkN: jobOkN,
          jobOkSum: jobOkY + jobOkN,
        },
      },
    ];
  }, [leftTableData]);

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
              <Row className="mb-5" ref={mainTabRef}>
                <Row>
                  <Col xs md="3">
                    <ProfileImageForm src={empImageSrc} />
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
                  tableHeaders={subTableConstant.headers}
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
