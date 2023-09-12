// 작성자 : 현소현
import React, { useCallback, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import SearchPanel from "../../components/SearchPanel";
import SelectForm from "../../components/SelectForm";
import TableForm from "../../components/TableForm";
import TextBoxComponent from "../../components/TextBoxComponent";
import { codeHelperData_cdDept, codeHelperData_emplist, codeHelperData_occup, codeHelperData_paymentDate, codeHelperData_rankNo, forLaborOption, salAllow, salAllowSum, salDeduct, salDeductSum, salEmp, salaryDivisionOption, totalSalaryByPeriodOption, unitOption } from "../../model/SalaryInformationEntry/SalConstant";
import SalaryInformationEntryModel from "../../model/SalaryInformationEntry/SalaryInformationEntryModel";
import SalaryInformationEntryHeader from "./SalaryInformationEntryHeader";
import { fetchData } from "../../utils/codeHelperUtils";
import ModalComponent from "../../components/ModalComponent";
import CodeHelperModal from "../../components/CodeHelperModal";
import InsertSalaryData from "./InsertSalaryData";
import ReCalculation from "./ReCalculation";
import {labels} from "../../model/CommonConstant"
import SiSeacrchPanel from "./searchPenel/SiSeacrchPanel";

const SalaryInformationEntryLayout = () => {
  //Model 관리되는 값
  const { state, actions } = SalaryInformationEntryModel();
  
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [modalType , setModalType] = useState('');
  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  // 코드도움 아이콘 클릭이벤트
  const modalShow = useCallback(async (type, data, setRowData) => {

    actions.setModalState({...state.modalState, show : true});
    setModalType(type);
    
    switch(type){
      case 'default' :  
        let codeDataList = data.tableData;

        if (data.url) {
          codeDataList = await fetchData(data.url, data.params);
        }
        
        actions.setModalState((prevState) => ({ 
          ...prevState,
          subject: data.subject
        }));

        actions.setCodeHelperTableData(() => ({
          // subject: data.subject,
          setRowData: setRowData,
          tableHeaders: data.headers,
          tableData: codeDataList,
          usePk: data.usePk ? data.usePk : '',
          searchField: data.searchField,
        }));
        break;

      case 'insertSalaryData' : // 수당/공제 등록
        
        actions.setModalState((prevState) => ({ 
          ...prevState, 
          size : 'xl',
          subject: data.subject
        }))

        actions.setModalContentData(()=>({
          data : data.reCalculationList
        }));

        break;

      case 'reCalculation' : // 재계산

       actions.setModalState((prevState) => ({ 
          ...prevState
          , subject: '재계산'
          , onConfirm : alert("안뇽~")
        }))

        actions.setModalContentData(()=>({
          data : data.list
        }));  

        break;
      
      default : break;
    } 
  }, []);

  //조회버튼
  const onSearch = () => {
    console.log("검색버튼");
  };

  return (
    <>
      <ModalComponent
        title={state.modalState.subject}
        size={state.modalState.size}       
        show={state.modalState.show}
        onHide={()=>actions.setModalState({show:false})}
        onConfirm = {state.modalState.onConfirm}
      >
      {modalType === 'default'?
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
          <InsertSalaryData 
            data = {state.modalContentData.data}
          />

      : modalType === 'reCalculation'?
          <ReCalculation
            data = {state.modalContentData.data}
          />

      : //default
        <></>
      
      }
      </ModalComponent>

      <SalaryInformationEntryHeader 
        deleteButtonHandler={actions.deleteSelectedRows} 
        modalShow={modalShow}           
      />
      <Container>
        {/* 조회영역 */}
        <SiSeacrchPanel
          onSearch = {onSearch}
          modalShow={modalShow}
          actions = {actions}
          state = {state}
        />

        {/* 메인영역 */}
        <Row>
          {/* 사원리스트 영역 */}
          <Col>
            <Row>
              <div>
                <TableForm
                  tableName="SI_EMPLIST"
                  readOnly
                  showCheckbox
                  showHeaderArrow
                  tableHeaders={salEmp.headers}
                  tableData={state.saInfoListData}
                  actions={{
                    setTableData: actions.setSaInfoListData,
                    setPkValue: actions.setChangeCdEmp,
                  }}
                />
              </div>
            </Row>
          </Col>
          <Col >
            <>
            {/* 급여항목 table영역 */}
             <TableForm
              //tableName={"급여항목 테이블"}
              tableHeaders={salAllow.headers}
              tableData={state.salAllowData.salData}
              rowAddable
              tableFooter={(
                <>
                  <tr>
                    <td>과세</td> 
                    <td>{state.salAllowData.sumData.taxYSum}</td>
                  </tr>
                  <tr>
                    <td>비과세</td>
                    <td>{state.salAllowData.sumData.taxNSum}</td>
                  </tr>
                  <tr>
                    <td>총합계</td>
                    <td>{state.salAllowData.sumData.sum}</td>
                  </tr>
                </>
                )}
              actions={{
                setTableData: actions.setSalData,
                setEditedRow: actions.setEditedAllow
              }              
            }
            /> 
           
            </>
          </Col>
          <Col >
            {/* 공제항목 table영역 */}
            <>
            <TableForm
              //tableName={"공제항목 테이블"}
              readOnly
              tableHeaders={salDeduct.headers}
              tableData={state.deductData.deductData}
              actions={{}}
              tableFooter={(
                <>
                  <tr>
                    <td>공제액 계</td> 
                    <td>{state.deductData.sumData.sum}</td>
                  </tr>
                  <tr>
                    <td>차인지급액</td>
                    <td>{state.salAllowData.sumData.sum}</td>
                  </tr>
                </>
                )}
            />
            </>
          </Col>
          <Col>
            {/* 조회구분 영역*/}
            <SelectForm
              label={labels.inquiryYype}
              optionList={totalSalaryByPeriodOption}
              onChange={actions.setSelectedOption}
            />
            <Row>
              <TableForm
                showCheckbox={false}
                showHeaderArrow={false}
                tableHeaders={salAllowSum.headers}
                tableData={state.salPaySumData.allowPay}
                actions={{}}
                readOnly
              />
            </Row>
            <Row>
              <TableForm 
                tableHeaders={salDeductSum.headers}
                tableData={state.salPaySumData.deductPay}
                actions={{}}
                readOnly
              />
            </Row>
          </Col>
          
          {isCardVisible ? (
          <Col md="3">
            {/* 사원 상세정보 영역 */}
            <div>
              <Card style={{fontSize:'8px'}}>
                <Card.Header as="h5">사원정보</Card.Header>
                <Card.Body>
                  {state.saInfoDetailData ? (
                    <>
                      <TextBoxComponent
                        label={labels.daEnter}
                        value={state.saInfoDetailData.daEnter}
                      />
                      <TextBoxComponent
                        label="배우자공제"
                        value={state.saInfoDetailData.ynMateDed}
                      />
                      <TextBoxComponent
                        label="20세/60세/다자녀"
                        value={
                          state.saInfoDetailData.num20Family +
                          "/" +
                          state.saInfoDetailData.num60Family +
                          "/" +
                          state.saInfoDetailData.numManyFamily
                        }
                      />
                      <TextBoxComponent label="조정율" value="구현중" />
                      <TextBoxComponent
                        label="거주구분"
                        value={state.saInfoDetailData.ynResident}
                      />
                      <TextBoxComponent
                        label="생산/국외"
                        value={
                          state.saInfoDetailData.ynUnit +
                          "/" +
                          state.saInfoDetailData.ynForLabor
                        }
                      />
                      <TextBoxComponent
                        label="연장근로비과세"
                        value={state.saInfoDetailData.ynOverwork}
                      />
                      <TextBoxComponent
                        label="퇴사일"
                        value={state.saInfoDetailData.daRetire}
                      />
                      <TextBoxComponent
                        label={labels.cdOccup}
                        value={state.saInfoDetailData.cdOccup}
                      />
                      <TextBoxComponent
                        label={labels.cdDept}
                        value={state.saInfoDetailData.cdDept}
                      />
                      <TextBoxComponent
                        label={labels.cdField}
                        value={state.saInfoDetailData.cdField}
                      />
                      <TextBoxComponent
                        label={labels.cdProject}
                        value={state.saInfoDetailData.cdProject}
                      />
                      <TextBoxComponent
                        label="주민(외국인)번호"
                        value={state.saInfoDetailData.noSocial}
                      />
                    </>
                  ) : (
                    <Spinner animation="border" variant="primary" />
                  )}
                </Card.Body>
              </Card>
              <Button onClick={toggleCardVisibility}>
                {isCardVisible ? '>' : '<'}
              </Button>
            </div>
          </Col>
          ):(
            <Col xs="1">
              <div>
                <Button onClick={toggleCardVisibility}>
                  {isCardVisible ? '>' : '<'}
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SalaryInformationEntryLayout;
