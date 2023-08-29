import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import { currentDateStr, currentMonthStr, currentYearStr } from '../utils/DateUtils';
import CommonConstant from './CommonConstant';
import { isEditable } from '@testing-library/user-event/dist/utils';
import { nvl } from '../utils/NumberUtils';
import { isEmpty } from '../utils/StringUtils';
import { cal_h, cal_l, cal_n, calculationEmploymentInsurance, calculationHealthinsurance, calculationNationalPension } from './SalConstant';

const SalaryInformationEntryModel = () => {
  const url = 'http://localhost:8888';
  const { labels } = CommonConstant();

  /* 영역에 뿌릴 Data */
  const [saInfoListData, setSaInfoListData] = useState();       //사원 테이블 리스트
  const [salData, setSalData] = useState();                     //급여항목 테이블
  const [calSalData, setCalSalData] = useState({ taxYSum : 0, taxNSum : 0, taxSum : 0 });  //급여항목 합계
  const [calDeductSum, setCalDeductSum] = useState({sum : 0});  //공제항목 합계

  const [deductData, setDeductData] = useState();             //공제항목 테이블
  const [saInfoDetailData, setSaInfoDetailData] = useState(); //사원상세조회

  const [salAllowPaySumData, setSalAllowPaySumData] = useState(); //급여항목 합계테이블 데이터(selectbox 조회)
  const [salDeductPaySumData, setSalDeductPaySumData] = useState(); //공제항목 합계테이블 데이터(selectbox 조회)

  /* 상태 Data */
  const [modalState, setModalState] = useState({ show: false , modalData: null });  //모달창
  const [selectedOption, setSelectedOption] = useState('EmpAllThisMonth');  //선택된 값
  const [editedAllow, setEditedAllow ]= useState(); //급여항목 테이블_ table row 수정된 객체

  /* 검색조건 Data */
  const [cdEmp, setCdEmp] = useState('Y701');                      //사원번호
  const [allowMonth, setAllowMonth] = useState(currentMonthStr);   //귀속년월
  const [salDivision, setSalDivision] = useState();                //구분
  const [paymentDate, setPaymentDate] = useState(currentDateStr);  //지급일
  const [allowYear, setAllowYear] = useState(currentYearStr);      //귀속 년도

  const [searchCdEmp, setSearchCdEmp] = useState('');
  const [searchDeptCd, setSearchDeptCd] = useState('');
  const [searchRankNo, setSearchRankNo] = useState('');
  const [searchCdOccup, setSearchCdOccup] = useState('');
  const [searchCdField, setSearchCdField] = useState('');
  const [searchCdProject, setSearchCdProject] = useState('');
  const [searchYnUnit, setSearchYnUnit] = useState('');
  const [searchYnForlabor, setSearchYnForlabor] = useState('');

  const [searchVo, setSearchVo] = useState({
    allowMonth: allowMonth,
    salDivision: salDivision,
    paymentDate: paymentDate,
    searchCdEmp :searchCdEmp,
    searchDeptCd : searchDeptCd,
    searchRankNo : searchRankNo,
    searchCdOccup : searchCdOccup,
    searchCdField : searchCdField, 
    searchCdProject : searchCdProject,
    searchYnUnit : searchYnUnit,
    searchYnForlabor : searchYnForlabor,
  })
  console.log('searchVo>>>');
  console.log(searchVo);

  const [searchAllowVo, setSearchAllowVo] = useState({
    allowMonth: allowMonth,
    cdEmp: cdEmp
  })
  console.log('searchAllowVo>>>');
  console.log(searchAllowVo);

  useEffect(() => {
    salEmpdataTable();        // 검색조건에 맞는 사원리스트
  }, [cdEmp,allowMonth,paymentDate,searchCdEmp,salDivision,searchDeptCd,searchRankNo,searchCdOccup,searchCdField]);

  useEffect(() => { // 선택한 select option 합계데이터

    let searchParams = {};  
    switch (selectedOption) {
      case 'EmpAllThisMonth' : searchParams = {allowMonth:allowMonth}; break;
      case 'EmpOneThisMonth' : searchParams = {allowYear:allowYear,cdEmp:cdEmp}; break;
      // case 'EmpAllCurrent' : searchParams = {allowYear:allowYear,cdEmp:cdEmp}; break;
      // case 'EmpOneCurrent' : searchParams = {allowYear:allowYear,cdEmp:cdEmp}; break;
      case 'EmpAllThisYear' : searchParams = {allowYear:allowYear}; break;
      case 'EmpOneThisYear' : searchParams = {allowYear:allowYear,cdEmp:cdEmp};break;
      default: break;
    }

    getSalAllowPaySum(searchParams);  
    getSalDeductPaySum(searchParams);

  }, [selectedOption]);

  useEffect(() => {
    salAllowTableData();      // 선택한 사원의 급여항목 Table Data
    salDeductTableData();     // 선택한 사원의 공제항목 Table Data
    salEmpDetailTableData();  // 선택한 사원의 상세정보
  }, [searchAllowVo]);


  useEffect(() => {
    console.log('+++++++++++++++');
    console.log(editedAllow?.item);
    console.log('+++++++++++++++');

    //const editAllowData = editedAllow?.item
    if(!isEmpty(editedAllow)) salAllowEdit(editedAllow.item); //급여항목테이블 지급금액 수정
    
  }, [editedAllow]);  //tabledata 변경


  /* 급여정보_사원리스트 */
  const salEmpdataTable = () => {

    axios.post(
      url + '/saEmpInfo/getAllSaEmpInfo',
        searchVo,
        {'Content-Type': 'application/json',},
      )
      .then((response) => {
        //console.log('급여정보_사원리스트 >> ', response.data);
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

        setSearchCdEmp(response.data[0].cdEmp); //리스트 첫번째 사원코드가 선택
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
      console.log( '상세사원정보 >> ', response.data);
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

          checked : false,
          selected : false,
          isEditable : false,     
        }));

        setSalData(data);

        // 합계 데이터
        let taxYSum = 0;  //과세
        let taxNSum = 0;  //비과세
        let sum = 0;      //총 지급액 합계
       
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
            nmDeduct: item.nmDeduct,
            allowPay: item.allowPay
          },
          checked : false,
          selected : false,
          isEditable : false,
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
            nmAllow: item.nmAllow,
            ynTax: item.ynTax='N'?'비과':'과세',
            sumAllowPay: item.sumAllowPay
          },
          checked : false,
          selected : false,
          isEditable : false,
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
            nmDeduct: item.nmDeduct,
            sumDeductPay: item.sumDeductPay
          },
          checked : false,
          selected : false,
          isEditable : false,
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
      .put(url + "/saallowpay/updateSaAllowPay"
      , {...editRowData, allowMonth: allowMonth},
      )
      .then((response) => {
        if (response.data === 1) console.log("급여테이블 수정 완료");
        salAllowTableData(); //급여테이블 리로드 시키기
        salDeductEdit(editRowData);//공제항목테이블 update
      })
      .catch((error) => {
        console.error("에러발생: ", error);
      });
  }

  /* 공제항목테이블 update */
  const salDeductEdit = (editRowData) => {
    const cdAllow = editRowData.cdAllow;
    const allowPay = editRowData.allowPay;

    //공제 항목테이블 데이터
    // deductData.forEach((item) => {
    //   item.cdDeduct
    // }); 


    //공제항목
    let n_cdDeduct = 'DEDUCT_NATION'; //국민연금
    let h_cdDeduct = '502'; //건강보험
    let l_cdDeduct = '503'; //고용보험
    
    let jsonparam = {};
     
    //계산된 공제항목들
    jsonparam = {
      allowMonth:allowMonth,
      cdEmp: cdEmp,
      calData : [
        {cdDeduct : n_cdDeduct , allowPay : calculationNationalPension(allowPay)},
        {cdDeduct : h_cdDeduct , allowPay : calculationHealthinsurance(allowPay)},
        {cdDeduct : l_cdDeduct , allowPay : calculationEmploymentInsurance(allowPay)},
      ]
    };

    axios.put(
      url + '/sadeductpay/updateSaDeductPay',
      jsonparam
      )
      .then((response) => {
        if (response.data === 1) console.log("공제테이블 수정 완료");
        salDeductTableData(); //공제 테이블 리로드 시키기
        
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      })

  }

  return {
    //왼쪽 사원테이블
    saInfoListData: saInfoListData
    , setSaInfoListData 
    //중간 급여항목 
    , salAllowData:{ salData : salData, sumData : calSalData }
    , setSalData 
    //중간 공제항목
    , deductData : { deductData : deductData, sumData : calDeductSum}
    //오른쬭 조회구분테이블
    , sumTableData:{ salAllowPaySumData : salAllowPaySumData, salDeductPaySumData : salDeductPaySumData}  
    //사원상세
    , saInfoDetailData
    , setSaInfoDetailData

    , modalState : modalState
    , setModalState

    , searchVO : {
      cdEmp
      , salDivision
      , allowMonth
      , paymentDate
      , searchDeptCd
      , searchRankNo
      , searchCdOccup
      , searchCdField
      , searchCdProject
      , searchYnUnit
      , searchYnForlabor
      , searchCdEmp
    }
    , actions:{
      setSearchVo
      , setSearchAllowVo
      , setCdEmp
      , setSalDivision
      , setAllowMonth
      , setPaymentDate
      , setSearchDeptCd
      , setSearchRankNo
      , setSearchCdOccup
      , setSearchCdField
      , setSearchCdProject
      , setSearchYnUnit
      , setSearchYnForlabor
      , setCalSalData
      , setSelectedOption
      , setEditedAllow
    }

  };
};

export default SalaryInformationEntryModel;
