import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';

const SalaryInformationEntryModel = () => {
  const url = 'http://localhost:8888';

  //영역에 뿌릴 Data
  const [saInfoListData, setSaInfoListData] = useState();     //사원 테이블 리스트
  const [salData, setSalData] = useState();                   //급여항목 테이블
  const [deductData, setDeductData] = useState();             //공제항목 테이블
  const [rightTableData, setRightTableData] = useState();     //사원상세조회

  //검색조건 Data
  const [cdEmp, setCdEmp] = useState();                         //사원번호
  const [allowMonth, setAllowMonth] = useState('2023-08');      //귀속년월
  // const [searchVo , setSerchVo] = useState{cdEmp,allowMonth}    //검색조건

  //상태 Data
  const [modalState, setModalState] = useState({ show: false , modalData: null });  //모달창

  const onSearch = () => {
    alert("검색버튼 눌러뗭><");
  }

  useEffect(() => {
    
    //급여정보_사원 리스트
    axios
      .get(url + '/saEmpInfo/getAllSaEmpInfo')
      .then((response) => {
        //console.log('급여정보_사원리스트 >> ', response.data);
        const data = response.data.map((item) => ({
          사원코드: item.cdEmp,
          사원이름: item.nmEmp,
          직급: item.rankNo,
          감면율: item.MnReduction,
        }));
        setSaInfoListData(data);
      })

      .catch((error) => {
        console.error('에러발생: ', error);
      });
  }, []);

  
  useEffect(() => {
    
    //급여정보_급여 항목 리스트
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
          급여항목: item.nmAllow,
          지급금액: item.allowPay
        }));

        setSalData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      });


    //급여정보_공제 항목 리스트
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
          공제항목: item.nmDeduct,
          금액: item.allowPay
        }));

        setDeductData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      });

      //사원정보 update



  }, [cdEmp]);


  return {
    saInfoListData: saInfoListData
    , setSaInfoListData 
    , salData:salData
    , setSalData
    , deductData : deductData
    , setDeductData
    , allowMonth : allowMonth
    , cdEmp: cdEmp
    , setCdEmp
    , modalState:modalState
    , setModalState
    , onSearch
  };
};

export default SalaryInformationEntryModel;
