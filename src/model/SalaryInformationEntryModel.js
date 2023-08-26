import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import { currentDateStr, currentMonthStr } from '../utils/DateUtils';
import CommonConstant from './CommonConstant';

const SalaryInformationEntryModel = () => {
  const url = 'http://localhost:8888';
  const { labels } = CommonConstant();

  /* 영역에 뿌릴 Data */
  const [saInfoListData, setSaInfoListData] = useState();     //사원 테이블 리스트
  const [salData, setSalData] = useState();                   //급여항목 테이블
  const [deductData, setDeductData] = useState();             //공제항목 테이블
  const [saInfoDetailData, setSaInfoDetailData] = useState(); //사원상세조회

  /* 검색조건 Data */
  const [cdEmp, setCdEmp] = useState('Y701');                      //사원번호
  const [allowMonth, setAllowMonth] = useState(currentMonthStr);   //귀속년월
  const [salDivision, setSalDivision] = useState();                //구분
  const [paymentDate, setPaymentDate] = useState(currentDateStr);  //지급일

  const [searchCdEmp, setSearchCdEmp] = useState();
  const [searchDeptCd, setSearchDeptCd] = useState();
  const [searchRankNo, setSearchRankNo] = useState();
  const [searchCdOccup, setSearchCdOccup] = useState();
  const [searchCdField, setSearchCdField] = useState();
  const [searchCdProject, setSearchCdProject] = useState();
  const [searchYnUnit, setSearchYnUnit] = useState();
  const [searchYnForlabor, setSearchYnForlabor] = useState();
  
  /* 상태 Data */
  const [modalState, setModalState] = useState({ show: false , modalData: null });  //모달창

  useEffect(() => {
    axios.post(
      url + '/saEmpInfo/getAllSaEmpInfo',
        { allowMonth: allowMonth, },
        {'Content-Type': 'application/json',},
      )
      .then((response) => {
        //console.log('급여정보_사원리스트 >> ', response.data);
        const data = response.data.map((item) => (
          {
          [labels.cdEmp]: item.cdEmp,
          [labels.nmEmp]: item.nmEmp,
          [labels.rankNo]: item.rankNo,
          [labels.mnReduction]: item.mnReduction,
          }
        ));

        setSearchCdEmp(response.data[0].cdEmp); //리스트 첫번째 사원코드가 선택
        setSaInfoListData(data);
      })

      .catch((error) => {
        console.error('에러발생: ', error);
      });
  }, []);

  
  useEffect(() => {
    axios.post(
      url + '/saEmpInfo/getAllSaEmpInfo',
        { allowMonth: allowMonth, },
        {'Content-Type': 'application/json',},
      )
      .then((response) => {
        //console.log('급여정보_사원리스트 >> ', response.data);
        const data = response.data.map((item) => (
          {
            [labels.cdFamrel]: item.cdEmp,
          사원이름: item.nmEmp,
          직급: item.rankNo,
          감면율: item.MnReduction,
          }
        ));
          
        setSaInfoListData(data);
      })

      .catch((error) => {
        console.error('에러발생: ', error);
      });
      
    const searchVo = {
      cdEmp: cdEmp,
      allowMonth: allowMonth,
      salDivision: salDivision,
      paymentDate: paymentDate,
      searchDeptCd : searchDeptCd,
      searchRankNo : searchRankNo,
      searchCdOccup : searchCdOccup,
      searchCdField : searchCdField,
      searchCdProject : searchCdProject,
      searchYnUnit : searchYnUnit,
      searchYnForlabor : searchYnForlabor,
      searchCdEmp :  searchCdEmp
    };
     console.log(searchVo);

    /* 급여정보_급여 항목 리스트 */
    axios.post(
      url + '/saallowpay/getSaAllowPayByCdEmp',
      {cdEmp: cdEmp,
        allowMonth: allowMonth, },
      {'Content-Type': 'application/json',},
      )
      .then((response) => {
        //console.log( '급여항목데이터 >> ',response.data);
        const data = response.data.map((item) => ({
          // 급여항목코드: item.cdAllow,
          [labels.nmAllow]: item.nmAllow,
          [labels.allowPay]: item.allowPay
        }));

        setSalData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      });


    /* 급여정보_공제 항목 리스트 */
    axios.post(
      url + '/sadeductpay/getSaDeductPayByCdEmp',
      {cdEmp: cdEmp,
        allowMonth: allowMonth, },
      {'Content-Type': 'application/json',},
      )
      .then((response) => {
        //console.log( '공제항목데이터 >> ',response.data);

        const data = response.data.map((item) => ({
          // 공제항목코드: item.cdDeduct,
          [labels.nmDeduct]: item.nmDeduct,
          [labels.allowPay]: item.allowPay
        }));

        setDeductData(data);

      })
      .catch((error) => {
        console.error('에러발생: ', error);
      });

      /* 상세사원정보 */
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

    }, [cdEmp, allowMonth, salDivision, paymentDate]); 

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

    , cdEmp
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
  };
};

export default SalaryInformationEntryModel;
