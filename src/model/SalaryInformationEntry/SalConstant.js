import { CODE, CODEHELPER_EMPLIST_URL } from "../CommonConstant";

/* url pattern */
export const GET_SALINFO_BY_DATE_URL = "/sallowpay/getSalaryAllInfoByDate"
export const DELETE_EMPLIST_URL = "/saEmpInfo/deleteSaEmpList";
export const UPDATE_SALEMP_DETAIL_URL = "/saEmpInfo/updateSaEmpInfo";
export const UPDATE_EMPPAYROLL_INFO_URL = "/saEmpInfo/updateSaEmpPayrollInfo";
export const RECALCULATION_URL = "/sallowpay/recalculation";
export const GET_SAL_TOTAL_SUM_URL = "/sallowpay/getSalTotalPaySum";
export const GET_SALINFO_BY_EMP_URL = "/sallowpay/getSaPayByCdEmp";
export const SAVE_SALDATA_URL = "/sallowpay/mergeSalAllowPay"
export const UPDATE_DATEINFO_URL = "/sallowpay/updateDate";
export const SET_COPYSALDATA_LASTMONTH_URL = "/sallowpay/setCopyLastMonthData";
export const GET_PAYMENTDATE_CODEHELPER_URL = "/sallowpay/getPaymentDateList";
export const SAVE_DEDUCTDATA_URL = "/sadeductpay/mergeSalDeductPay";

/* 사원리스트 영역 */
export const salEmp = {
    headers : [
        { field: "cdEmp", text: "사원번호", isPk:true },
        { field: "nmEmp", text: "사원이름" },
        { field: "rankNoName", text: "직급" },
    ],
};

/* 급여항목 영역 */
export const salAllow = {
    headers : [
        { field: "nmAllow", text: "급여항목" , readOnly : true},
        { field: "allowPay", text: "지급금액" , type:"number" }
    ]
};

export const sumAllowPay = {
    headers : [
        { field: "sumByY", text: "과세" , type:"number"},
        { field: "sumByN", text: "비과세" , type:"number"},
        { field: "sumAllowPay", text: "합계" ,type:"number"}
    ]
};

export const sumDeductPay = {
    headers : [
        { field: "sumDeductPay", text: "공제액 계"  , type:"number"},
        { field: "excessAmount", text: "차인 지급액" , type:"number"},
    ]
};

/* 급여항목 + 계산식 영역 */
export const salAllowWithCalculation = {
    headers : [
        { field: "nmAllow", text: "급여항목" , readOnly : true},
        { field: "allowPay", text: "지급금액" , type:"number"},
        { field: "calculation", text: "산출식 또는 산출방법" },
    ]
};

/* 공제항목 영역 */
export const salDeduct = {
    headers : [
        { field: "nmDeduct", text: "공제항목" , readOnly : true},
        { field: "allowPay", text: "지급금액" , type:"number"},
    ]
}

export const salDeductWithCalculation = {
    headers : [
        { field: "nmDeduct", text: "공제항목" },
        { field: "allowPay", text: "지급금액" , type:"number"},
        { field: "calculation", text: "산출식 또는 산출방법" },
    ]
}
/* 조회구분 영역 */
export const salAllowSum =  {
    headers : [
        { field: "nmAllow", text: "항목" },
        { field: "ynTax", text: "TX" },
        { field: "sumAllowPay", text: "금액" , type:"number"}
    ]
};

export const salDeductSum = {
    headers : [
        { field: "nmDeduct", text: "공제항목" },
        { field: "sumDeductPay", text: "지급금액" , type:"number"},
    ]
};

/* 검색옵션 */
// 구분
export const salaryDivisionOption = [ 
    { key: "SAL"        , value: "1.급여" },
    { key: ""           , value: "2.급여+상여" },
    { key: "BONUS"      , value: "3.상여" },
];

// 생산직 여부 검색조건 옵션
export const unitOption = [  
    { key: "y", value: "생산직" },
    { key: "n", value: "비생산직" },
];

// 국외 근로여부 검색조건 옵션
export const forLaborOption = [  
    { key: "y", value: "국외근로" },
    { key: "n", value: "국내근로" },
];

// 조회구분 검색조건 옵션
export const totalSalaryByPeriodOption = [   
    { key: 'EmpAllThisMonth',  value: "0.전체사원 당월" },
    { key: 'EmpNowThisMonth',  value: "1.현재사원 당월" },
    { key: 'EmpAllCurrent'  ,  value: "2.전체사원 현재" },
    { key: 'EmpNowCurrent'  ,  value: "3.현재사원 현재" },
    { key: 'EmpAllThisYear' ,  value: "4.전체사원 연간" },
    { key: 'EmpNowThisYear' ,  value: "5.현재사원 연간" },
];


/* codeHelper */

// 지급일 조회
export const codeHelperData_paymentDate = {
    subject : '지급일 조회'
    , url : GET_PAYMENTDATE_CODEHELPER_URL
    , headers : [
        { field: "allowMonth", text: "귀속연월" },
        { field: "paymentDate", text: "지급일" },
        { field: "salDivisionName", text: "급여구분" },
        { field: "ynComplete", text: "완료여부" }
    ]
    , searchField : ['paymentDate']
    // , usePk : "paymentDate"
};

// 부서코드 조회
export const codeHelperData_cdDept =  {
    subject : '부서코드 조회'
    , headers: [
        { field: "cdDept", text: "부서코드"},
        { field: "nmDept", text: "부서이름"},
    ]
    , tableData : [
        { item : { cdDept:'D001', nmDept : '인사팀'}}, 
        { item : { cdDept:'D002', nmDept : '경영지원팀'}}, 
        { item : { cdDept:'D003', nmDept : '개발팀'}}]
    , searchField : ['cdDept','nmDept']
    , usePk : 'cdDept'
};

