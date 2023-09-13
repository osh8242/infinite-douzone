import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
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

    const [formPanelData, setFormPanelData] =useState();
    
    useEffect(()=>{
      setFormPanelData(
        { item: { allowMonth: state.searchVo.allowMonth, salDivision: state.searchVo.salDivision,paymentDate : state.searchVo.paymentDate  }},
      )
    },[state.searchVo]);

    return (
        <div>
          {/* 기본 검색조건 */}
          <SearchPanel onSearch={onSearch} showAccordion>
            <FormPanel
              INPUT_CONSTANT = {SI_MAIN_SEARCHFIELD}
              formData={formPanelData}
              codeHelperFn = {{paymentDate : () => modalShow('default', codeHelperData_paymentDate, actions.setPaymentDate)}}
              onChange={{
                allowMonth: (newValue)=> actions.setAllowMonth(newValue),
                salDivision: (newValue)=> actions.setSalDivision(newValue),
                paymentDate: (newValue)=> actions.setPaymentDate(newValue)
              }}
              columnNumber={3}
            /> 
          {/* 상세 검색조건 */}
           <div>
           <FormPanel
              INPUT_CONSTANT = {SI_SUB_SEARCHFIELD}
              formData={
                { item: { searchCdEmp: state.searchVo.searchCdEmp, searchCdDept: state.searchVo.searchCdDept, searchRankNo : state.searchVo.searchRankNo,searchCdOccup : state.searchVo.searchCdOccup }}
              }
              codeHelperFn={{
                searchCdEmp: () => modalShow('default', codeHelperData_emplist, actions.setSearchCdEmp),
                searchCdDept: () => modalShow('default', codeHelperData_cdDept, actions.setSearchCdDept),
                searchRankNo: () => modalShow('default', codeHelperData_rankNo, actions.setSearchRankNo),
                searchCdOccup: () => modalShow('default', codeHelperData_occup, actions.setSearchCdOccup)
              }}
            /> 
          </div> 
        </SearchPanel>
        </div>
    );
};

export default SiSeacrchPanel;