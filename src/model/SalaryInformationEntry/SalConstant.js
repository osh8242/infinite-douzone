import { CODE, CODEHELPER_EMPLIST_URL } from "../CommonConstant";

/* url pattern */
export const GET_SALINFO_BY_DATE_URL = "/sallowpay/getSalaryAllInfoByDate";
export const DELETE_EMPLIST_URL = "/saEmpInfo/deleteSaEmpList";
export const UPDATE_SALEMP_DETAIL_URL = "/saEmpInfo/updateSaEmpInfo";
export const UPDATE_EMPPAYROLL_INFO_URL = "/saEmpInfo/updateSaEmpPayrollInfo";
export const RECALCULATION_URL = "/sallowpay/recalculation";
export const GET_SAL_TOTAL_SUM_URL = "/sallowpay/getSalTotalPaySum";
export const GET_SALINFO_BY_EMP_URL = "/sallowpay/getSaPayByCdEmp";
export const SAVE_SALDATA_URL = "/sallowpay/mergeSalAllowPay";
export const UPDATE_DATEINFO_URL = "/sallowpay/updateDate";
export const SET_COPYSALDATA_LASTMONTH_URL = "/sallowpay/setCopyLastMonthData";
export const GET_PAYMENTDATE_CODEHELPER_URL = "/sallowpay/getPaymentDateList";
export const SAVE_DEDUCTDATA_URL = "/sadeductpay/mergeSalDeductPay";

/* 사원리스트 영역 */
export const salEmp = {
  headers: [
    { field: "cdEmp", text: "사원번호", isPk: true },
    { field: "nmEmp", text: "사원이름" },
    { field: "rankNoName", text: "직급" },
  ],
};

/* 급여항목 영역 */
export const salAllow = {
  headers: [
    { field: "nmAllow", text: "급여항목", readOnly: true , width : '150px'},
    { field: "allowPay", text: "지급금액", type: "number",  width : '150px'},
  ],
};

export const sumAllowPay = {
  headers: [
    { field: "sumByY", text: "과세", type: "number" },
    { field: "sumByN", text: "비과세", type: "number" },
    { field: "sumAllowPay", text: "합계", type: "number" },
  ],
};

export const sumDeductPay = {
  headers: [
    { field: "sumDeductPay", text: "공제액 계", type: "number" },
    { field: "excessAmount", text: "차인 지급액", type: "number" },
  ],
};

/* 급여항목 + 계산식 영역 */
export const salAllowWithCalculation = {
  headers: [
    { field: "nmAllow", text: "급여항목", readOnly: true },
    { field: "allowPay", text: "지급금액", type: "number" },
    { field: "calculation", text: "산출식 또는 산출방법" },
  ],
};

/* 공제항목 영역 */
export const salDeduct = {
  headers: [
    { field: "nmDeduct", text: "공제항목", readOnly: true , width : '150px'},
    { field: "allowPay", text: "지급금액", type: "number" },
  ],
};

export const salDeductWithCalculation = {
  headers: [
    { field: "nmDeduct", text: "공제항목" },
    { field: "allowPay", text: "지급금액", type: "number" },
    { field: "calculation", text: "산출식 또는 산출방법" },
  ],
};
/* 조회구분 영역 */
export const salAllowSum = {
  headers: [
    { field: "nmAllow", text: "항목" },
    { field: "ynTax", text: "TX" },
    { field: "sumAllowPay", text: "금액", type: "number" },
  ],
};

export const salDeductSum = {
  headers: [
    { field: "nmDeduct", text: "공제항목" },
    { field: "sumDeductPay", text: "지급금액", type: "number" },
  ],
};

