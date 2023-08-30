import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import { currentDateStr, currentMonthStr, currentYearStr } from '../utils/DateUtils';
import { nvl } from '../utils/NumberUtils';
import SalConstant, { calculationEmploymentInsurance, calculationHealthinsurance, calculationNationalPension } from './SalConstant';
import { isEmpty } from '../utils/StringUtils';

const SalaryInformationEntryModel = () => {
  const url = 'http://localhost:8888';

  /* 급여자료 계산 전용 상수 */
  const { cdDeduct, cdAllow } = SalConstant();

  /* 영역 테이블 Data */
  const [saInfoListData, setSaInfoListData] = useState();                 // 사원 테이블 리스트
  const [salData, setSalData] = useState();                               // 급여항목 테이블
  const [calSalData, setCalSalData] = useState({ taxYSum : 0, taxNSum : 0, taxSum : 0 });  // 급여항목 합계
  const [deductData, setDeductData] = useState();                         // 공제항목 테이블
  const [calDeductSum, setCalDeductSum] = useState({sum : 0});            // 공제항목 합계  
  const [saInfoDetailData, setSaInfoDetailData] = useState();             // 사원상세조회
  const [salAllowPaySumData, setSalAllowPaySumData] = useState();         // 급여항목 합계테이블 데이터(selectbox 조회)
  const [salDeductPaySumData, setSalDeductPaySumData] = useState();       // 공제항목 합계테이블 데이터(selectbox 조회)

  /* 상태 Data */
  const [modalState, setModalState] = useState({ show: false });            // 모달창 show 여부
  const [codeHelperTableData, setCodeHelperTableData] = useState('');       // 코드도움 테이블 data
  const [selectedOption, setSelectedOption] = useState('EmpAllThisMonth');  // 조회구분 selectbox 선택된 value
  const [editedAllow, setEditedAllow]= useState();                          // 급여항목 테이블_ table row 수정된 객체

  /* 검색조건 Data */
  const [cdEmp, setCdEmp] = useState('A101');                       // 사원번호
  const [allowMonth, setAllowMonth] = useState(currentMonthStr);    // 귀속년월
  const [salDivision, setSalDivision] = useState('SAL');            // 구분
  const [paymentDate, setPaymentDate] = useState(currentDateStr);   // 지급일
  const [allowYear, setAllowYear] = useState(currentYearStr);       // 귀속 년도

  const [searchCdEmp, setSearchCdEmp] = useState('');               // 사원코드 검색
  const [searchCdDept, setSearchCdDept] = useState('');             // 부서코드 검색
  const [searchRankNo, setSearchRankNo] = useState('');             // 직급코드 검색
  const [searchCdOccup, setSearchCdOccup] = useState('');           // 직책코드 검색
  const [searchCdField, setSearchCdField] = useState('');           // 현장코드 검색
  const [searchCdProject, setSearchCdProject] = useState('');       // 프로젝트코드 검색
  const [searchYnUnit, setSearchYnUnit] = useState('');             // 생산직여부 검색
  const [searchYnForlabor, setSearchYnForlabor] = useState('');     // 국외근로여부 검색

  /* 사원정보 선택후 급여항목, 공제항목 검색조건 */
  const [searchAllowVo, setSearchAllowVo] = useState({ allowMonth: allowMonth, cdEmp: cdEmp });
  
  useEffect(() => {
    salEmpdataTable();        // 검색조건에 맞는 사원리스트
  }, [allowMonth, salDivision, paymentDate, searchCdEmp, searchCdDept, searchRankNo, searchCdOccup, searchCdField, searchCdProject, searchYnUnit, searchYnForlabor]);

  useEffect(() => {
    // console.log('searchAllowVo>>>');
    // console.log(searchAllowVo);
    salAllowTableData();      // 선택한 사원의 급여항목 Table Data
    salDeductTableData();     // 선택한 사원의 공제항목 Table Data
    salEmpDetailTableData();  // 선택한 사원의 상세정보
  }, [searchAllowVo]);

  useEffect(() => {
    if (editedAllow && editedAllow.item) salAllowEdit(editedAllow.item);  // 급여항목테이블 지급금액 수정
  }, [editedAllow]);  //tabledata 변경

  useEffect(() => { 
    let searchParams = {};
    
    switch (selectedOption) {
      case 'EmpAllThisMonth' : searchParams = {allowMonth:allowMonth}; break;
      case 'EmpOneThisMonth' : searchParams = {allowYear:allowYear, cdEmp:cdEmp}; break;
      // case 'EmpAllCurrent' : searchParams = {allowYear:allowYear,cdEmp:cdEmp}; break; 오늘날짜기준? 지급일기준?
      // case 'EmpOneCurrent' : searchParams = {allowYear:allowYear,cdEmp:cdEmp}; break;
      case 'EmpAllThisYear' : searchParams = {allowYear:allowYear}; break;
      case 'EmpOneThisYear' : searchParams = {allowYear:allowYear, cdEmp:cdEmp};break;
      default: break;
    }

    getSalAllowPaySum(searchParams);  // 선택한 select option 해당 급여항목 합계데이터
    getSalDeductPaySum(searchParams); // 선택한 select option 해당 공제항목 합계데이터
  }, [selectedOption]);
  

  /* 사원리스트 */
  const salEmpdataTable = () => {
    axios.post(
      url + '/saEmpInfo/getAllSaEmpInfo',
        {
          allowMonth: allowMonth,
          salDivision: salDivision,
          paymentDate: paymentDate,
          searchCdEmp : searchCdEmp,
          searchCdDept : searchCdDept,
          searchRankNo : searchRankNo,
          searchCdOccup : searchCdOccup,
          searchCdField : searchCdField, 
          searchCdProject : searchCdProject,
          searchYnUnit : searchYnUnit,
          searchYnForlabor : searchYnForlabor,
        },
        {'Content-Type': 'application/json',},
      )
      .then((response) => {
        console.log('사원리스트 >> ', response.data);
        const data = response.data.map((item) => (
          {
            item : {
              cdEmp: item.cdEmp,
              nmEmp: item.nmEmp,
              rankNo: item.rankNo,
              mnReduction: item.mnReduction,
            },
            // checked : false,
            // selected : false,
            // isEditable : false,
          }
        ));

        setSaInfoListData(data);
      })

      .catch((error) => {
        console.error('에러발생: ', error);
      });
  }

  /* 상세사원정보 */
  const salEmpDetailTableData = () => {
  
    axios.post(
      url + '/saEmpInfo/getSaEmpInfoByCdEmp',
      searchAllowVo,
      {'Content-Type': 'application/json',},
    )
    .then((response) => {
      //console.log( '상세사원정보 >> ', response.data);
      const data = response.data;
      setSaInfoDetailData(data);
    })
    .catch((error) => {
      console.error('에러발생: ', error);
    });
  }

  /* 급여정보_급여 항목 리스트 */
  const salAllowTableData = () => {
    
    axios.post(
      url + '/saallowpay/getSaAllowPayByCdEmp',
      {...searchAllowVo, allowMonth: allowMonth},
      {'Content-Type': 'application/json',},
      )
      .then((response) => {
        //console.log( '급여항목데이터 >> ',response.data);
        const data = response.data.map((item) => ({
          item : {
            cdEmp : item.cdEmp,
            cdAllow :item.cdAllow,
            nmAllow: item.nmAllow,
            allowPay: item.allowPay
          },
        }));

        setSalData(data);

        /* 합계 */
        let taxYSum = 0;  // 과세
        let taxNSum = 0;  // 비과세
        let sum = 0;      // 총 지급액 합계
       
        response.data.forEach((item) => {
          item.taxYn === 'N'? taxNSum += parseInt(nvl(item.allowPay,0)) : taxYSum += parseInt(nvl(item.allowPay,0))
        });
        sum = taxYSum + taxNSum;

        setCalSalData({taxYSum : taxYSum, taxNSum : taxNSum, sum : sum});
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      });
  }

  /* 급여정보_공제 항목 리스트 */
  const salDeductTableData=()=>{
          
    axios.post(
      url + '/sadeductpay/getSaDeductPayByCdEmp',
      {...searchAllowVo, allowMonth: allowMonth},
      {'Content-Type': 'application/json',},
      )
      .then((response) => {
        //console.log( '공제항목데이터 >> ',response.data);
        const data = response.data.map((item) => ({
          item : {
            cdDeduct : item.cdDeduct,
            nmDeduct: item.nmDeduct,
            allowPay: item.allowPay
          },
          
        }));

        setDeductData(data);
        
        let sum = 0;
        response.data.forEach((item) => {
          sum += parseInt(nvl(item.allowPay,0));
        }); 

        setCalDeductSum({sum:sum});
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      })
  }

  /* 합계 데이터_급여항목_selectbox */
  const getSalAllowPaySum = (params) =>{
    
    axios.post(
      url + '/saallowpay/getSalAllowPaySum',
      params,
      {'Content-Type': 'application/json',},
      )
      .then((response) => {
        //console.log( '급여항목 합계데이터 >> ',response.data);
        const data = response.data.map((item) => ({
          item : {
            cdAllow: item.cdAllow,
            nmAllow: item.nmAllow,
            ynTax: item.ynTax='N'?'비과':'과세',
            sumAllowPay: item.sumAllowPay
          },
        }));

        setSalAllowPaySumData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      })
  }

  /* 합계 데이터_공제항목_selectbox */
  const getSalDeductPaySum = (params) =>{
    axios.post(
      url + '/sadeductpay/getSalDeductPaySum',
      params,
      {'Content-Type': 'application/json',},
      )
      .then((response) => {
        //console.log( '공제항목 합계데이터 >> ',response.data);
        const data = response.data.map((item) => ({
          item : {
            cdDeduct : item.cdDeduct,
            nmDeduct: item.nmDeduct,
            sumDeductPay: item.sumDeductPay
          },
            // checked : false,
            // selected : false,
            // isEditable : false,
        }));

        setSalDeductPaySumData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      })
  }
 
  /* 급여항목테이블 update */
  const salAllowEdit = (editRowData) =>{
    
    //급여테이블 수정
    axios
      .put(url + "/saallowpay/updateSalAllowPay"
      , {...editRowData, allowMonth: allowMonth},
      )
      .then((response) => {
        if (response.data === 1) console.log("급여테이블 수정 완료");
        salAllowTableData(); //급여테이블 리로드
        salDeductUpdate(editRowData);//공제항목테이블 update
      })
      .catch((error) => {
        console.error("에러발생: ", error);
      });
  }

  /* 공제항목테이블 update */
  const salDeductUpdate = (editRowData) => {

    let jsonparam = {
      allowMonth:allowMonth,
      cdEmp: editRowData.cdEmp,
      calData : [
        // {cdDeduct : 'NATIONAL_PENSION', allowPay : calculationNationalPension(allowPay)},
      ]
    };
    jsonparam = makeCalDeductData(jsonparam,editRowData);
    
    axios.put(
      url + '/sadeductpay/updateSaDeductPay',
      jsonparam
      )
      .then((response) => {
        if (response.data === 1) console.log("공제테이블 수정 완료");
        salDeductTableData(); //공제테이블 리로드
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      })

  }
  /* 공제항목 계산 + update data 생성 */
  const makeCalDeductData =(jsonparam, editRowData) =>{
    deductData.forEach((item) => {
      let allowPay = 0;
      switch(item.item.cdDeduct){
        case cdDeduct.NATIONAL_PENSION : allowPay = calculationNationalPension(editRowData.allowPay); break; 
        case cdDeduct.HEALTH_INSURANCE : allowPay = calculationHealthinsurance(editRowData.allowPay); break; 
        case cdDeduct.EMPLOYMENT_INSURANCE : allowPay = calculationEmploymentInsurance(editRowData.allowPay); break;
        default: break;
      }
      
      jsonparam.calData.push({cdDeduct: item.item.cdDeduct, allowPay: allowPay})
    }); 

    return jsonparam;
  }

  return {
    state : {
      saInfoListData: saInfoListData  // 왼쪽 사원테이블
      , salAllowData: { salData : salData, sumData : calSalData }  // 중간 급여항목 
      , deductData : { deductData : deductData, sumData : calDeductSum} // 중간 공제항목
      , sumTableData:{ salAllowPaySumData : salAllowPaySumData, salDeductPaySumData : salDeductPaySumData}  // 오른쬭 조회구분테이블
      , saInfoDetailData    
  
      , modalState : modalState
      , codeHelperTableData
      
      , searchVO : {
        cdEmp
        , salDivision
        , allowMonth
        , paymentDate
        , searchCdDept
        , searchRankNo
        , searchCdOccup
        , searchCdField
        , searchCdProject
        , searchYnUnit
        , searchYnForlabor
        , searchCdEmp
      }
    }
    , actions:{
      setSaInfoListData 
      , setSalData
      , setSaInfoDetailData

      , setSearchAllowVo
      , setModalState

      , setCdEmp
      , setSalDivision
      , setAllowMonth
      , setPaymentDate
      
      , setCodeHelperTableData
      , setEditedAllow
      , setSelectedOption
      , setCalSalData

      , setSearchCdDept
      , setSearchCdEmp
      , setSearchRankNo
      , setSearchCdOccup
      , setSearchCdField
      , setSearchCdProject
      , setSearchYnUnit
      , setSearchYnForlabor
    }

  };
};

export default SalaryInformationEntryModel;
