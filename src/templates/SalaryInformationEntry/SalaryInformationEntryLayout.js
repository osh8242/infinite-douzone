// 작성자 : 현소현
import React, { useCallback, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import "../../styles/SalaryInformationEntry/SalaryInformationEntryLayout.scss";
import { fetchData } from "../../utils/codeHelperUtils";
import SalaryInformationEntryModel from "../../model/SalaryInformationEntry/SalaryInformationEntryModel";
import ModalComponent from "../../components/ModalComponent";
import CodeHelperModal from "../../components/CodeHelperModal";

import SalaryInformationEntryHeader from "./SalaryInformationEntryHeader";
import SiSeacrchPanel from "./searchPenel/SiSeacrchPanel";

import EmpList from "./mainTab/EmpList";
import SalaryAllowPayList from "./mainTab/SalaryAllowPayList";
import SalaryDeductPayList from "./mainTab/SalaryDeductPayList";
import SelctDivisionList from "./mainTab/SelctDivisionList";
import SalaryAllowPayListWithCalculation from "./mainTab/SalaryAllowPayListWithCalculation";
import SalaryDeductPayListWithCalculation from "./mainTab/SalaryDeductPayListWithCalculation";

import CalculationInsert from "./modalMenu/CalculationInsert";
import ReCalculation from "./modalMenu/ReCalculation";
import InsertSalaryDataLayout from "./modalMenu/InsertSalaryDataLayout";
import AddSalAllowPay from "./modalMenu/AddSalAllowPay";

import RigtSideLayout from "./RightSideTab/RigtSideLayout";

const SalaryInformationEntryLayout = () => {

  //Model 관리되는 값
  const { state, actions } = SalaryInformationEntryModel();
  const [isRightTabVisible, setIsRightTabVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [modalType, setModalType] = useState("");
  
  const toggleRightTabVisibility = () => {
    setIsRightTabVisible(!isRightTabVisible);
  };

  // 코드도움 아이콘 클릭이벤트
  const modalShow = useCallback(async (type, data, setRowData) => {
    actions.setModalState({ ...state.modalState, show: true });
    setModalType(type);

    switch (type) {
      case "codeHelper":
      let codeDataList = data.tableData;

        if (data.url) {
          codeDataList = await fetchData(data.url, data.params);
        }

        actions.setModalState((prevState) => ({
          ...prevState,
          subject: data.subject,
        }));

        actions.setCodeHelperTableData(() => ({
          setRowData: setRowData,
          tableHeaders: data.headers,
          tableData: codeDataList,
          usePk: data.usePk ? data.usePk : "",
          searchField: data.searchField,
        }));
        break;

      case 'addSalAllowPay' :   
      actions.setModalState((prevState) => ({  
          ...prevState,   
          onConfirm : actions.addAllowPay,
          size : data.size,
          subject: data.subject
        }));
        break;

      default: 
        actions.setModalState((prevState) => ({ 
          ...prevState, 
          size : data.size,
          subject: data.subject
        }))
        break;
    }
  }, []);

  /* 급여 항목/ 공제항목 산출식 버튼 */
  const showCalculation = (type) => {
    switch (type) {
      case 'salaryAllowPay':
        setSelectedComponent('SalaryAllowPayCalculation');
        break;
      case 'salaryDeductPay':
        setSelectedComponent('SalaryDeductPayCalculation');
        break;
      default:
        setSelectedComponent(null);
        break;
    }
  };

  return (
    <>
      <ModalComponent
        title={state.modalState.subject}
        size={state.modalState.size}
        show={state.modalState.show}
        onHide={() => actions.setModalState({ show: false })}
        onConfirm={state.modalState.onConfirm}
      >
          {modalType === 'codeHelper'?
            <CodeHelperModal
              setRowData={state.codeHelperTableData.setRowData}
              usePk={state.codeHelperTableData.usePk}
              tableHeaders = {state.codeHelperTableData.tableHeaders}
              tableData={state.codeHelperTableData.tableData}
              subject={state.codeHelperTableData.subject}
              searchField={state.codeHelperTableData.searchField}
              onHide={() => actions.setModalState({show: false})}
            />
          : modalType === 'insertSalaryData'?
              <InsertSalaryDataLayout
                actions = {actions}
                showCalculation = {showCalculation}
              />
          : modalType === 'reCalculation'?
              <ReCalculation
                data = {state.modalContentData.data}
              />
          : modalType === 'calculationInsert'?
              <CalculationInsert
                insertSalaryTableData = {state.modalContentData.tableData}
                actions = {actions}
              />
          : modalType === 'addSalAllowPay'?
              <AddSalAllowPay
                actions = {actions}
              />
          : modalType === 'alert'?
              <Alert
                actions = {actions}
                message = {state.modalContentData.message}
              />
          : //default
            <></>
          }
      </ModalComponent>

      <SalaryInformationEntryHeader
        deleteButtonHandler={actions.deleteSelectedRows}
        existSelectedRows={state.selectedRows.length !== 0}
        actions={actions}
        modalShow={modalShow}
      />
      <Container fluid>
        <Row style={{margin:'10px'}}>
          <Col>
            {/* 조회영역 */}
            <SiSeacrchPanel
              onSearch = {actions.onSearch}
              modalShow = {modalShow}
              actions = {actions}
              state = {state}
            />
            {/* 메인영역 */}
              <Row>
                <Col md={3}>
                  <EmpList actions={actions} saInfoListData={state.saInfoListData} />
                </Col>
                    {selectedComponent === 'SalaryAllowPayCalculation' && (
                      <>
                        <Col>
                          <SalaryAllowPayListWithCalculation 
                            actions={actions} 
                            salAllowData={state.salAllowData} 
                            modalShow = {modalShow} 
                            showCalculation = {showCalculation}
                          />
                        </Col>
                      </>
                    )}
                    {selectedComponent === 'SalaryDeductPayCalculation' && (
                      <>
                        <Col>
                          <SalaryDeductPayListWithCalculation 
                            actions={actions} 
                            deductData={state.deductData} 
                            salAllowData={state.salAllowData}
                            modalShow = {modalShow} 
                            showCalculation = {showCalculation}
                          />
                        </Col>
                      </>
                    )}
                    {selectedComponent === null && (
                      <>
                        <Col md={3}>
                          <SalaryAllowPayList actions={actions} salAllowData={state.salAllowData} showCalculation = {showCalculation} modalShow={modalShow}/>
                        </Col>
                        <Col md={3}>
                          <SalaryDeductPayList actions={actions} salDeductData={state.deductData} showCalculation = {showCalculation}/>
                        </Col>
                        <Col className="selectDivision">
                          <SelctDivisionList actions={actions} state={state} />
                        </Col>
                      </>
                    )}
              </Row>
          </Col>

         {isRightTabVisible ? (
          <Col md="3" className={`transition ${isRightTabVisible ? "visible" : "hidden"}`}>
            <div style={{display : 'flex'}} >
              <div className="rightside-custom-width">
                <div onClick={toggleRightTabVisibility} className="rightside-icon-wrapper">
                  <div id="fakeFaArrowRight"></div>
                  <div id="fakeFaArrowRight-content">▶</div>
                </div>
              </div>
              <div>
                <RigtSideLayout actions={actions} state={state}/>
            </div>
            </div>
          </Col>
           ):( 
            <Col xs={1} className="rightside-custom-width">
              <div onClick={toggleRightTabVisibility} className="rightside-icon-wrapper">
                <div id="fakeFaArrowLeft"></div>
                <div id="fakeFaArrowLeft-content">◀</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SalaryInformationEntryLayout;