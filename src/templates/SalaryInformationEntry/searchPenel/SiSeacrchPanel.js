import React, { useEffect, useState } from 'react';
import SearchPanel from '../../../components/SearchPanel';

import { SI_MAIN_SEARCHFIELD, SI_SUB_SEARCHFIELD } from "./SiSearchPenelConstant";
import { codeHelperData_cdDept, codeHelperData_emplist, codeHelperData_occup, codeHelperData_paymentDate, codeHelperData_rankNo, forLaborOption, salaryDivisionOption, unitOption } from '../../../model/SalaryInformationEntry/SalConstant';
import FormPanel from '../../../components/FormPanel';
import ConfirmComponent from '../../../components/ConfirmComponent';

const SiSeacrchPanel = (props) => {
    const {
        onSearch,
        modalShow,
        state,
        actions,
        setCopyLastMonthData
    } = props;

    const [formPanelData, setFormPanelData] = useState();
    const [showModal,setShowModal] = useState({show:false});

    useEffect(()=>{
      setFormPanelData(
        { item: { allowMonth: state.searchVo.allowMonth, salDivision: state.searchVo.salDivision,paymentDate : state.searchVo.paymentDate  }},
      )
    },[state.searchVo]);

    
    const selectOptionHandler = (value) => {
      // set data
      actions.setSalDivision(value); 

      // 전월데이터 복사 모달
      let message = "전월데이터를 복사하시겠습니까?"
      setShowModal({show: true, message : message});      
    }

    return (
        <div>
          <ConfirmComponent
            show={showModal.show}
            message={showModal.message}
            onHide={() => {     // 취소
              setShowModal(false);
            }}
            onConfirm={() => {  // 확인
              setCopyLastMonthData();
              setShowModal(false);
            }}
          />

          {/* 기본 검색조건 */}
          <SearchPanel onSearch={()=> onSearch()} showAccordion>
            <FormPanel
              INPUT_CONSTANT = {SI_MAIN_SEARCHFIELD}
              formData={formPanelData}
              codeHelperFn = {{paymentDate : () => modalShow('codeHelper', codeHelperData_paymentDate, actions.setPaymentDate)}}
              onChange={{
                allowMonth: (newValue)=> actions.setAllowMonth(newValue),
                salDivision: (newValue) => selectOptionHandler(newValue),
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
                searchCdEmp: () => modalShow('codeHelper', codeHelperData_emplist, actions.setSearchCdEmp),
                searchCdDept: () => modalShow('codeHelper', codeHelperData_cdDept, actions.setSearchCdDept),
                searchRankNo: () => modalShow('codeHelper', codeHelperData_rankNo, actions.setSearchRankNo),
                searchCdOccup: () => modalShow('codeHelper', codeHelperData_occup, actions.setSearchCdOccup)
              }}
            /> 
          </div> 
        </SearchPanel>
        </div>
    );
};

export default SiSeacrchPanel;