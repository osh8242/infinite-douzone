import { useEffect, useState } from 'react';
import axios from 'axios';
import { currentDateStr, currentMonthStr} from '../../utils/DateUtils';
import { nvl } from '../../utils/NumberUtils';
import SalConstant, { calculationEmploymentInsurance, calculationHealthinsurance, calculationNationalPension } from './SalConstant';

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

  const [salPaySumData, setSalPaySumData] = useState({                    // 공제항목 합계테이블 데이터(selectbox 조회)
      allowPay : '',
      deductPay : ''
    }
  );         // 급여항목 합계테이블 데이터(selectbox 조회)
  //const [salDeductPaySumData, setSalDeductPaySumData] = useState();       

  /* 상태 Data */
  const [modalState, setModalState] = useState({ show: false });                // 모달창 show 여부
  //const [selectedOption, setSelectedOption] = useState('EmpAllThisMonth');    // 조회구분 selectbox 선택된 value
  const [selectedOption, setSelectedOption] = useState('');                     // 조회구분 selectbox 선택된 value
  const [editedAllow, setEditedAllow]= useState();                              // 급여항목 테이블_ table row 수정된 객체
  const [addRow, setAddRow]= useState();                                        // 사원 코드도움창에서 선택한 로우 객체
  const [codeHelperTableData, setCodeHelperTableData] = useState({              // 코드도움 테이블 data
    data : '' ,
    code : '' ,
    setData : setAddRow
  });

  const [changeCdEmp, setChangeCdEmp] = useState({cdEmp:''});

  /* 검색조건 Data */
  const allowYear = '2023'       // 귀속 년도
  const [dateId, setDateId] = useState('');                         // 날짜 key
  const [cdEmp, setCdEmp] = useState('');                           // 사원번호
  const [allowMonth, setAllowMonth] = useState(currentMonthStr);    // 귀속년월
  const [salDivision, setSalDivision] = useState('SAL');            // 구분
  const [paymentDate, setPaymentDate] = useState(currentDateStr);   // 지급일

  const [searchCdEmp, setSearchCdEmp] = useState('');               
  const [searchCdDept, setSearchCdDept] = useState('');             
  const [searchRankNo, setSearchRankNo] = useState('');             // 직급코드 검색
  const [searchCdOccup, setSearchCdOccup] = useState('');           // 직책코드 검색
  const [searchCdField, setSearchCdField] = useState('');           // 현장코드 검색
  const [searchCdProject, setSearchCdProject] = useState('');       // 프로젝트코드 검색
  const [searchYnUnit, setSearchYnUnit] = useState('');             // 생산직여부 검색
  const [searchYnForlabor, setSearchYnForlabor] = useState('');     // 국외근로여부 검색

  /* parmas들... */
  const [searchVo, setSearchVo] = useState({
    allowYear : allowYear,
    allowMonth : '',
    salDivision : '',
    paymentDate : '',
    cdEmp : '',
    searchCdEmp : '',       // 사원코드 검색
    searchCdDept : '',      // 부서코드 검색
    searchRankNo : '',      // 직급코드 검색
    searchCdOccup : '',     // 직책코드 검색
    searchCdField : '',     // 현장코드 검색
    searchCdProject : '',   // 프로젝트코드 검색
    searchYnUnit : '',      // 생산직여부 검색
    searchYnForlabor : ''   // 국외근로여부 검색
  })
  
  /* 사원정보 선택후 급여항목, 공제항목 params */
  const [searchAllowVo, setSearchAllowVo] = useState({ 
    dateId: dateId, 
    cdEmp: cdEmp 
  });

  /* select box params */
  const [searchTotalDataVo, setSearchTotalDataVo] = useState({
    allowYear : '',
    allowMonth : '',
    paymentDate: '', 
    dateId : dateId,
    cdEmp: cdEmp
  });

  /* 계산값 params */
  const [editAllowData, setEditAllowData] = useState({
    dateId : dateId,
    cdEmp : cdEmp,
    updateAllowData : {},
    updateDeductData : []
      // {cdDeduct : 'NATIONAL_PENSION', allowPay : calculationNationalPension(allowPay)},
  });

  /* 조회구분 params */
  const [selectedOptionVo, setSelectedOptionVo] = useState({
    allowYear : '',
    paymentDate : '',
    allowMonth : '',
    nowFlag : false
  });

  useEffect(() => {
    setCdEmp(changeCdEmp.cdEmp);
  }, [changeCdEmp]);

  useEffect(() => {
    setSearchAllowVo((prevState) => ({ ...prevState, dateId: dateId }));
    setSearchTotalDataVo((prevState) => ({ ...prevState, dateId: dateId }));
    setEditAllowData((prevState) => ({ ...prevState,dateId: dateId }));
  }, [dateId]);

  useEffect(() => {
    setSearchAllowVo((prevState) => ({ ...prevState, cdEmp : cdEmp}));
    setSearchTotalDataVo((prevState) => ({ ...prevState, cdEmp : cdEmp}));
    setEditAllowData((prevState) => ({ ...prevState, cdEmp : cdEmp}));
  }, [cdEmp]);

  useEffect(()=> {

  },[allowMonth])

  useEffect(() => {
    getAll();               // 검색조건별
  }, [allowMonth, salDivision, paymentDate, searchCdEmp, searchCdDept, searchRankNo, searchCdOccup, searchCdField, searchCdProject, searchYnUnit, searchYnForlabor]);

  useEffect(() => {
    if(dateId !== '') getSaPayByCdEmp();      // 사원리스트에서 선택한 사원의 급여항목, 공제항목 Table Data , 사원 상세정보  
  }, [searchAllowVo]);

  useEffect(() => {
    if (editedAllow && editedAllow.item) {
      const updatedData = {
        ...editAllowData,
        updateAllowData: {...editedAllow.item, dateId : dateId},
        updateDeductData: makeCalDeductData(editedAllow.item)
      };
      salAllowEdit(updatedData);    
    }; 

  }, [editedAllow]);  //tabledata 변경

  useEffect(() => {
  }, [addRow])

  useEffect(() => { 
    switch (selectedOption) {
      case 'EmpAllThisMonth'  : setSelectedOptionVo({allowMonth : allowMonth});                      break;
      case 'EmpNowThisMonth'  : setSelectedOptionVo({allowMonth : allowMonth, nowFlag : true});      break;
      case 'EmpAllCurrent'    : setSelectedOptionVo({paymentDate : paymentDate});                    break;
      case 'EmpNowCurrent'    : setSelectedOptionVo({paymentDate : paymentDate, nowFlag : true});    break;
      case 'EmpAllThisYear'   : setSelectedOptionVo({allowYear : allowYear});                        break;
      case 'EmpNowThisYear'   : setSelectedOptionVo({allowYear : allowYear, nowFlag : true});        break;
      default: break;
    }

    if(selectedOption!=='') getSalTotalPaySum();  // 선택한 select option 해당 급여항목, 공제항목 합계데이터
  }, [selectedOption]);
  

  /* 사원리스트 */
  const getAll = () => {
    axios.post(
      url + '/saEmpInfo/getAll',
        {
          allowYear : allowYear,
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
        
        /* dateId set */
        const getDateId = response.data.dateId;
        setDateId(getDateId);

        /* 사원리스트 set */
        const getEmplist = response.data.plist.map((item) => (
          {
            item : {
              cdEmp: item.cdEmp,
              nmEmp: item.nmEmp,
              rankNo: item.rankNo,
              mnReduction: item.mnReduction,
            },
          }
        ));
        setSaInfoListData(getEmplist);

        /* 조회구분 영역 set */
        
        const totalSalPaydata = response.data.totalSalPaydata;
        /* select box 영역  합계 */
        const totalSalAllowPaydata = response.data.totalSalPaydata.salAllow.map((item) => ({
          item : {
            cdAllow: item.cdAllow,
            nmAllow: item.nmAllow,
            ynTax: item.ynTax='N'?'비과':'과세',
            sumAllowPay: item.sumAllowPay
          },
        }));

        const totalSalDeductPaydata = response.data.totalSalPaydata.salDeduct.map((item) => ({
          item : {
            cdDeduct : item.cdDeduct,
            nmDeduct: item.nmDeduct,
            sumDeductPay: item.sumDeductPay
          },
        }));

        setSalPaySumData({ allowPay : totalSalAllowPaydata, deductPay : totalSalDeductPaydata});
          
      

      })

      .catch((error) => {
        console.error('에러발생: ', error);
      });
  }

  /* 급여정보_급여 항목 리스트 */
  const getSaPayByCdEmp = () => {
    if(searchAllowVo.dateId!==''&&searchAllowVo.cdEmp!==''){
      axios.post(
        url + '/saallowpay/getSaPayByCdEmp',
        searchAllowVo,
        {'Content-Type': 'application/json',},
        )
        .then((response) => {
          
          /* 급여 항목 */
          const saAllowPayList = response.data.saAllowPayList.map((item) => ({
            item : {
              cdEmp : item.cdEmp,
              cdAllow :item.cdAllow,
              nmAllow: item.nmAllow,
              allowPay: item.allowPay
            },
          }));
          setSalData(saAllowPayList);

          /* 공제 항목 */
          const saDeductPayList = response.data.saDeductPayList.map((item) => ({
            item : {
              cdDeduct : item.cdDeduct,
              nmDeduct: item.nmDeduct,
              allowPay: item.allowPay
            },
          }));
          setDeductData(saDeductPayList);
          paySumData(response.data); // 합계구하기

          /* 사원정보 */
          const saEmpDetail = response.data.saEmpDetail;
          setSaInfoDetailData(saEmpDetail);

          /* select box 영역  합계 */
          const totalSalAllowPaydata = response.data.totalSalPaydata.salAllow.map((item) => ({
            item : {
              cdAllow: item.cdAllow,
              nmAllow: item.nmAllow,
              ynTax: item.ynTax='N'?'비과':'과세',
              sumAllowPay: item.sumAllowPay
            },
          }));
         
          const totalSalDeductPaydata = response.data.totalSalPaydata.salDeduct.map((item) => ({
            item : {
              cdDeduct : item.cdDeduct,
              nmDeduct: item.nmDeduct,
              sumDeductPay: item.sumDeductPay
            },
          }));
          
          setSalPaySumData({ allowPay : totalSalAllowPaydata, deductPay : totalSalDeductPaydata});

        })
        .catch((error) => {
          console.error('에러발생: ', error);
        });
    }
  }

  /* 급여테이블 수정 + 공제항목테이블 update */
  const salAllowEdit = (updatedData) =>{
    axios
      .put(url + "/saallowpay/updateSalPay"
      , updatedData
      )
      .then((response) => {
        if (response.data === 1) console.log("급여테이블 수정 완료");
        getSaPayByCdEmp(); //급여테이블 리로드
      })
      .catch((error) => {
        console.error("에러발생: ", error);
      });
  }

  /* 공제항목 계산 + update data 생성 */
  const makeCalDeductData =(editRowData) =>{
    let calList = [];

    deductData.forEach((item) => {
      let allowPay = 0;
      switch(item.item.cdDeduct){
        case cdDeduct.NATIONAL_PENSION : allowPay = calculationNationalPension(editRowData.allowPay); break; 
        case cdDeduct.HEALTH_INSURANCE : allowPay = calculationHealthinsurance(editRowData.allowPay); break; 
        case cdDeduct.EMPLOYMENT_INSURANCE : allowPay = calculationEmploymentInsurance(editRowData.allowPay); break;
        default: break;
      }
      
      calList.push({dateId : dateId, cdEmp : item.item.cdEmp, cdDeduct: item.item.cdDeduct, allowPay: allowPay})
    }); 

    return calList;
  }

    /* 합계 */
    const paySumData=(data)=>{
      let taxYSum = 0;  // 과세
      let taxNSum = 0;  // 비과세
      let salSum = 0;   // 총 지급액 합계
    
      data.saAllowPayList.forEach((item) => {
        item.taxYn === 'N'? taxNSum += parseInt(nvl(item.allowPay,0)) : taxYSum += parseInt(nvl(item.allowPay,0))
      });
      salSum = taxYSum + taxNSum;

      setCalSalData({taxYSum : taxYSum, taxNSum : taxNSum, sum : salSum});
    
      let deDuctsum = 0;
      data.saDeductPayList.forEach((item) => {
        deDuctsum += parseInt(nvl(item.allowPay,0));
      }); 

      setCalDeductSum({sum:deDuctsum});
  }


  /* 합계 데이터_selectbox */
  const getSalTotalPaySum = () =>{
    axios.post(
      url + '/saallowpay/getSalTotalPaySum',
      selectedOptionVo,
      {'Content-Type': 'application/json',},
      )
      .then((response) => {
        const totalSalAllowPaydata = response.data.salAllow.map((item) => ({
          item : {
            cdAllow: item.cdAllow,
            nmAllow: item.nmAllow,
            ynTax: item.ynTax='N'?'비과':'과세',
            sumAllowPay: item.sumAllowPay
          },
        }));
       
        //console.log( '공제항목 합계데이터 >> ', response.data.salDeduct);
        const totalSalDeductPaydata = response.data.salDeduct.map((item) => ({
          item : {
            cdDeduct : item.cdDeduct,
            nmDeduct: item.nmDeduct,
            sumDeductPay: item.sumDeductPay
          },
        }));

        setSalPaySumData({ allowPay : totalSalAllowPaydata, deductPay : totalSalDeductPaydata});
        
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      })
  }
 
  


  // 급여_사원 insert
  const insertSalEmp = (addRow) => {
    //console.log('insertSalEmp_addRow');    
    // //console.log(addRow);

    // axios.post(
    //     url + '/saEmpInfo/getSalAllowPaySum',
    //     addRow,
    //     {'Content-Type': 'application/json',},
    //   )
    //   .then((response) => {
    //     console.log('급여사원 insert > ' + response.data);
    //     salEmpdataTable();//새로고침
    //   })
    //   .catch((error) => {
    //     console.error('에러발생: ', error);
    //   })
  }

  return {
    state : {
      saInfoListData: saInfoListData  // 왼쪽 사원테이블
      , salAllowData: { salData : salData, sumData : calSalData }  // 중간 급여항목 
      , deductData : { deductData : deductData, sumData : calDeductSum} // 중간 공제항목
      , salPaySumData : salPaySumData  // 오른쬭 조회구분테이블
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

      , addRow
      , searchTotalDataVo
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
      , setSearchVo

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
      , setAddRow

      , setSearchTotalDataVo
      , setChangeCdEmp
    }

  };
};

export default SalaryInformationEntryModel;
