import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import { currentDateStr, currentMonthStr } from '../utils/DateUtils';
import CommonConstant from './CommonConstant';
import { isEditable } from '@testing-library/user-event/dist/utils';

const SalaryInformationEntryModel = () => {
  const url = 'http://localhost:8888';
  const { labels } = CommonConstant();

  /* 영역에 뿌릴 Data */
  const [saInfoListData, setSaInfoListData] = useState();     //사원 테이블 리스트
  const [salData, setSalData] = useState();                   //급여항목 테이블
  const [deductData, setDeductData] = useState();             //공제항목 테이블
  const [saInfoDetailData, setSaInfoDetailData] = useState(); //사원상세조회

  /* 상태 Data */
  const [modalState, setModalState] = useState({ show: false , modalData: null });  //모달창
  
  /* 검색조건 Data */
  const [cdEmp, setCdEmp] = useState('Y701');                      //사원번호
  const [allowMonth, setAllowMonth] = useState(currentMonthStr);   //귀속년월
  const [salDivision, setSalDivision] = useState();                //구분
  const [paymentDate, setPaymentDate] = useState(currentDateStr);  //지급일

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

  
  useEffect(() => {
    salAllowTableData();      // 선택한 사원의 급여항목 Table Data
    //salDeductTableData();   // 선택한 사원의 공제항목 Table Data
    salEmpDetailTableData();  // 선택한 사원의 상세정보
  }, [searchAllowVo]);


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

            isChecked : false,
            isEditable : false,     
            selected : false,
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
      {cdEmp: cdEmp},
      {'Content-Type': 'application/json',},
    )
    .then((response) => {
      //console.log( '상세사원정보 >> ',response.data);
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
          // 급여항목코드: item.cdAllow,
          item : {
            nmAllow: item.nmAllow,
            allowPay: item.allowPay
          },

          isChecked : false,
          isEditable : false,     
          selected : false,
        }));

        setSalData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      });
  }

  /* 급여정보_공제 항목 리스트 */
  // const salDeductTableData=()=>{
          
  //   axios.post(
  //     url + '/sadeductpay/getSaDeductPayByCdEmp',
  //     {cdEmp: cdEmp,
  //       allowMonth: allowMonth, },
  //     {'Content-Type': 'application/json',},
  //     )
  //     .then((response) => {
  //       //console.log( '공제항목데이터 >> ',response.data);

  //       const data = response.data.map((item) => ({
  //         // 공제항목코드: item.cdDeduct,
  //         [labels.nmDeduct]: item.nmDeduct,
  //         [labels.allowPay]: item.allowPay
  //       }));

  //       setDeductData(data);

  //     })
  //     .catch((error) => {
  //       console.error('에러발생: ', error);
  //     })
  // }

  return {
    saInfoListData: saInfoListData
    , setSaInfoListData 
    , salData:salData
    , setSalData
    , deductData : deductData
    , setDeductData
    , saInfoDetailData
    , setSaInfoDetailData

    , modalState : modalState
    , setModalState

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
    }
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

  };
};

export default SalaryInformationEntryModel;