// 사원조회
export const codeHelperData_emplist = {
    subject : '사원조회'
    , url : CODEHELPER_EMPLIST_URL  // "/emp/getEmpListForCodeHelper"
    , headers : [
        { field: "cdEmp", text: "사원코드" },
        { field: "nmKrname", text: "사원명" },
        { field: "noSocial", text: "주민(외국인)번호" },
        { field: "daRetire", text: "퇴사일자" }
              ]
    // , params : { ynFor: 'n', refYear: '2023' }
    , searchField : ['nmKrname','noSocial']
  };

// 직급조회
export const codeHelperData_rankNo = {
    subject : '직급조회'
    , url : CODE.URL
    , headers : [
        { field: "codeId", text: "직급코드" },
        { field: "codeName", text: "직급명" },
        ]
    , params : { parentId: CODE.PARENT_ID.RANK_NO }
    , searchField : ['codeId','codeName']
    , usePk : "codeId"
};

// 직책조회
export const codeHelperData_occup = {
    subject : '직책조회'
    , url : CODE.URL
    , headers : [
        { field: "codeId", text: "직책코드" },
        { field: "codeName", text: "직책명" },
        ]
    , params : { parentId: CODE.PARENT_ID.OCCUP }
    , searchField : ['codeId','codeName']
    , usePk : "codeId"
};


/* 서브메뉴(모달) */
// 급여항목 입력
export const modal_addSalAllow = {
    subject : '급여항목 입력',
    size : 'sm',
    
};

// 수당/공제 등록 모달제목
export const modal_insertSalaryData = {
    subject : '수당 및 공제 등록',
    size: 'xl',
    url : '/sallowpay/getsalAllowList', // selectList 불러올 url
    params : { salDivison : 'BONUS' }
}

// 재계산 
export const modal_reCalculationList = {
    subject : '재계산'
    , size: 'md'
    , headers: [
        { field: "nmOption", text: "재계산 목록"},
    ]
    , tableData : [
        { item : { cdOption:'calculateTaxYn', nmOption : '과세, 비과세 계산'}}, 
        { item : { cdOption:'incomeTax', nmOption : '소득세 재계산'}}, 
        { item : { cdOption:'editEmpInfo', nmOption : '사원정보 변경'}},
        // { item : { cdOption:'calculateHourlyWage', nmOption : '통상시급 계산'}}
    ]
}

export const modal_insertSalaryAllowData = {
    url : '/sallowpay/getsalAllowList',
    headers : [
        { field: "cdAllow", text: "Code" },
        { field: "nmAllow", text: "수당명" },
        { field: "ynTax", text: "과세여부" },
        { field: "nmSalDivison"
          , text: "근로소득유형"
          , type : "select"
          , optionList : [{ key: "SAL" , value: "급여" },{ key: "BONUS" , value: "상여" }] },
        { field: "commonlyYn", text: "통상" },
        { field: "monthlyYn", text: "월정" },
    ],
    headersWithCalculation :[
        { field: "cdAllow", text: "Code" },
        { field: "nmAllow", text: "수당명" },
        { field: "ynTax", text: "과세여부" },
        { field: "nmSalDivison", text: "근로소득유형" },
        { field: "calculation", text : "산출식 또는 산출방법" }
    ]
}

export const modal_insertSalaryDeductData = {
    url : '/sadeductpay/getsalDeductList',
    headers : [
        { field: "cdDeduct", text: "Code" },
        { field: "nmDeduct", text: "공제항목명" },
        { field: "ynSal", text: "급여" },
        { field: "ynBonus", text: "상여" },
    ],
    headersWithCalculation :[
        { field: "cdDeduct", text: "Code" },
        { field: "nmDeduct", text: "공제항목명" },
        { field: "ynSal", text: "급여" },
        { field: "ynBonus", text: "상여" },
        { field: "calculation", text : "산출식 또는 산출방법" }
    ]
}

export const modal_nontaxSetup = {
    url : '/sallowpay/getNonTaxSalAllowList',
    headers : [
        { field: "cdAllow", text: "Code" },
        { field: "nmAllow", text: "비과세 항목" },
        { field: "nonTaxDivison", text: "구분" },
        { field: "nonTaxLimit", text: "한도" },
        // { field: "ynBonus", text: "지급명세" },
    ],
}

// 산출식 또는 산출방법
export const modal_calculationModal = {
    subject : "산출식 또는 산출방법",
    url : '/sallowpay/getsalAllowList',
    headers : [
        { field: "cdAllow", text: "Code" },
        { field: "nmAllow", text: "수당명" },
        { field: "ynTax", text: "과세여부" },
        { field: "calculation", text: "산출식 또는 산출방법" },
    ]
}

// 공제항목
export const NATIONAL_PENSION = 'DEDUCT_NATION';  // 국민연금
export const HEALTH_INSURANCE = '502';            // 건강보험
export const EMPLOYMENT_INSURANCE = '503';        // 고용보험

// 급여항목
export const BASIC_SALARY = '503';               // 기본급
export const OVERTIME_PAY = '599';               // 연장수당
export const RND_EXPENSES = '523';               // 연구개발비
export const EMPLOYEE_BENEFITS = '511';          // 복리후생비 
export const MEALS = '597';                      // 식대
export const BONUS = '505';                      // 상여금


//국민연금 계산식
export const calculationNationalPension = (value) => {
    return Number(value) * 0.1;
 }

 //건강보험 계산식
 export const calculationHealthinsurance = (value) => {
    return Number(value) * 0.2;
 }

//고용보험 계산식
export const calculationEmploymentInsurance = (value) => {
    return Number(value) + 0.3;
 }
