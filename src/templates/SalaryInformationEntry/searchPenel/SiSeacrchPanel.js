import React, { useEffect, useState } from "react";
import SearchPanel from "../../../components/SearchPanel";

import {
  SI_MAIN_SEARCHFIELD,
  SI_SUB_SEARCHFIELD,
} from "./SiSearchPenelConstant";
import {
  codeHelperData_emplist,
  codeHelperData_paymentDate,
 
} from "../../../model/SalaryInformationEntry/SalConstant";

import FormPanel from "../../../components/FormPanel";
import ConfirmComponent from "../../../components/ConfirmComponent";
import { currentDateStr } from "../../../utils/DateUtils";
import "../../../styles/SalaryInformationEntry/SalaryInformationEntryLayout.scss";
import "../../../styles/SearchPanel.scss";
import { codeHelperData_cdDept,  codeHelperData_rankNo } from "../../../model/EmpRegister/EmpConstant";

const SiSeacrchPanel = (props) => {
  const { onSearch, modalShow, state, actions, setCopyLastMonthData } = props;

  const [formPanelData, setFormPanelData] = useState();
  const [showModal, setShowModal] = useState({ show: false });

  useEffect(() => {
    setFormPanelData({
      item: {
        allowMonth: state.searchVo.allowMonth,
        salDivision: state.searchVo.salDivision,
        paymentDate: state.searchVo.paymentDate,
      },
    });
  }, [state.searchVo]);

  const selectOptionHandler = (value) => {
    if(value === "") return true; 
    //전월데이터 복사 모달
    let message = "현재 귀속연월과 조회구분에 해당되는 모든 데이터 삭제후  전월데이터를 복사하시겠습니까?";
    setShowModal({ 
      show: true, 
      message: message,
      action : () => {
        actions.setSalDivision(value);
        setCopyLastMonthData(value);
      }
    });

    actions.setSalDivision(value);
  };

  // 작성일자 코드헬퍼 클릭 이벤트
  const clickPaymentDateCodeHelper = (e, row) => {
    let message = "해당 지급일로 검색하시겠습니까?";
    setShowModal({
      show: true,
      message: message,
      action: () => {
        actions.setAllowMonth(row.allowMonth);
        actions.setSalDivision(row.salDivision);
        actions.setPaymentDate(row.paymentDate);
        actions.onSearch(row);
      },
    });
  };

  // 지급일 설정 날짜비교 유효성
  const validationPaymentDate = (newValue) => {
    const allowMonth = new Date(state.searchVo.allowMonth);
    const paymentDate = new Date(newValue);
    console.log("validationPaymentDate", validationPaymentDate);
    if (allowMonth > paymentDate) {
      setShowModal({
        show: true,
        message: "귀속년월보다 지급일이 앞섭니다.",
        onlyConfirm: true,
      });
      actions.setPaymentDate(currentDateStr());
      return false;
    }

    // 지급일 setting 해주기
    actions.setPaymentDate(newValue);
    return true;
  };

  const clickPaymentDate = () => {
    actions.setPaymentDate("");
    actions.setCdEmp('');
    actions.setDateId('');
    actions.setYnComplete('');
    actions.setSaInfoListData([]);
    actions.setSalData([]);                     
    actions.setSumAllowPayByYnTax([{ item: { sumByY: 0, sumByN: 0, sumAllowPay: 0 }},]);
    actions.setSumDeductPay([ { item: { sumDeductPay: 0 , excessAmount : 0}} ]);
    actions.setDeductData([]);              
    actions.setSaInfoDetailData([]);
    actions.setSalPaySumData({       
      allowPay: [],
      totalAllowPay : [{item : { sumAllowPay: 0, sumByN: 0, sumByY: 0 }}], 
      deductPay: [],
      totalDeductPay : [{item: { excessAmount  : 0, sumDeductPay : 0,}}]
    });
    // actions.setSalDivision("");
  }

  const onSearchClick = () =>{
    if(state.searchVo.allowMonth ==='' || state.searchVo.salDivision ===''|| state.searchVo.paymentDate ==='' ){
      
      setShowModal({
        show: true,
        message: "검색조건을 모두 입력해주세요.",
        onlyConfirm: true,
      });

      return true;
    }
    onSearch();
  }

  const changeAllowMonth = (newValue) =>{
    actions.setPaymentDate("");
    actions.setCdEmp('');
    actions.setDateId('');
    actions.setYnComplete('');
    actions.setSaInfoListData([]);
    actions.setSalData([]);                     
    actions.setSumAllowPayByYnTax([{ item: { sumByY: 0, sumByN: 0, sumAllowPay: 0 }},]);
    actions.setSumDeductPay([ { item: { sumDeductPay: 0 , excessAmount : 0}} ]);
    actions.setDeductData([]);              
    actions.setSaInfoDetailData([]);
    actions.setSalPaySumData({       
      allowPay: [],
      totalAllowPay : [{item : { sumAllowPay: 0, sumByN: 0, sumByY: 0 }}], 
      deductPay: [],
      totalDeductPay : [{item: { excessAmount  : 0, sumDeductPay : 0,}}]
    });
    actions.setSalDivision("");
    actions.setSalDivision("");
    actions.setPaymentDate("");
    actions.setAllowMonth(newValue);
  }

  return (
    <div className="deleteLabelBackground">
      <ConfirmComponent
        show={showModal.show}
        message={showModal.message}
        onlyConfirm={showModal.onlyConfirm}
        onHide={() => setShowModal(false)}
        onConfirm={() => {
          showModal.action && showModal.action();
          setShowModal(false);
        }}
      />
      <div className="border light-grey-border m-3">
        {/* 기본 검색조건 */}
        <SearchPanel onSearch={()=> onSearchClick()} showAccordion>
          <FormPanel
            INPUT_CONSTANT={SI_MAIN_SEARCHFIELD}
            formData={formPanelData}
            codeHelperFn={{
              paymentDate: () =>
                modalShow(
                  "codeHelper",
                  codeHelperData_paymentDate,
                  clickPaymentDateCodeHelper,
                  {
                    allowYear: state.allowYear,
                    allowMonth: state.allowMonth,
                    paymentDate: state.paymentDate,
                  }
                ),
            }}
            onChange={{
              allowMonth: (newValue) => changeAllowMonth(newValue),
              salDivision: (newValue) => selectOptionHandler(newValue),
              paymentDate: (newValue) => validationPaymentDate(newValue),
            }}
            onClick={{
              paymentDate: () => clickPaymentDate(),
            }}
            columnNumber={3}
          />
          {/* 상세 검색조건 */}
          <div>
            <FormPanel
              INPUT_CONSTANT={SI_SUB_SEARCHFIELD}
              submitData={actions.submitMainTabData}
              formData={{
                item: {
                  searchCdEmp: state.searchVo.searchCdEmp,
                  searchCdDept: state.searchVo.searchCdDept,
                  searchCdOccup: state.searchVo.searchCdOccup,
                  searchYnUnit: state.searchVo.searchYnUnit,
                },
              }}
              codeHelperFn={{
                searchCdEmp: () =>
                  modalShow(
                    "codeHelper",
                    codeHelperData_emplist,
                    (e,row) => actions.setSearchCdEmp(row.cdEmp)
                  ),
                searchCdDept: () =>
                  modalShow(
                    "codeHelper",
                    codeHelperData_cdDept,
                    (e,row) => actions.setSearchNmDept("cdDept", row.cdDept)
                  ),
                searchCdOccup: () =>
                  modalShow(
                    "codeHelper",
                    codeHelperData_rankNo,
                    (e,row) => actions.setSearchNmOccup("rankNo", row.rankNo)
                  ),
              }}
              onChange={{
                searchCdEmp: (e, newValue) => actions.setSearchCdEmp(newValue),
                searchCdDept: (e, newValue) => actions.setSearchCdDept(newValue),
                searchCdOccup: (e, newValue) => actions.setSearchCdOccup(newValue),
                searchYnUnit: (newValue) => actions.setSearchYnUnit(newValue),
              }}
            />
          </div>
        </SearchPanel>
      </div>
    </div>
  );
};

export default SiSeacrchPanel;
