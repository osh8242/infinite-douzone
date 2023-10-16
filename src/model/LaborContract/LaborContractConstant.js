import { CODE_TYPE, CODE_VALUE, SELECT_LIST } from "../CommonConstant";

export const swsmUrlPattern = {
  getAllEmp: "/emp/getAllEmp",
  getSwsm: "/swsm/getSwsmByCdEmp",
  getSwsmOther: "/swsmOther/getSwsmOtherByCdEmp",
  updateSwsm: "/swsm/updateSwsm",
  insertSwsm: "/swsm/insertSwsm",
  deleteSwsm: "/swsm/deleteSwsm",
  insertSwsmOther: "/swsmOther/insertSwsmOther",
  updateSwsmOther: "/swsmOther/updateSwsmOtherByCdEmp",
  deleteSwsmOther: "/swsmOther/deleteSwsmOther",
};

export const CODE_HELPER_DATA = {
  leftTableCodeHelper: {
    title: "등록할 사원 조회",
    headers: [
      { field: "cdEmp", text: "사원코드" },
      { field: "nmKrname", text: "사원명" },
    ],
    tableData: [],
    searchField: ["cdEmp", "nmKrname"],
  },

  cdOffduty: {
    title: "직무 조회",
    headers: [
      { field: "cdOffduty", text: "직무코드" },
      { field: "nmCdOffduty", text: "직무명" },
    ],
    tableData: Object.keys(CODE_VALUE[CODE_TYPE["cdOffduty"]]).map((key) => {
      return {
        item: {
          cdOffduty: key,
          nmCdOffduty: CODE_VALUE[CODE_TYPE["cdOffduty"]][key],
        },
      };
    }),
    searchField: ["cdOffduty", "nmCdOffduty"],
    usePk: "cdOffduty",
  },
};

export const labels = {
  startEmpContractPeriod: "계약시작기간",
  endEmpContractPeriod: "계약종료기간",
  workAddress: "근무장소",
  jobDescription: "업무의 내용",
  workTime: "소정근로시간",
  breakTime: "휴게시간",
  workingDay: "근무일",
  dayOff: "주휴일",
  salaryType: "임금유형",
  otherBenefits: "기타급여",
  bonusPaymentStatus: "상여금",
  salaryPaymentDateType: "임금지급일",
  paymentMethod: "지급방법",
  empInsurance: "고용보험",
  compensationInsurance: "산재보험",
  nationalPension: "국민연금", //
  healthInsurance: "건강보험",
  dateOfCreation: " 작성일자",
  incomeClassfication: "소득구분", ///
};

// 상단 조회 - 소득구분 목록
export const searchSelectList = [
  { key: "empAll", value: "0. 전체" },
  { key: "empRegistration", value: "1. 사원등록" },
  { key: "tempEmpRegistration", value: "2. 일용직 사원등록" },
];

///search 정리후 삭제 예정
// 상단 조회 - 소득구분 목록
export const incomeClassficationList = [
  { key: "empAll", value: "0. 전체" },
  { key: "empRegistration", value: "1. 사원등록" },
  { key: "tempEmpRegistration", value: "2. 일용직 사원등록" },
];

// 상단 조회 - 소득구분 목록
export const searchOptionSearch = [
  { key: "empAll", value: "0. 전체" },
  { key: "empRegistration", value: "1. 사원등록" },
  { key: "tempEmpRegistration", value: "2. 일용직 사원등록" },
];

// 상단 조회 - 소득구분 목록
export const searchOption = [
  { key: "none", value: "0. 선택" },
  { key: "empRegistration", value: "1. 사원등록" },
  { key: "tempEmpRegistration", value: "2. 일용직 사원등록" },
];
///////
// export const searchOption = [
//   {
//     key: "yAndOnThisYear",
//     value: "재직자 + 당해년도 퇴사자",
//   },
//   { key: "Y", value: "재직자" },
//   { key: "N", value: "퇴직자" },
// ];

// export const orderList = [
//   { key: "cdEmp", value: "코드순" },
//   { key: "nmKrname", value: "이름순" },
// ];

export const mainTabMenuList = {
  WorkInformation: "계약서 작성",
  otherBenefit: "계약서 조회",
};

// 추가 구분 목록
export const subTabMenuList = {
  WorkInformation: "근로정보",
  otherBenefit: "기타급여",
};

export const leftTableConstant = {
  headers: [
    { field: "cdEmp", text: "사원코드", orderBy: "asc", isPk: true },
    { field: "nmKrname", text: "성명", orderBy: "asc" },
    { field: "noSocial", text: "주민번호", type: "regNum" },
  ],
};

export const leftStaticsTableConstant = {
  headers: [
    {
      field: "empAll",
      text: "전체",
    },
    {
      field: "empRegistration",
      text: "사원",
    },
    {
      field: "tempEmpRegistration",
      text: "일용직",
    },
  ],
};

// 좌측테이블 - 사원 목록
export const LeftTableHeaders = [
  { field: "cdEmp", text: "사원코드", orderBy: "asc", isPk: true },
  { field: "nmKrname", text: "성명", orderBy: "asc" },
  { field: "noSocial", text: "주민번호" },
];

// 우측하단테이블 - 기타급여 목록
export const SubTabHeaders = [
  { field: "otherType", text: "항목" },
  { field: "otherMoney", text: "금액", width: "50%" },
];

// 주휴일 목록
export const dayOffList = [
  { key: "mon", value: "1. 월" },
  { key: "tue", value: "2. 화" },
  { key: "wed", value: "3. 수" },
  { key: "thu", value: "4. 목" },
  { key: "fri", value: "5. 금" },
  { key: "sat", value: "6. 토" },
  { key: "sun", value: "7. 일" },
];

// 기타급여 목록
export const otherBenefitStatusList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];

// 임금유형 목록
export const salaryTypeList = [
  { key: "monthlySal", value: "1. 월급" },
  { key: "dailySal", value: "2. 일급" },
  { key: "hourlySal", value: "3. 시급" },
];
// 상여금 목록
export const bonusPaymentStatusList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];
// 임금지급일 목록
export const salaryPaymentDateTypeList = [
  { key: "month", value: "1. 매월" },
  { key: "week", value: "2. 매주" },
  { key: "day", value: "3. 매일" },
];
// 지급방법 목록
export const paymentMethodList = [
  { key: "account", value: "1. 예금통장에 입금" },
  { key: "direct", value: "2. 직접지급" },
];
// 고용보험 목록
export const empInsuranceList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];
// 산재보험 목록
export const compensationInsuranceList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];
// 국민연금 목록
export const nationalPensionList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];
// 건강보험 목록
export const healthInsuranceList = [
  { key: "T", value: "1. 여" },
  { key: "F", value: "2. 부" },
];
