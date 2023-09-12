// 작성자 : 현소현
import React, { useCallback, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import SearchPanel from "../../components/SearchPanel";
import SelectForm from "../../components/SelectForm";
import TableForm from "../../components/TableForm";
import TextBoxComponent from "../../components/TextBoxComponent";
import CommonConstant from "../../model/CommonConstant";
import { codeHelperData_cdDept, codeHelperData_emplist, codeHelperData_occup, codeHelperData_paymentDate, codeHelperData_rankNo, forLaborOption, salAllow, salAllowSum, salDeduct, salDeductSum, salEmp, salaryDivisionOption, totalSalaryByPeriodOption, unitOption } from "../../model/SalaryInformationEntry/SalConstant";
import SalaryInformationEntryModel from "../../model/SalaryInformationEntry/SalaryInformationEntryModel";
import SalaryInformationEntryHeader from "./SalaryInformationEntryHeader";
import { fetchData } from "../../utils/codeHelperUtils";
import ModalComponent from "../../components/ModalComponent";
import CodeHelperModal from "../../components/CodeHelperModal";
import InsertSalaryData from "./InsertSalaryData";

const SalaryInformationEntryLayout = ({}) => {
  //상수
  const { labels } = CommonConstant();

  //Model 관리되는 값
  const { state, actions } = SalaryInformationEntryModel();
  
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [modalType , setModalType] = useState('');
  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  // 코드도움 아이콘 클릭이벤트
  const modalShow = useCallback(async (type, data, setRowData) => {
    actions.setModalState({...state.modalState, show:true});
    setModalType(type);
    switch(type){
      case 'default' :  
      let codeDataList = data.tableData;
      if (data.url) {
        codeDataList = await fetchData(data.url, data.params);
      }
  
      actions.setCodeHelperTableData(() => ({
        subject: data.subject,
        setRowData: setRowData,
        tableHeaders: data.headers,
        tableData: codeDataList,
        usePk: data.usePk ? data.usePk : '',
        searchField: data.searchField,
      }));
      break;
      case 'insert' : //수당
        actions.setCodeHelperTableData(()=>({
          data : data
        }));
      break;
      case 'col' : //계산기
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
      <SalaryInformationEntryHeader 
        deleteButtonHandler={actions.deleteSelectedRows} 
        modalShow={modalShow}           
      />
      <Container>
        
        <ModalComponent
          size={state.modalState.size}       
          show={state.modalState.show}
          onHide={()=>actions.setModalState({show:false})}
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
            /> :
         modalType === 'insert'?
            <InsertSalaryData data = {state.codeHelperTableData.data}/>
         : 
         <></>
        
        }
       
        </ModalComponent>

        {/* 기본 검색조건 */}
        <SearchPanel onSearch={onSearch} showAccordion>
          <Row>
            <Col>
              <TextBoxComponent
                type='month'
                label={"귀속연월"}
                value={state.searchVO.allowMonth}
                onChange={(e, value) => actions.setAllowMonth(value)}
              />
            </Col>
            <Col>
              <SelectForm
                label={"구분"}
                optionList={salaryDivisionOption}
                onChange={actions.setSalDivision}
              />
            </Col>
            <Col>
              <TextBoxComponent
                type="date"
                name="paymentDate"
                label={"지급일"}
                value={state.searchVO.paymentDate}
                onChange={actions.setPaymentDate}
                onClickCodeHelper={() => modalShow('default',codeHelperData_paymentDate, actions.setPaymentDate)}
              />
            </Col>
          </Row>

          {/* 상세 검색조건 */}
          <div>
            <Row>
              <Col>
                <TextBoxComponent
                  name="searchEmpCd"
                  label={"사원코드"} 
                  value={state.searchVO.searchCdEmp}
                  onEnter={actions.setSearchCdEmp}
                  onClickCodeHelper={() => modalShow('default',codeHelperData_emplist, actions.setSearchCdEmp)}
                  //onChange={(e,value)=>actions.setSearchCdEmp(value)}
                />
              </Col>
              <Col>
                <TextBoxComponent
                  name="searchCdDept"
                  label={"부서코드"}
                  value={state.searchVO.searchCdDept}
                  onEnter={actions.setSearchCdDept}
                  onClickCodeHelper={() => modalShow('default',codeHelperData_cdDept, actions.setSearchCdDept)}  
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextBoxComponent
                  name="searchRankNo"
                  label={"직급코드"}
                  value={state.searchVO.searchRankNo}
                  onEnter={actions.setSearchRankNo}
                  onClickCodeHelper={() => modalShow('default',codeHelperData_rankNo, actions.setSearchRankNo)}
                />
              </Col>
              <Col>
                <TextBoxComponent
                  name="searchCdOccup"
                  label={"직책코드"}
                  value={state.searchVO.searchCdOccup}
                  onEnter={actions.setSearchCdOccup}
                  onClickCodeHelper={() => modalShow(codeHelperData_occup, actions.setSearchCdOccup)}
                />
              </Col>
            </Row>

            {/* <Row>
              <Col>
                <TextBoxComponent 
                  name="searchCdField"  
                  label={"현장코드"}  
                  value={state.searchVO.searchCdField}
                  onChange={actions.setSearchCdField}
                  codeHelper/>
              </Col>
              <Col>
                <TextBoxComponent 
                  name="searchCdProject"  
                  label={"프로젝트코드"}  
                  value={state.searchVO.searchCdField}
                  onChange={actions.setSearchCdProject}
                  codeHelper/>
              </Col>
            </Row> */}

            <Row>
              <Col>
                <SelectForm
                  label={"생산직여부"}
                  optionList={unitOption}
                />
              </Col>
              <Col>
                <SelectForm
                  label={"국외근로여부"}
                  optionList={forLaborOption}
                />
              </Col>
            </Row>
          </div>
        </SearchPanel>

        <Row>
          <Col >
            {/* 사원정보 table영역 */}
            <TableForm
              readOnly
              //tableName={"사원정보 테이블"}
              showCheckbox={true}
              showHeaderArrow={true}
              tableHeaders={salEmp.headers}
              tableData={state.saInfoListData}
              actions={{
                setTableData: actions.setSaInfoListData,
                setPkValue: actions.setChangeCdEmp,
              }}
            />
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
