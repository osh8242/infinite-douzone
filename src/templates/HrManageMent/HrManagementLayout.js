// 작성자 : 오승환
import axios from "axios";
import { useCallback, useRef } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import CodeHelperModal from "../../components/CodeHelperModal";
import FormPanel from "../../components/FormPanel";
import MenuTab from "../../components/MenuTab";
import ModalComponent from "../../components/ModalComponent";
import ProfileImageForm from "../../components/ProfileImageForm";
import TableTest from "../../components/TableTest";
import {
  CODE_HELPER_DATA,
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
import { MAIN_TAB } from "./MainTab/HrMainTabConstant";
import HrSearchPanel from "./SearchPanel/HrSearchPanel";
import TextBoxComponent from "../../components/TextBoxComponent";

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data

const HrManagementLayout = () => {
  //Model로 관리되는 값들
  const { state, actions } = HrManagementModel();
  const {
    jobOkSelectRef,
    orderSelectRef,
    leftTableData,
    leftCodeHelperTableData,
    leftTablePkValue,
    leftStaticsTableData,
    mainTabData,
    empImageSrc,
    subTableData,
    selectedRows,

    modalState,
    codeHelperTableData,
  } = state;

  //코드도움 아이콘 클릭이벤트
  const modalShow = useCallback(
    async (type, data, setRowData) => {
      actions.setModalState({ ...modalState, show: true });

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
    [modalState, leftCodeHelperTableData]
  );

  const tokenRef = useRef(null);
  const getToken = () => {
    axios
      .get("http://localhost:8888/jwt/getToken?username=hong")
      .then((response) => {
        const token = response.headers["authorization"];
        console.log("리스폰스 헤더", response.headers);
        console.log("발급받은 토큰", token);
        tokenRef.current = token;
        validateToken();
      })
      .catch((e) => {
        console.log("겟토큰 에러", e);
      });
  };
  const validateToken = () => {
    axios
      .get("http://localhost:8888/jwt/validateToken", {
        headers: { Authorization: tokenRef.current },
      })
      .then((response) => {
        console.log("응답", response.data);
      })
      .catch((e) => {
        console.log("토큰인증 에러", e);
      });
  };

  return (
    <>
      <HrManagementHeader
        deleteButtonHandler={actions.deleteSelectedRows}
        existSelectedRows={selectedRows.length !== 0}
      />
      <button
        onClick={() => {
          getToken();
        }}
      >
        JWT 토큰 발급받고 인증해보기
      </button>

      <Container>
        {/* 조회영역 */}
        <HrSearchPanel
          onSearch={actions.onSearch}
          jobOkSelectRef={jobOkSelectRef}
          orderSelectRef={orderSelectRef}
          searchOption={searchOption}
          orderList={orderList}
        />
        {/* 메인영역 */}
        <Row>
          {/* 좌측 영역 */}
          <Col md="3">
            {/* 좌측 그리드 */}
            <Row>
              <div className="hr-leftTable">
                <TableTest
                  tableName="EMP"
                  //showCheckbox
                  sortable
                  rowAddable
                  showCheckbox
                  tableHeaders={leftTableConstant.headers}
                  tableData={leftTableData}
                  selectedRows={selectedRows}
                  codeHelper
                  defaultSelectedRow
                  defaultFocus
                  actions={{
                    setTableData: actions.setLeftTableData,
                    newRowCodeHelper: () =>
                      modalShow(
                        "leftTable",
                        CODE_HELPER_DATA.leftTableCodeHelper,
                        actions.registEmpAdd
                      ),
                    setPkValue: actions.setLeftTablePkValue,
                    insertNewRow: (row) => {
                      actions.insertEmp(row);
                      actions.setLeftTablePkValue({ cdEmp: row.cdEmp });
                    },
                    updateEditedRow: actions.updateEmp,
                    setSelectedRows: actions.setSelectedRows,
                    deleteRow: actions.deleteRow,
                    getRowObject: Emp,
                  }}
                />
              </div>
            </Row>
            {/* 통계 테이블 */}
            <Row className="mt-3">
              <TableTest
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
              <MenuTab menuList={tabConstant.mainTabMenuList}>
                {[
                  <Row className="mb-5 justify-content-center" key={"mainTab1"}>
                    <Col
                      className="d-flex align-items-center justify-content-center"
                      xs
                      md="3"
                    >
                      <ProfileImageForm
                        src={empImageSrc}
                        handleUpload={actions.updateEmpPhoto}
                        handleDelete={actions.deleteEmpPhoto}
                      />
                    </Col>
                    <Col xs md="9">
                      <FormPanel
                        INPUT_CONSTANT={MAIN_TAB.primaryTabInputs}
                        formData={mainTabData}
                        submitData={actions.submitMainTabData}
                        columnNumber={2}
                        codeHelperFn={{
                          cdOffduty: () =>
                            modalShow(
                              "default",
                              CODE_HELPER_DATA.cdOffduty,
                              actions.submitMainTabData
                            ),
                        }}
                      />
                    </Col>
                  </Row>,
                  <Row className="mb-5 justify-content-center" key={"mainTab2"}>
                    <Col xs>
                      <FormPanel
                        INPUT_CONSTANT={MAIN_TAB.secondaryTabInputs}
                        formData={mainTabData}
                        submitData={actions.submitMainTabData}
                        columnNumber={3}
                      />
                    </Col>
                  </Row>,
                ]}
              </MenuTab>

              {/* 우측 서브탭 */}
              <MenuTab menuList={tabConstant.subTabMenuList} />
              {/* 우측 서브 그리드 */}
              <div className="hr-subTable">
                <TableTest
                  tableName="EMPFAM"
                  rowAddable
                  sortable
                  tableHeaders={subTableConstant.headers}
                  tableData={subTableData}
                  codeHelper={CODE_HELPER_DATA}
                  pkValue={leftTablePkValue}
                  selectedRows={selectedRows}
                  actions={{
                    setTableData: actions.setSubTableData,
                    setSelectedRows: actions.setSelectedRows,
                    insertNewRow: actions.insertEmpFam,
                    updateEditedRow: actions.updateEmpFam,
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
      <ModalComponent
        title={modalState.title}
        size={modalState.size}
        show={modalState.show}
        onHide={() => actions.setModalState({ show: false })}
      >
        <CodeHelperModal
          codeHelperTableData={modalState.tableData}
          onHide={() => actions.setModalState({ show: false })}
        />
      </ModalComponent>
    </>
  );
};

export default HrManagementLayout;
