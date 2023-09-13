import React from 'react';
import { Col, Row } from 'react-bootstrap';
import SelectForm from '../../../components/SelectForm';
import TextBoxComponent from '../../../components/TextBoxComponent';
import SearchPanel from '../../../components/SearchPanel';

import { SI_MAIN_SEARCHFIELD, SI_SUB_SEARCHFIELD } from "./SiSearchPenelConstant";
import { codeHelperData_cdDept, codeHelperData_emplist, codeHelperData_occup, codeHelperData_paymentDate, codeHelperData_rankNo, forLaborOption, salaryDivisionOption, unitOption } from '../../../model/SalaryInformationEntry/SalConstant';
import FormPanel from '../../../components/FormPanel';
import { INPUT_TYPE, LABELS } from '../../../model/CommonConstant';

const SiSeacrchPanel = (props) => {
    const {
        onSearch,
        modalShow,
        state,
        actions
    } = props;
    
    
    return (
        <div>
          {/* 기본 검색조건 */}
          <SearchPanel onSearch={onSearch} showAccordion>
            <FormPanel
              INPUT_CONSTANT = {SI_MAIN_SEARCHFIELD}
            /> 
            
          {/* <Row>
            <Col>
              <TextBoxComponent
                name='allowYear'
                type='month'
                label={"귀속연월"}
                value={state.searchVO.allowMonth}
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
                onChange={(e, value) => actions.setPaymentDate(value)}
                onClickCodeHelper={() => modalShow('default', codeHelperData_paymentDate, actions.setPaymentDate)}
              />
            </Col>
          </Row> */}

          {/* 상세 검색조건 */}
           <div>
           <FormPanel
              INPUT_CONSTANT = {SI_SUB_SEARCHFIELD}
            /> 
            {/* <Row>
              <Col>
                <TextBoxComponent
                  name="searchEmpCd"
                  label={"사원코드"} 
                  value={state.searchVO.searchCdEmp}
                  onEnter={actions.setSearchCdEmp}
                  onClickCodeHelper={() => modalShow('default', codeHelperData_emplist, actions.setSearchCdEmp)}
                  //onChange={(e,value)=>actions.setSearchCdEmp(value)}
                />
              </Col>
              <Col>
                <TextBoxComponent
                  name="searchCdDept"
                  label={"부서코드"}
                  value={state.searchVO.searchCdDept}
                  onEnter={actions.setSearchCdDept}
                  onClickCodeHelper={() => modalShow('default', codeHelperData_cdDept, actions.setSearchCdDept)}  
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
                  onClickCodeHelper={() => modalShow('default', codeHelperData_rankNo, actions.setSearchRankNo)}
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
            </Row> */}
          </div> 
        </SearchPanel>
        </div>
    );
};

export default SiSeacrchPanel;