/* 검색옵션 */
// 구분
export const salaryDivisionOption = [
  { key: "SAL", value: "1.급여" },
  { key: "SALBONUS", value: "2.급여+상여" },
  { key: "BONUS", value: "3.상여" },
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
  { key: "EmpAllThisMonth", value: "0.전체사원 당월" },
  { key: "EmpNowThisMonth", value: "1.현재사원 당월" },
  { key: "EmpAllCurrent", value: "2.전체사원 현재" },
  { key: "EmpNowCurrent", value: "3.현재사원 현재" },
  { key: "EmpAllThisYear", value: "4.전체사원 연간" },
  { key: "EmpNowThisYear", value: "5.현재사원 연간" },
];

/* codeHelper */

// 지급일 조회
export const codeHelperData_paymentDate = {
  subject: "지급일 조회",
  url: GET_PAYMENTDATE_CODEHELPER_URL,
  headers: [
    { field: "allowMonth", text: "귀속연월" },
    { field: "paymentDate", text: "지급일" },
    { field: "salDivisionName", text: "급여구분" },
    { field: "ynComplete", text: "완료여부" },
  ],
  searchField: ["paymentDate"],
  // , usePk : "paymentDate"
};

// 부서코드 조회
export const codeHelperData_cdDept = {
  subject: "부서코드 조회",
  headers: [
    { field: "cdDept", text: "부서코드" },
    { field: "nmDept", text: "부서이름" },
  ],
  tableData: [
    { item: { cdDept: "D001", nmDept: "인사팀" } },
    { item: { cdDept: "D002", nmDept: "경영지원팀" } },
    { item: { cdDept: "D003", nmDept: "개발팀" } },
  ],
  searchField: ["cdDept", "nmDept"],
  usePk: "cdDept",
};

// 사원조회
export const codeHelperData_emplist = {
  subject: "사원조회",
  url: CODEHELPER_EMPLIST_URL, // "/emp/getEmpListForCodeHelper"
  headers: [
    { field: "cdEmp", text: "사원코드" },
    { field: "nmKrname", text: "사원명" },
    { field: "noSocial", text: "주민(외국인)번호" },
    { field: "daRetire", text: "퇴사일자" },
  ],
  // params : { ynFor: 'n', refYear: '2023' },
  searchField: ["nmKrname", "noSocial"],
};

// 직급조회
export const codeHelperData_rankNo = {
  subject: "직급조회",
  // url: CODE.URL,
  headers: [
    { field: "codeId", text: "직급코드" },
    { field: "codeName", text: "직급명" },
  ],
  tableData: [
    { item: { codeId: "D001", codeName: "사원" } },
    { item: { codeId: "D002", codeName: "대리" } },
    { item: { codeId: "D003", codeName: "기타등등" } },
  ],
  // params: { parentId: CODE.PARENT_ID.RANK_NO },
  searchField: ["codeId", "codeName"],
  usePk: "codeId",
};

// 직책조회
export const codeHelperData_occup = {
  subject: "직책조회",
  // url: CODE.URL,
  headers: [
    { field: "codeId", text: "직책코드" },
    { field: "codeName", text: "직책명" },
  ],
  // params: { parentId: CODE.PARENT_ID.OCCUP },
  tableData: [
    { item: { codeId: "D001", codeName: "사원" } },
    { item: { codeId: "D002", codeName: "대리" } },
    { item: { codeId: "D003", codeName: "기타등등" } },
  ],
  searchField: ["codeId", "codeName"],
  usePk: "codeId",
};

/* 서브메뉴(모달) */
// 급여항목 입력
export const modal_addSalAllow = {
  subject: "급여항목 입력",
  size: "sm",
};

// 수당/공제 등록 모달제목
export const modal_insertSalaryData = {
  subject: "수당 및 공제 등록",
  size: "xl",
  url: "/sallowpay/getsalAllowList", // selectList 불러올 url
  params: { salDivision: "BONUS" },
};

// 재계산
export const modal_reCalculationList = {
  subject: "재계산",
  size: "md",
  headers: [{ field: "nmOption", text: "재계산 목록" }],
  tableData: [
    { item: { cdOption: "recalculateTaxYn", nmOption: "과세, 비과세 재계산" } },
    { item: { cdOption: "recalculateDeductInfo", nmOption: "공제항목 재계산" } },
    { item: { cdOption: "editEmpInfo", nmOption: "사원정보 변경" } },
  ],
};

