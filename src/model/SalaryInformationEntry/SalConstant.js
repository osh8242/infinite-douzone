import { CODE, CODEHELPER_EMPLIST_URL } from "../CommonConstant";

/* url Pattern */

/* 검색옵션 */
// 구분
export const salaryDivisionOption = [ 
    { key: "SAL"        , value: "1.급여" },
    { key: ""           , value: "2.급여+상여" },
    { key: "BONUS"      , value: "3.상여" },
    { key: "EXTRASAL"   , value: "5.추급" },
    { key: "EXTRABONUS" , value: "6.추상" },
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
    , url : "/saallowpay/getPaymentDateList"
    , headers : [
        //{ field: "dateId", text: "날짜ID" },
        { field: "paymentDate", text: "지급일" },
    ]
    , params : { allowYear : '2023' , allowMonth : '2023-09'}
    , searchField : ['paymentDate']
    , usePk : "paymentDate"
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
    //, params : { ynFor: 'n', refYear: '2023' }
    , searchField : ['nmKrname','noSocial']
    , usePk : "cdEmp"
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

/* 사원리스트 영역 */
export const salEmp = {
    headers : [
        { field: "cdEmp", text: "사원번호", isPk:true },
        { field: "nmEmp", text: "사원이름" },
        { field: "rankNo", text: "직급" },
        { field: "mnReduction", text: "감면율" },
    ],
};

/* 급여항목 영역 */
export const salAllow = {
    headers : [
        { field: "nmAllow", text: "급여항목" , readOnly : true},
        { field: "allowPay", text: "지급금액" },
    ]
};

/* 공제항목 영역 */
export const salDeduct = {
    headers : [
        { field: "nmDeduct", text: "공제항목" },
        { field: "allowPay", text: "지급금액" },
    ]
}

/* 조회구분 영역 */
export const salAllowSum =  [
    { field: "nmAllow", text: "항목" },
    { field: "ynTax", text: "TX" },
    { field: "sumAllowPay", text: "금액" },
];
export const salDeductSum = [
    { field: "nmDeduct", text: "공제항목" },
    { field: "sumDeductPay", text: "지급금액" },
];

/* 찐 상수 */
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


// 수당/공제 등록 서브메뉴 
export const insertSalaryData = {
    subject : '수당/공제 등록',
    insertSalaryData : 
    [{key : '' , value : '과세, 비과세 재계산'}
     , {key : '' , value : '사원정보 변경'}]    
}


// 재계산 서브메뉴
export const reCalculationList = {
    subject : '재계산',
    reCalculationList : 
    [{key : '' , value : '과세, 비과세 재계산'}
     , {key : '' , value : '사원정보 변경'}]    
}

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
