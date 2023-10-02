import { useCallback, useEffect, useMemo, useState } from 'react';
import { currentDateStr, currentMonthStr} from '../../utils/DateUtils';
import { DELETE_EMPLIST_URL, GET_SALINFO_BY_DATE_URL, GET_SALINFO_BY_EMP_URL, GET_SAL_TOTAL_SUM_URL, SAVE_DEDUCTDATA_URL, SAVE_SALDATA_URL, SET_COPYSALDATA_LASTMONTH_URL, UPDATE_DATEINFO_URL, UPDATE_SALEMP_DETAIL_URL } from './SalConstant';
import { url } from '../CommonConstant';
import { useApi } from '../Api';

const SalaryInformationEntryModel = () => {

  /* 영역 테이블 Data */
  const [saInfoListData, setSaInfoListData] = useState([]);       // 사원 테이블 리스트
  const [salData, setSalData] = useState([]);                     // 급여항목 테이블
  const [sumAllowPayByYnTax, setSumAllowPayByYnTax] = useState([  // 급여항목 과세 비과세별 합계
    { item: { sumByY: 0, sumByN: 0, sumAllowPay: 0 } },
  ]);

  const [sumDeductPay, setSumDeductPay] = useState([
    { item: { sumDeductPay: 0 , excessAmount : 0}}
  ]);

  const [deductData, setDeductData] = useState([]);               // 공제항목 테이블 
  const [salPaySumData, setSalPaySumData] = useState({            // 공제항목 합계테이블 데이터(selectbox 조회)
    allowPay: [],
    totalAllowPay : [{item : { totalSalAllowPaySumTaxY : 0, totalSalAllowPaySumTaxN : 0, totalSalAllowPaySum : 0 }}], 
    deductPay: [],
    totalDeductPay : [{item: {}}]
  });

  const [saInfoDetailData, setSaInfoDetailData] = useState([]); // 사원상세조회

  /* 상태 Data */
  const api = useApi();
  const [modalState, setModalState] = useState({
    show: false,
    size: "lg",
    subject: "",
  });

  const [selectedRows, setSelectedRows] = useState([]); // 체크된 행(삭제를 위한)
  const [addRow, setAddRow] = useState(); // 사원 코드도움창에서 선택한 로우 객체
  const [codeHelperTableData, setCodeHelperTableData] = useState({
    // 코드도움 테이블 data
    subject: "",
    setRowData: setAddRow,
    usePk: "",
    tableHeaders: [],
    tableData: [],
    searchField: [],
  });

  const [modalContentData, setModalContentData] = useState({
    tableData: [],
    message: "",
  });

  /* 검색조건 Data */
  const allowYear = "2023"; // 귀속 년도
  const [dateId, setDateId] = useState(""); // 날짜 key
  const [ynComplete, setYnComplete] = useState("N"); // 해당 일자 완료여부

  const [cdEmp, setCdEmp] = useState(""); // 사원번호
  const [allowMonth, setAllowMonth] = useState(currentMonthStr); // 귀속년월
  const [salDivision, setSalDivision] = useState("SAL"); // 구분
  const [paymentDate, setPaymentDate] = useState(currentDateStr); // 지급일

  const [searchCdEmp, setSearchCdEmp] = useState(""); // 사원코드 검색
  const [searchCdDept, setSearchCdDept] = useState(""); // 부서코드 검색
  const [searchCdOccup, setSearchCdOccup] = useState(""); // 직책코드 검색
  const [searchYnUnit, setSearchYnUnit] = useState(""); // 생산직여부 검색

  const [showConfirm, setShowConfirm] = useState(false);
   
  /* 사원 선택시 발생함수 */
  useEffect(() => {
    getSaPayByCdEmp();
  }, [cdEmp, dateId, salDivision]);

  const changeCdEmp = useCallback(
    (cdEmp) => {
      setCdEmp(cdEmp);
    },
    [cdEmp]
  );

  const updateDate = useCallback(() => {
    let newYnComplete = ynComplete;
    if (ynComplete === "Y") newYnComplete = "N";
    else newYnComplete = "Y";
    
    api
      .post(url + UPDATE_DATEINFO_URL, {
        dateId: dateId,
        ynComplete: newYnComplete,
      })
      .then((response) => {
        if(response.data > 0) setYnComplete(newYnComplete);
        let message = "";
        if(newYnComplete === 'Y') message = "현재 지급일의 급여등이 완료 처리 되었습니다.";
        else message = "현재 지급일의 급여등이 완료 해제되었습니다.";

        setShowConfirm({
          show: true,
          message: message,
          onlyConfirm: true
        });
      });
  }, [ynComplete, dateId]);

  const getSalTotalSum = useCallback(
    (value) => {
      let params = { allowYear : allowYear, allowMonth : allowMonth, paymentDate : paymentDate, salDivision : salDivision };
      switch (value) {
        case "EmpAllThisMonth":
          params = { ...params, allowMonthFlag: "true" };
          break;
        case "EmpNowThisMonth":
          params = { ...params, allowMonthFlag: "true", nowFlag: "true" };
          break;
        case "EmpAllCurrent":
          params = { ...params, paymentDateFlag: "true" };
          break;
        case "EmpNowCurrent":
          params = { ...params, paymentDateFlag: "true", nowFlag: "true" };
          break;
        case "EmpAllThisYear":
          params = { ...params, allowYearFlag: "true" };
          break;
        case "EmpNowThisYear":
          params = { ...params, allowYearFlag: "true", nowFlag: "true" };
          break;
        default:
          break;
      }

      api
        .post(url + GET_SAL_TOTAL_SUM_URL, params)
        .then((response) => {
          
          const totalSalAllowPaydata = [];
          let totalSalAllowPaySumTaxY = 0; // 과세
          let totalSalAllowPaySumTaxN = 0; // 비과세.

          response.data.salAllow.forEach((item) => {
            item.ynTax==='N'? totalSalAllowPaySumTaxN += Number(item.sumAllowPay) : totalSalAllowPaySumTaxY += Number(item.sumAllowPay);
            totalSalAllowPaydata.push({
              item: {
                cdAllow: item.cdAllow,
                nmAllow: item.nmAllow,              
                ynTax: item.ynTax == "N" ? "비과" : "과세",
                sumAllowPay: item.sumAllowPay,
              }
            });
          });
          
          const totalSalDeductPaydata = [];
          let totalSalDeductPaySum = 0;

          response.data.salDeduct.forEach((item) => {
            totalSalDeductPaySum += Number(item.sumDeductPay);
            totalSalDeductPaydata.push({
              item: {
                cdDeduct: item.cdDeduct,
                nmDeduct: item.nmDeduct,
                sumDeductPay: item.sumDeductPay,
              },
            });
          });

          setSalPaySumData({
            allowPay: totalSalAllowPaydata,
            totalAllowPay : [
              {item : { 
                sumByY : totalSalAllowPaySumTaxY
                , sumByN : totalSalAllowPaySumTaxN
                , sumAllowPay : totalSalAllowPaySumTaxY + totalSalAllowPaySumTaxN }}
              ], 
            deductPay: totalSalDeductPaydata,
            totalDeductPay : [
              {item: {
                sumDeductPay : totalSalDeductPaySum,
                excessAmount : totalSalAllowPaySumTaxY + totalSalAllowPaySumTaxN - totalSalDeductPaySum
              }
            }]
          });

          
        })
        .catch((error) => {
          console.error("에러발생: ", error);
        });
    },
    [allowMonth, paymentDate, salDivision]
  );

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* 검색 */
  const onSearch = useCallback(() => {
    // 비우기
    setSalPaySumData({...salPaySumData
      , totalAllowPay : [{item : { totalSalAllowPaySumTaxY : 0, totalSalAllowPaySumTaxN : 0, totalSalAllowPaySum : 0 }}]      // 공제항목 합계테이블 데이터(selectbox 조회)
      , totalDeductPay : [{item: {}}]
    });

    setCdEmp('');
    setSaInfoListData([]);
    setSalData([]);
    setSumAllowPayByYnTax([ { item: { sumByY: 0, sumByN: 0, sumAllowPay: 0 }}]);
    setDeductData([]);
    setSaInfoDetailData([]);
    
    let searchParams = {
      allowYear: allowYear,
      allowMonth: allowMonth,
      salDivision: salDivision,
      paymentDate: paymentDate,
      dateId : dateId,

      searchCdEmp: searchCdEmp,
      searchCdDept: searchCdDept,
      searchCdOccup: searchCdOccup,
      searchYnUnit: searchYnUnit,
      paymentDateFlag: 'true'
    };

    api
      .post(url + GET_SALINFO_BY_DATE_URL, searchParams)
      .then((response) => {
        if (response.data) {
          
          /* dateId set */
          if (response.data.dateInfo) {
            const getDateId = response.data.dateInfo.dateId;
            const getYnComplete = response.data.dateInfo.ynComplete;
            setDateId(getDateId);
            setYnComplete(getYnComplete);
          }

          /* 사원리스트 set */
          const getEmplist =
            response.data.plist &&
            response.data.plist.map((object) => {
              const dynamicProperties = { item: {} };
              for (const key in object) {
                dynamicProperties.item[key] = object[key];
              }
              return dynamicProperties;
            });

          setSaInfoListData(getEmplist);

          /* select box 지급액 통계 합계 */
          getSalTotalSum('EmpAllThisMonth');
        }
      })
      .catch((error) => {
        console.error("에러발생: ", error);
       
      });
       
    }, [allowMonth, paymentDate, salDivision, ynComplete]);

  /* 사원별 지급액 리스트 조회  */
  const getSaPayByCdEmp = () => {
    
    // 데이터 비우기
    setSumDeductPay([{ item: { sumDeductPay: 0 , excessAmount : 0}}]);
    setSumAllowPayByYnTax([{ item: { sumByY: 0, sumByN: 0, sumAllowPay: 0 }}]);

    if (cdEmp !== "") {
      api
        .post(url + GET_SALINFO_BY_EMP_URL, { cdEmp: cdEmp, dateId: dateId, salDivision: salDivision })
        .then((response) => {

          /* 급여 항목 */
          const saAllowPayList = response.data.saAllowPayList.map((item) => ({
            item: {
              cdEmp: cdEmp,
              cdAllow: item.cdAllow,
              nmAllow: item.nmAllow,
              allowPay: item.allowPay,
              ynTax: item.ynTax,
            },
          }));
          setSalData(saAllowPayList);

          /* 급여 항목 합계 */
          if (response.data.sumAllowPayByYnTax) {
            const sumAllowPayByYnTax = [
              {
                item: {
                  sumByY: response.data.sumAllowPayByYnTax.sumByY,
                  sumByN: response.data.sumAllowPayByYnTax.sumByN,
                  sumAllowPay: response.data.sumAllowPayByYnTax.sumAllowPay,
                },
              },
            ];

            setSumAllowPayByYnTax(sumAllowPayByYnTax);

          } else {
            setSumAllowPayByYnTax([
              { item: { sumByY: 0, sumByN: 0, sumAllowPay: 0 } },
            ]);
          }

          /* 공제 항목 */
          const saDeductPayList = [];
          let deductSum = 0;

          response.data.saDeductPayList.forEach((item) => {
            deductSum += Number(item.allowPay);
            saDeductPayList.push({
              item: {
                cdDeduct: item.cdDeduct,
                nmDeduct: item.nmDeduct,
                allowPay: item.allowPay,
              },
            });
          });

          setDeductData(saDeductPayList);
          response.data.sumAllowPayByYnTax.sumAllowPay && setSumDeductPay([
            {item: {
              sumDeductPay: deductSum,
              excessAmount: Number(response.data.sumAllowPayByYnTax.sumAllowPay) - deductSum
            }},
          ]);

          /* 사원정보 */
          const saEmpDetail = response.data.saEmpDetail;
          setSaInfoDetailData(saEmpDetail);
          
          /* 조회구분 */
           getSalTotalSum('EmpAllThisMonth');
           
        })
        .catch((error) => {
          console.error("에러발생: ", error);
        });
    }
  };

/* 사원리스트 삭제 */
const deleteSelectedRows = () => {
  let deleteEmpList = [];
  selectedRows.forEach((item) => {
    deleteEmpList.push({ dateId: dateId, cdEmp: item.item.cdEmp });
  });
  
  api
    .delete(url + DELETE_EMPLIST_URL, {
      data: deleteEmpList,
    })
    .then(() => {
      setSelectedRows([]);
      getSaPayByCdEmp();

      setShowConfirm({
        show: true,
        message: "선택된 사원의 지급항목이 삭제되었습니다.",
        onlyConfirm: true
      });
  
    })
    .catch((error) => {
      console.error("사원 삭제실패: ", error);
    });
};


  /* 사원 테이블 재직 통계 계산 */
  const salEmpListStaticsTableData = useMemo(() => {
    let jobOkY = 0;
    let jobOkN = 0;
    if (saInfoListData && saInfoListData.length > 0) {
      saInfoListData.forEach((row) => {
        if (row.item["jobOk"] === "Y") jobOkY++;
        else jobOkN++;
      });
    }
    return [
      {
        item: {
          jobOkY: jobOkY,
          jobOkN: jobOkN,
          jobOkSum: jobOkY + jobOkN,
        },
      },
    ];
  }, [saInfoListData]);

  
  /* 급여 지급액 수정 */
  const updateSalaryAllowPay = useCallback((salaryAllowPay) => {
    const updatedData = {...salaryAllowPay, dateId: dateId, cdEmp: cdEmp, allowYear: allowYear, allowMonth: allowMonth, paymentDate : paymentDate};
    saveSalAllowPay(updatedData); // 저장
  }, [cdEmp, dateId, allowYear, allowMonth, paymentDate]);

  /* 급여테이블 수정 + 공제항목테이블 update */
  const saveSalAllowPay = (updatedData) => {
    api
    .post(url + SAVE_SALDATA_URL, updatedData)
    .then(async (response) => {
      setDateId(response.data);
      await getSaPayByCdEmp();
      setShowConfirm({
        show: true,
        message: "급여 지급액이 수정되었습니다.",
        onlyConfirm: true
      });
    })
    .catch((error) => {
      console.error("에러발생: ", error);
    });
  };

  /* 공제 지급액 수정 */
  const updateSalaryDeductPay = useCallback((salaryDeductPay) => {
    const updatedData = {...salaryDeductPay, dateId: dateId, cdEmp: cdEmp, allowYear: allowYear, allowMonth: allowMonth, paymentDate : paymentDate};
    saveSalDeductPay(updatedData); // 저장
  }, [cdEmp, dateId, allowYear, allowMonth, paymentDate]);

  /* 급여테이블 수정 + 공제항목테이블 update */
  const saveSalDeductPay = (updatedData) => {
    api
    .post(url + SAVE_DEDUCTDATA_URL, updatedData)
    .then((response) => { 
      getSaPayByCdEmp(); 
      setShowConfirm({
        show: true,
        message: "공제 지급액이 수정되었습니다.",
        onlyConfirm: true
      });})
    .catch((error) => {
      console.error("에러발생: ", error);
    });
  };

  /* 전월데이터 복사 */
  const setCopyLastMonthData = useCallback(() => {
    api
      .post(url + SET_COPYSALDATA_LASTMONTH_URL, {
        allowYear: allowYear,
        allowMonth: allowMonth,
        salDivision : salDivision
      })
      .then((response) => {
        if (response.data.dateId) {
          console.log("전월데이터 복사 성공");
          response.data.dateId && setDateId(response.data.dateId);
          //리로드
          onSearch();
        }
      })
      .catch((error) => {
        console.log("에러발생 -> ", error);
      });
  }, []);

  return {
    state: {
      saInfoListData: { // 왼쪽 사원테이블
        saInfoListData: saInfoListData,
        salEmpListStaticsTableData: salEmpListStaticsTableData
      }, 
      salAllowData: {   // 중간 급여항목
        salData: salData,
        sumAllowPayByYnTax: sumAllowPayByYnTax
      }, 
      deductData: {   // 중간 공제항목
        deductData: deductData,
        sumDeductPay: sumDeductPay
      }, 
      salPaySumData: salPaySumData, // 오른쬭 조회구분테이블
      saInfoDetailData,

      modalState: modalState,
      codeHelperTableData,

      searchVo: {
        cdEmp,
        salDivision,
        allowMonth,
        paymentDate,
        searchCdDept,
        searchCdOccup,
        searchYnUnit,
        searchCdEmp,
      },

      addRow,

      modalContentData,
      selectedRows,

      allowYear,
      allowMonth,
      cdEmp,
      dateId,
      ynComplete,    
      showConfirm
    },
    actions: {
      setSaInfoListData,
      setSalData,
      setSaInfoDetailData,
      setModalState,

      setCdEmp,
      setSalDivision,
      setAllowMonth,
      setPaymentDate,
      setDateId,

      setCodeHelperTableData,

      setSearchCdDept,
      setSearchCdEmp,
      setSearchCdOccup,
      setSearchYnUnit,

      setAddRow,
      setModalContentData,
      onSearch,
      updateSalaryAllowPay,

      setSelectedRows,
      deleteSelectedRows,

      setYnComplete,
      changeCdEmp,
      getSalTotalSum,
      updateDate,
      setCopyLastMonthData,
      updateSalaryDeductPay,

      getSaPayByCdEmp,
      setShowConfirm
      
    },
  };
};


export default SalaryInformationEntryModel;