export const modal_insertSalaryAllowData = {
  url: "/sallowpay/getsalAllowList",
  headers: [
    { field: "cdAllow", text: "Code" , readOnly : true},
    { field: "nmAllow", text: "수당명" , isPk:true},
    {
      field: "ynTax",
      text: "과세여부",
      type: "select",
      optionList: [
        { key: "Y", value: "과세" },
        { key: "N", value: "비과" },
      ],
    },
    {
      field: "salDivision",
      text: "근로소득유형",
      type: "select",
      optionList: [
        { key: "SAL", value: "1.급여" },
        { key: "BONUS", value: "2.상여" },
      ],
    },
    {
      field: "commonlyYn",
      text: "통상",
      type: "select",
      optionList: [
        { key: "Y", value: "O" },
        { key: "N", value: "X" },
      ],
    },
    {
      field: "monthlyYn",
      text: "월정",
      type: "select",
      optionList: [
        { key: "Y", value: "O" },
        { key: "N", value: "X" },
      ],
    },
  ],
  headersWithCalculation: [
    { field: "cdAllow", text: "Code" },
    { field: "nmAllow", text: "수당명" },
    { field: "ynTax", text: "과세여부" },
    { field: "nmSalDivison", text: "근로소득유형" },
    { field: "calculation", text: "산출식 또는 산출방법" },
  ],
};

export const modal_insertSalaryDeductData = {
  url: "/sadeductpay/getsalDeductList",
  headers: [
    { field: "cdDeduct", text: "Code", readOnly:true },
    { field: "nmDeduct", text: "공제항목명", isPk: true },
    { field: "ynSal", text: "급여" 
    , type: "select",
      optionList: [
        { key: "Y", value: "O" },
        { key: "N", value: "X" },
      ],
  },
    { field: "ynBonus", text: "상여" ,
    type: "select",
    optionList: [
      { key: "Y", value: "O" },
      { key: "N", value: "X" },
    ],},
    { field: "rate"
    , text: "비율(%)"
    , isPk: true
    , type : "rate"
  },
  ],
  params : {static: 'N'}
};


export const modal_staticSalaryDeductData = {
  url: "/sadeductpay/getsalDeductList",
  headers: [
    { field: "cdDeduct", text: "Code", readOnly:true },
    { field: "nmDeduct", text: "공제항목명" },
    { field: "ynSal", text: "급여" 
    , type: "select",
      optionList: [
        { key: "Y", value: "O" },
        { key: "N", value: "X" },
      ],
  },
    { field: "ynBonus", text: "상여" ,
    type: "select",
    optionList: [
      { key: "Y", value: "O" },
      { key: "N", value: "X" },
    ],},
    { field: "calculation"
    , text: "산출식 또는 산출방법" 
    , type : "codeHelper"
    , readOnly: true},
  ],
  params : { static: 'Y'}
};

export const modal_nontaxSetup = {
  url: "/sallowpay/getNonTaxSalAllowList",
  headers: [
    { field: "cdAllow", text: "Code" , readOnly: true  },
    { field: "nmAllow", text: "비과세 항목", readOnly: true },
    { field: "nonTaxDivison", text: "구분" , readOnly: true},
    { field: "nontaxLimit", text: "한도" ,type:"number"},
    // { field: "ynBonus", text: "지급명세" },
  ],
};

// 산출식 또는 산출방법
export const modal_calculationModal = {
  subject: "산출식 또는 산출방법",
  url: "/sallowpay/getsalAllowList",
  headers: [
    { field: "cdAllow", text: "Code" },
    { field: "nmAllow", text: "수당명" },
    { field: "ynTax", text: "과세여부" },
    { field: "calculation", text: "산출식 또는 산출방법", readOnly: true},
  ],
};

